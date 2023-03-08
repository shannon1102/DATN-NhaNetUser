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

export default function ProfileRightbar({ userId }) {
  console.log("user In Rightbar: ", userId);
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
        const res = await axios.get(`${baseURL}/profile/${userId}`);
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

  const handleClick = async () => {};

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
                <p>{"Cập nhật"}</p>
              </button>
            )}
            <div className="rightBarBttn">
              {data.id !== currentUser.id && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                  {checkFriend(currentUser, data?.friends)
                    ? "Hủy bạn"
                    : "Thêm bạn"}
                  {/* {checkFriend(currentUser,data?.friends) ? <Remove /> : <Add />} */}
                </button>
              )}
              {data.id !== currentUser.id && (
                <button className="rightbarFollowButton" onClick={handleClick}>
                  Nhắn tin
                </button>
              )}
            </div>

            <h4 className="rightbarTitle">Thông tin người dùng</h4>
            <div className="rightbarInfo">
              {data?.name && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Tên:</span>
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
                  <span className="rightbarInfoKey">Giới tính:</span>
                  <span className="rightbarInfoValue">{data?.sex}</span>
                </div>
              )}
              {data?.email && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Tuổi:</span>
                  <span className="rightbarInfoValue">{data?.age}</span>
                </div>
              )}
              {data?.email && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Điện thoại:</span>
                  <span className="rightbarInfoValue">{data?.phone}</span>
                </div>
              )}
              {data?.address && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Địa chỉ:</span>
                  <span className="rightbarInfoValue">{data?.address}</span>
                </div>
              )}

              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Thành phố:</span>
                <span className="rightbarInfoValue">
                  {data?.city || "Hà Nội"}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Quốc gia:</span>
                <span className="rightbarInfoValue">
                  {data?.country || "Việt Nam"}
                </span>
              </div>
              {data?.createdAt && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Ngày tham gia:</span>
                  <span className="rightbarInfoValue">
                    {format(data?.createdAt)}
                  </span>
                </div>
              )}

              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Tình trạng quan hệ:</span>
                <span className="rightbarInfoValue">
                  {data.relationship === 1
                    ? "Độc thân"
                    : data?.relationship === 1
                    ? "Đã cưới"
                    : "-"}
                </span>
              </div>
            </div>
            <h4 className="rightbarTitle">Danh sách bạn bè</h4>
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
