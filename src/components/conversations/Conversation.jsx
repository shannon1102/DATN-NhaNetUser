import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, currentChatId }) {
  const [user, setUser] = useState(null);
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + currentUser.token;


  useEffect(() => {
    console.log("conversation",conversation)
    const friend = conversation.firstUser.id == currentUser.id ?  conversation.secondUser : conversation.firstUser ;
    
    const getUser = async () => {
      try {
        const params = new URLSearchParams({
          token: currentUser.token,
          user_id: friend.id,
      
        }).toString();
  
        const url =
          `${process.env.REACT_APP_BASE_URL}/profile/${friend.id}`;
  
        const res = await axios.get(url,opts);
        console.log('res friend in conversation: ', res);
        setUser(res?.data?.result);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation,currentChatId]);

  return (
    <div className="conversation" style={{backgroundColor: (conversation.id === currentChatId) ? "blanchedalmond"  :"none"}}>
      <img
        className="conversationImg"
        src={
          user?.avatar
            ? `${process.env.REACT_APP_MEDIA_URL}/${user?.avatar}`
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.name || "user" + user?.id.substring(0, 8)}</span>
    </div>
  );
}
