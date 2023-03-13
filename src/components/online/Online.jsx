import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./online.css";
import { Paper } from "@mui/material";

export default function Online({ userID ,isInChat }) {
  const { user: currentUser } = useContext(AuthContext);
  const [onlineUser, setOnlineUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + currentUser.token;
  useEffect(() => {

    const params = new URLSearchParams({
      // token: currentUser.token,
      userId: userID,
    }).toString();
    const url =
      `${process.env.REACT_APP_BASE_URL}/profile/${userID}`;
    const fetchUser = async () => {
      const res = await axios.get(url,opts);
      console.log("res get Info: ", res.data);
      setOnlineUser(res.data.result);
      console.log("Onl USer",onlineUser)
    };
    fetchUser();
  }, [userID, currentUser]);

  return (
    <Paper  zDepth={2}>
       <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <Link to={`/profile/${onlineUser?.id}`}>
          <img
            className="rightbarProfileImg"
            src={
              onlineUser?.avatar
                ? `${process.env.REACT_APP_MEDIA_URL}/${onlineUser?.avatar}`
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
        </Link>
        {isInChat && <span className="rightbarOnline"></span>}
      </div>
      <span className="rightbarUsername">{onlineUser?.name || "user" + onlineUser?.id.substring(0, 8)}</span>
    </li>
    </Paper>
   
  );
}
