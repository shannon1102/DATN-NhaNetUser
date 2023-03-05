import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./chatOnline.css";
import { Paper } from "@mui/material";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {

    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    opts.headers.Authorization = "Bearer " + currentUser.token;
  
    const getFriends = async () => {
 

      const url =
        `${process.env.REACT_APP_BASE_URL}/friends?`;

      const res = await axios.get(url,opts);
      console.log("res chat online: ", res);
      setFriends(res?.data?.result);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const params = new URLSearchParams({
        token: currentUser.token,
        // user_id: userID,
        partner_id: user.id,
        // conversation_id: 1,

        limit: 100,
        offset: 0,
      }).toString();

      const url =
        `${process.env.REACT_APP_BASE_URL}/chat/get_conversation?` + params;

      const res = await axios.post(url);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper  zDepth={2}>
     
    <div className="chatOnline">
      {onlineUsers.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.avatar
                  ? `${process.env.REACT_APP_MEDIA_URL}/${o?.avatar}`
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.name || "user" + o?.id?.substring(0, 8)}</span>
        </div>
      ))}
    </div>
    </Paper>
  );
}
