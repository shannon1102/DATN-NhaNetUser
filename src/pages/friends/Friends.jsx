import * as React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./friends.css";
import FriendList from "../../components/friend/friendList/FriendList";
export default function Friends() {
  return (
    <>
      <Topbar isContainSearch={true}/>
      <div className="friendPageContainer">
        <Sidebar />
        <div className="friendContainer">
          <div className="requestFrinedContainer">
            <FriendList />
          </div>
        </div>
      </div>
    </>
  );
}
