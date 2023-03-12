import React from "react";
import { useContext } from "react";
import "./singleUser.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AppButton from "../../components/AppButton/AppButton";

const SingleUser = ({user}) => {
  console.log("USER",user);
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
                    user?.avatar
                      ? `${process.env.REACT_APP_MEDIA_URL}/${user?.avatar}`
                      : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  }
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{user?.name ||  "Hoàng Trung Khang"}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{user?.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Số điện thoại:</span>
                    <span className="itemValue">{user?.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Tuổi:</span>
                    <span className="itemValue">{user?.age}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Giới tính:</span>
                    <span className="itemValue">{user?.sex}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Địa chỉ:</span>
                    <span className="itemValue">{user?.address}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Quốc gia:</span>
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
