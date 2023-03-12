import * as React from "react";
import Topbar from "../../components/topbar/Topbar";
import RequestFriendList from "../../components/friend/requestFriend/RequestFriendList";
import Sidebar from "../../components/sidebar/Sidebar";
import "./connectPeople.css";
import { useContext } from "react";
import SuggestFriendList from "../../components/friend/suggestFriend/SuggestFriendList";
import { SearchContext } from "../../context/SearchContext";
export default function ConnectPeople() {
  const { search } = useContext(SearchContext);
  return (
    <>
      <Topbar isContainSearch={true} />
      <div className="friendPageContainer">
        <Sidebar />
        <div className="friendContainer">
          <div className="requestFrinedContainer">
            <RequestFriendList search={search}/>
          </div>
          <div className="requestFrinedContainer">
            <SuggestFriendList search={search}/>
          </div>
        </div>
      </div>
    </>
  );
}
