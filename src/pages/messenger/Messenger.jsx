import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import { format } from "timeago.js";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import {
  MessageLeft,
  MessageRight,
} from "../../components/chatting/ChatMessage";
import { MessageInput } from "../../components/chatting/MessageInput";
import { Button, TextField } from "@mui/material";

import SendIcon from "@material-ui/icons/Send";
import Sidebar from "../../components/sidebar/Sidebar";


export default function Messenger() {
  const useStyles = makeStyles((theme) =>
    createStyles({
      paper: {
        width: "100%",

        height: "80vh",
        maxWidth: "500px",
        maxHeight: "700px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        minWidth: "700px",
      },
      paper2: {
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        minWidth: "700px",
      },
      container: {
        width: "100%",

        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "700px",
      },
      messagesBody: {
        width: "calc( 100% - 20px )",
        margin: 10,
        overflowY: "scroll",
        height: "calc( 100% - 80px )",
      },
    })
  );

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  const baseURL = process.env.REACT_APP_BASE_URL;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + user.token;

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.sender,
        message: data.message,
        createdAt: Date.now(),
      });
    });
  }, [messages]);

  useEffect(() => {
    console.log("Vao set current chat", currentChat); //ms co last messege
    arrivalMessage &&
      // currentChat?.members.includes(arrivalMessage.sender)
      currentChat &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        users.filter((u) => u.id != user.id)
        // user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const baseURL = process.env.REACT_APP_BASE_URL;
        const params = new URLSearchParams({
          token: user?.token,
          index: 0,
          count: 100,
        }).toString();
        const url = `${baseURL}/chat/conversations?`;

        const res = await axios.get(url, opts);
        console.log("res: ", res);

        setConversations(res?.data?.result);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  // useEffect(() => {
  //   const getFriends = async () => {
  //     try {
  //       const baseURL = process.env.REACT_APP_BASE_URL;
  //       const url =
  //         `${baseURL}/friends?`;

  //       const res = await axios.get(url,opts);
  //       console.log('res: ', res);

  //       setFriends(res?.data?.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getFriends();
  // }, [user.id]);
  const classes = useStyles();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const params = new URLSearchParams({
          token: user?.token,
          index: 0,
          count: 300,
          // partner_id:1,
          conversation_id: currentChat.id,
        }).toString();
        const url = `${baseURL}/chat/conversations/${currentChat.id}`;

        const res = await axios.get(url, opts);
        console.log("res get conversation: ", res);
        setMessages(res?.data?.result.messages);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("currentChat", currentChat);
    console.log("newMessege", newMessage);
    let { senderId, partnerId } = getSenderPartner(currentChat, user);
    const messageinDB = {
      sender: senderId,
      message: newMessage,
      conversationId: currentChat.id,
    };

    const receiverId = partnerId;
    console.log("receiverId: ", receiverId);

    socket.current.emit("sendMessage", {
      sender: user,
      receiverId,
      message: newMessage,
    });

    setMessages((prev) => [
      ...prev,
      {
        sender: user,
        own: true,
        message: newMessage,
      },
    ]);
    console.log("afterrrMessage", messages);

    setNewMessage("");

    try {
      const params = {
        userId: messageinDB.sender,
        message: messageinDB.message,
        conversationId: messageinDB.conversationId,
      };
      const url = `${baseURL}/chat/messages`;

      const res = await axios.post(url, params, opts);
      console.log("res add api: ", res);
      setMessages([...res?.data?.result.messages]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSenderPartner = (currentChat, currentUser) => {
    if ((currentUser.id = currentChat.firstUserId)) {
      return {
        senderId: currentChat.firstUserId,
        partnerId: currentChat.secondUserId,
      };
    }
  };

  return (
    <>
      <Topbar isContainSearch={true} />
      <div className="chatContainer">
      <Sidebar></Sidebar>  
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {console.log("conv", conversations)}
            {conversations.map((c) => (
              <div
                onClick={() => {
                  console.log("currentChat", c);
                  setCurrentChat(c);
                }}
              >
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className={classes.container}>
                  <Paper className={classes.paper} zDepth={2}>
                    <Paper id="style-1" className={classes.messagesBody}>
                      {messages.map((message) => (
                        <div ref={scrollRef}>
                          {message.userId === user.id && (
                            <MessageRight
                              message={message.message}
                              // timestamp="MM/DD 00:00"
                              timestamp={(
                                format(message.createdAt))}
                              photoURL={
                                message.user?.avatar
                                ? `${process.env.REACT_APP_MEDIA_URL}/${user?.avatar}`
                                : PF + "person/noAvatar.png"}
                              displayName={message.user.name}
                              avatarDisp={false}
                            />
                          )}
                          {message.userId !== user.id && (
                            <MessageLeft
                              message={message.message}
                              timestamp={(
                                format(message.createdAt))}
                              photoURL={ 
                                message.user?.avatar
                                ? `${process.env.REACT_APP_MEDIA_URL}/${user?.avatar}`
                                : PF + "person/noAvatar.png"}
                              displayName={message?.user?.name}
                              avatarDisp={false}
                            />
                          )}
                        </div>
                      ))}
                    </Paper>

                    <div className="chatBoxBottom">
                      <TextField
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></TextField>
                      <Button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                      >
                        <SendIcon />
                      </Button>
                    </div>
                  </Paper>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}

            {/* <ChatBox></ChatBox> */}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
      </div>
  
    </>
  );
}
