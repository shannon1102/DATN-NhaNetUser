import * as React from "react";
import Topbar from "../../components/topbar/Topbar";
import RequestFriendList from "../../components/friend/requestFriend/RequestFriendList";
import Sidebar from "../../components/sidebar/Sidebar";
import "./connectPeople.css";
import SuggestFriendList from "../../components/friend/suggestFriend/SuggestFriendList";
export default function ConnectPeople() {
  return (
    <>
      <Topbar isContainSearch={true}/>
      <div className="friendPageContainer">
        <Sidebar />
        <div className="friendContainer">
          <div className="requestFrinedContainer">
            <RequestFriendList />
          </div>
          <div className="requestFrinedContainer">
            <SuggestFriendList />
          </div>
        </div>
      </div>
    </>
  );
}
