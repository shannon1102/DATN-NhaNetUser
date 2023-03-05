import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import "./home.css"
import FeedRightbar from "../../components/rightbar/FeedRightBar";

export default function Home({user}) {
  return (
    <>
      <Topbar isContainSearch={true}/>
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
