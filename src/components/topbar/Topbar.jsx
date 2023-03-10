import "./topbar.css";
import {
  Search,
  PersonPin,
  ChatBubbleOutline,
  NotificationsNone,
  AddShoppingCart,
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useContext, useEffect} from "react";
import { AuthContext } from "../../context/AuthContext";
import LogoutDropDown from "./logoutDropDown/LogoutDropDown";
import AppButton from "../AppButton/AppButton";
// import Popup from "../post/popup/PostHandlePopup";

export default function Topbar({ isContainSearch}) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log("user in TopBar",user);
  // useEffect(() => {
  
  // }, [user.avatar,user.name,user.email,user.age,user.sex,user.phone]);
  // let userID = user.id;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            marginLeft: "30px",
          }}
        >
          <img className="logo__img" src="/assets/logo.png"></img>
          <span className="logo">NhaNet</span>
        </Link>
 
      </div>
      {/* <AppButton text="Đăng tin bán"></AppButton> */}
      {/* <AppButton text="Đăng tin bán"></AppButton> */}
       {isContainSearch && (
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Tìm kiếm trên NhaNet..."
              className="searchInput"
            />
          </div>
        )}

      <div className="topbarRight">
      <Link to={`/market/new`}>
          <div className="topbarIconItem">
          <AppButton text="Đăng bán"></AppButton>
          </div>
        </Link>
        <span className="topBarRightAvatar">
          <Link to={`/profile/${user.id}`}>
            <img
              src={
                user.avatar
                  ? `${process.env.REACT_APP_MEDIA_URL}/${user.avatar}`
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </span>
        <span className="topBarRightUserName">
          {user.name || "user" + user?.id.substring(0, 8)}
        </span>
        <span>
          <LogoutDropDown currentUser={user}></LogoutDropDown>
        </span>
      </div>
    </div>
  );
}
