import React from "react";
import { useContext } from "react";
import "./singleUser.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AppButton from "../../components/AppButton/AppButton";

const SingleUser = ({user}) => {
  // const location = useLocation();
  // const path = location.pathname.split("/")[1];
  const { user: currUser } = useContext(AuthContext);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + currUser.token;

  const { userId } = useParams();
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/profile/${userId}`,
    opts
  );
  console.log("PARAMSSSS", data);
  return (
    <>
      <div className="singleUser">
        <div className="singleUserContainer">
          <h2 className="sigleUserTitle">Thông tin người bán</h2>
          <div className="top">
            <div className="left">
              <div className="editButton"></div>
              {/* <h1 className="title">C</h1> */}
              <div className="item">
                <img
                  src={
                    currUser?.avatar
                      ? `${process.env.REACT_APP_MEDIA_URL}/${currUser?.avatar}`
                      : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  }
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{currUser?.name ||  "Hoàng Trung Khang"}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{currUser?.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{currUser?.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Age:</span>
                    <span className="itemValue">{currUser?.age}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{currUser?.sex}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{currUser?.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">Việt Nam</span>
                  </div>
                </div>
              </div>
              <Link to={`/profile/${user?.id}`} style={{ textDecoration: "none" }}>
                <AppButton text="Xem thông tin" className="btnUserInformation" marginLeft="300px"></AppButton>
              </Link>
              &nbsp;
              &nbsp;
              <Link to={`/messenger`} style={{ textDecoration: "none" }}>
                <AppButton text="Nhắn tin" className="btnUserInformation" marginLeft="300px"></AppButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
