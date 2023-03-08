import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import "./home.css"
import FeedRightbar from "../../components/rightbar/FeedRightBar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Home() {
  const {user}  = useContext(AuthContext);
  console.log("USer In HOMEEEEEE",user);
  return (
    <>
      <Topbar isContainSearch={true} user={user}/>
      <div className="homeContainer">
        {/* <div className= "allContainer"> */}
        <Sidebar  className="allContainerItem"/>
        <Feed className="allContainerItem"/>
        <FeedRightbar className="allContainerItem"/>
        </div>
       
      {/* </div> */}
    </>
  );
}
