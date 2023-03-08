import { useContext, useEffect, useState } from "react";
import Online from "../online/Online";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function FeedRightbar() {
  const baseURL = `${process.env.REACT_APP_BASE_URL}`;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + currentUser.token;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const feedRightBar = new URLSearchParams({
          userId: currentUser.id,
          limit: 30,
          offset: 0,
        }).toString();
        let uri = `${process.env.REACT_APP_BASE_URL}/friends?` + feedRightBar;
        console.log(uri);
        const friendList = await axios.get(uri, opts);
        console.log("friendLisDSSSSSSSSSSSSt: ", friendList);
        setFriends(friendList.data.result);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser]);
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <>
          <div className="birthdayContainer">
            <img className="birthdayImg" src="assets/gift.png" alt="" />
            <span className="birthdayText">
              <b>Bấm đăng ký </b> để nhận ngay <b>Ưu đãi</b> cực lớn <b>ngày hôm nay</b>.
            </span>
          </div>
          <img className="rightbarAd" src="assets/ad.png" alt="" />
          <h4 className="rightbarTitle">Online Friends</h4>
          <ul className="rightbarFriendList">
            {friends.map((u) => (
              <Online key={u.id} userID={u.id} />
            ))}
          </ul>
        </>
      </div>
    </div>
  );
}
