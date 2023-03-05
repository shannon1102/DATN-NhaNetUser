import React from "react";
import { useContext } from "react";
import "./singleUser.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AppButton from "../../components/AppButton/AppButton";

const SingleUser = () => {
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
          <h2 className="sigleUserTitle">User Deltail</h2>
          <div className="top">
            <div className="left">
              <div className="editButton"></div>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src={
                    data?.avatar
                      ? `${process.env.REACT_APP_MEDIA_URL}/${data?.avatar}`
                      : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  }
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{data?.name}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{data?.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data?.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Age:</span>
                    <span className="itemValue">{data?.age}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{data?.sex}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{data?.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">Việt Nam</span>
                  </div>
                </div>
              </div>
              <Link to={`/messenger`} style={{ textDecoration: "none" }}>
                <AppButton text="Nhắn tin"></AppButton>
              </Link>
            </div>
            <div className="right"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
