import Topbar from "../../components/topbar/Topbar";
import TopSlideshow from "../../components/topSlideShow/TopSlideshow"
import Categories from "../../components/categories/Categories"
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/ProfileRightbar";
import "./renting.css"
import SuggestFriendList from "../../components/friend/suggestFriend/SuggestFriendList";
import RentCards from "./RentCards"
export default function Renting({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const slideImages = [
    {
      url: PF + "slideshow/home1.jpg",
      caption: "Slide 1",
    }];

  return (
    <>
      <Topbar isContainSearch={true}/>
      <TopSlideshow></TopSlideshow>
      {/* <Categories></Categories> */}
      {/* <h3>Tin dành cho bạn:</h3> */}
      {/* <div className="rentingContainer">
        <RentCards></RentCards>
      </div> */}
      <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}
