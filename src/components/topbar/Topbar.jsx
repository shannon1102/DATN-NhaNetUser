import "./topbar.css";
import {
  Search
} from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import LogoutDropDown from "./logoutDropDown/LogoutDropDown";
import AppButton from "../AppButton/AppButton";
import { IconButton } from "@material-ui/core";
import { SearchContext } from "../../context/SearchContext";
// import Popup from "../post/popup/PostHandlePopup";

export default function Topbar({ isContainSearch }) {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [search, setSearch] = useState("");
  const { dispatch: searchDispatch } = useContext(SearchContext);
  
  
  console.log("user in TopBar", user);
  const handleSearchClick =(e)=>{
    console.log("IN SEARCHHHH")
    console.log("IN SEARCHHHH",search)
    searchDispatch({type:"NEW_SEARCH",payload:{search: search}})
    setSearch("")
    // dispatch()

  }
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
          <input
            placeholder="Tìm kiếm trên NhaNet..."
            className="searchInput"
            name="search"
            value={search}
            onChange={(e)=>{
              console.log("eeeeeeeeeee",e.target.value);
              setSearch(e.target.value);
              
            }}
          />
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSearchClick}
          >
            <Search className="searchIcon" />
          </IconButton>
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
