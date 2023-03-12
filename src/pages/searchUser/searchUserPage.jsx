import * as React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./searchUserPage.css";
import SearchUserList from "../../components/friend/searchUser/searUserList";
export default function SearchUserPage() {
  return (
    <>
      <Topbar isContainSearch={true}/>
      <div className="friendPageContainer">
        <Sidebar />
        <div className="friendContainer">
          <div className="requestFrinedContainer">
            <SearchUserList />
          </div>
        </div>
      </div>
    </>
  );
}
