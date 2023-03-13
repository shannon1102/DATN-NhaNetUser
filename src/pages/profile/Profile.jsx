import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/ProfileRightbar";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import EditUserInfoModal from "./editUserInfoModal/EditUserInfoModal";
import ProfileRightbar from "../../components/rightbar/ProfileRightbar";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const [updateAvatarUrl, setUpdateAvatarUrl] = useState(null);
  let userId = useParams().user_id;
  console.log('userIdDDDDDDDDD: ', userId);
  // const [isEditUserInfo,setEditUserInfo] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  console.log("CurrrentUSer",currentUser);
  const avatarUploadRef = useRef(null);

  function handleChangeAvatar(e) {
    setUpdateAvatarUrl(URL.createObjectURL(e.target.files[0]));

    // TODO: API to update to server

  }

  useEffect(() => {
    console.log("dadadad value", userId);
   
    const params = new URLSearchParams({
      token: currentUser.token,
      user_id: userId,
    }).toString();
    
    console.log('params: ', params);
    const url =
      `${process.env.REACT_APP_BASE_URL}/profile/${userId}`;
    const fetchUser = async () => {
      const res = await axios.get(url);
      console.log("res get Info: ", res.data);
      setUser(res.data.result);
    };
    fetchUser();
  }, [userId,user.name,user.avatar,user.addess,user.sex,user.age]);
  console.log("dadadad", user);
  return (
    <>
      <Topbar isContainSearch={true}/>
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.cover_image
                    ? user.cover_image
                    : PF + "person/noCover.jpg"
                }
                alt=""
              />
              <input ref={avatarUploadRef} type="file" hidden onChange={handleChangeAvatar}></input>
              <img
                className="profileUserImg"
                src={updateAvatarUrl != null ? updateAvatarUrl : (user.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${user.avatar}` : PF + "person/noAvatar.png")}
                alt=""
                onClick={() => avatarUploadRef.current.click()}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.name}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userID={userId} />
            <ProfileRightbar userId={userId}/>
          </div>
        </div>
      </div>

    </>
  );
}
