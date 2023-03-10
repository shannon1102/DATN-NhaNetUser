import "./rightbar.css";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove, Create } from "@material-ui/icons";
import EditUserInfoModal from "../../pages/profile/editUserInfoModal/EditUserInfoModal";
import { format } from "timeago.js";
import useFetch from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
export default function ProfileRightbar({ userId }) {
  console.log("user In Rightbar: ", userId);
  const histpry = useHistory();
  const baseURL = `${process.env.REACT_APP_BASE_URL}`;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [friends, setFriends] = useState([]);
  // const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user: currentUser } = useContext(AuthContext);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + currentUser.token;
  const checkFriend = (curr, friends) => {
    let check = false;
    friends?.map((f) => {
      if (f.id == curr.id) {
        check = true;
      }
    });
    return check;
  };
  useEffect(() => {
    console.log("User InrightBar", currentUser);
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/profile/${userId}`,opts);
        console.log("Response UseFetch", res);
        setData(res.data.result);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [
    currentUser.name,
    currentUser.avatar,
    currentUser.phone,
    currentUser.sex,
    currentUser.email,
    currentUser.address,
    currentUser.age,
    currentUser,
    baseURL,
    userId,
  ]);

  console.log("data", data);

  const handleChatClick = async () => {
    try {
      const data = {
        firstUserId:currentUser.id,
        secondUserId: userId
      };
      const uri =
        `${process.env.REACT_APP_BASE_URL}/chat/conversations`;
      const createConversationResp = await axios.post(uri,data,opts);
      console.log('createConversationResp: ', createConversationResp);
      histpry.push("/messenger")
      window.location.reload(true);

    } catch (err) {
      console.log(err);
    }


  };
  
  const handleFriendClick = async () => {};

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {loading ? (
          "Loading"
        ) : (
          <>
            {data.id == currentUser.id && (
              <button
                className="rightbarChangInfoButton"
                onClick={() => {
                  setIsOpenEditUser(true);
                }}
              >
                {<Create />}
                <p>{"C???p nh???t"}</p>
              </button>
            )}
            <div className="rightBarBttn">
              {data.id !== currentUser.id && (
                <button className="rightbarFollowButton" onClick={handleFriendClick}>
                  {checkFriend(currentUser, data?.friends)
                    ? "H???y b???n"
                    : "Th??m b???n"}
                  {/* {checkFriend(currentUser,data?.friends) ? <Remove /> : <Add />} */}
                </button>
              )}
              {data.id !== currentUser.id && (
                <button className="rightbarFollowButton" onClick={handleChatClick}>
                  Nh???n tin
                </button>
              )}
            </div>

            <h4 className="rightbarTitle">Th??ng tin ng?????i d??ng</h4>
            <div className="rightbarInfo">
              {data?.name && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">T??n:</span>
                  <span className="rightbarInfoValue">{data?.name}</span>
                </div>
              )}
              {data?.description && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Description:</span>
                  <span className="rightbarInfoValue">{data?.description}</span>
                </div>
              )}
              {data?.email && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Email:</span>
                  <span className="rightbarInfoValue">{data?.email}</span>
                </div>
              )}
              {data?.sex && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Gi???i t??nh:</span>
                  <span className="rightbarInfoValue">{data?.sex}</span>
                </div>
              )}
              {data?.email && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Tu???i:</span>
                  <span className="rightbarInfoValue">{data?.age}</span>
                </div>
              )}
              {data?.email && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">??i???n tho???i:</span>
                  <span className="rightbarInfoValue">{data?.phone}</span>
                </div>
              )}
              {data?.address && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">?????a ch???:</span>
                  <span className="rightbarInfoValue">{data?.address}</span>
                </div>
              )}

              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Th??nh ph???:</span>
                <span className="rightbarInfoValue">
                  {data?.city || "H?? N???i"}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Qu???c gia:</span>
                <span className="rightbarInfoValue">
                  {data?.country || "Vi???t Nam"}
                </span>
              </div>
              {data?.createdAt && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Ng??y tham gia:</span>
                  <span className="rightbarInfoValue">
                    {format(data?.createdAt)}
                  </span>
                </div>
              )}

              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">T??nh tr???ng quan h???:</span>
                <span className="rightbarInfoValue">
                  {data.relationship === 1
                    ? "?????c th??n"
                    : data?.relationship === 1
                    ? "???? c?????i"
                    : "-"}
                </span>
              </div>
            </div>
            <h4 className="rightbarTitle">Danh s??ch b???n b??</h4>
            <div className="rightbarFollowings">
              {console.log("friends rightbar: ", data.friends)}
              {data.friends?.map((friend) => (
                <Link
                  to={"/profile/" + friend.id}
                  style={{ textDecoration: "none" }}
                  key={friend.id}
                >
                  <div className="rightbarFollowing">
                    <img
                      src={
                        friend?.avatar
                          ? `${process.env.REACT_APP_MEDIA_URL}/${friend?.avatar}`
                          : PF + "person/noAvatar.png"
                      }
                      alt=""
                      className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">
                      {friend?.name || "user" + friend?.id.substring(0, 8)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {isOpenEditUser && (
              <EditUserInfoModal
                currentUser={currentUser}
                setIsOpen={setIsOpenEditUser}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
