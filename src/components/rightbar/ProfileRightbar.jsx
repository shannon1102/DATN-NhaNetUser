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
  const { user: currentUser } = useContext(AuthContext);
  const [isOpenEditUser, setIsOpenEditUser] = useState(false);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + currentUser.token;

 
  const { data, loading, error } = useFetch(`${baseURL}/profile/${userId}`);

  console.log("data",data);

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
                <p>{"Edit information"}</p>
              </button>
            )}
            <div className="rightBarBttn">
            {data.id !== currentUser.id && (
              <button className="rightbarFollowButton" onClick={handleClick}>
                {data.is_friend == "true" ? "Unfriend" : "Add friend"}
                {data.is_friend == "true" ? <Remove /> : <Add />}
              </button>
            )}
            {data.id !== currentUser.id && <button className="rightbarFollowButton" onClick={handleClick}>
              Nhắn tin
            </button>}

            </div>
        
            <h4 className="rightbarTitle">User information</h4>
            <div className="rightbarInfo">
              {data?.username && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Username:</span>
                  <span className="rightbarInfoValue">{data?.name}</span>
                </div>
              )}
              {data?.description && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Description:</span>
                  <span className="rightbarInfoValue">{data?.description}</span>
                </div>
              )}

              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">City:</span>
                <span className="rightbarInfoValue">
                  {data?.city || "Ha Noi"}
                </span>
              </div>
              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Country:</span>
                <span className="rightbarInfoValue">
                  {data?.country || "Viet Nam"}
                </span>
              </div>
              {data?.created && (
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Date Join:</span>
                  <span className="rightbarInfoValue">
                    {format(data?.created)}
                  </span>
                </div>
              )}

              <div className="rightbarInfoItem">
                <span className="rightbarInfoKey">Relationship:</span>
                <span className="rightbarInfoValue">
                  {data.relationship === 1
                    ? "Single"
                    : data?.relationship === 1
                    ? "Married"
                    : "-"}
                </span>
              </div>
            </div>
            <h4 className="rightbarTitle">User friends</h4>
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
