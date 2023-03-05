import { Button, CircularProgress } from "@material-ui/core";
import { Cancel, CloseRounded, CloudUpload } from "@material-ui/icons";
import axios from "axios";
import React, { useRef, useState } from "react";
import AppButton from "../../../components/AppButton/AppButton";
import "./editUserInforModal.css";

export default function EditUserInfoModal({ currentUser, setIsOpen }) {
  const username = useRef();
  const description = useRef();
  const email = useRef();
  const phone = useRef();
  const address = useRef();
  const sex = useRef();
  const age = useRef();
  const relationStatus = useRef();
  const identityCardID = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const avatarUploadRef = useRef(null);
  const coverUploadRef = useRef(null);
  const [updateAvatarUrl, setUpdateAvatarUrl] = useState(null);
  const [updateCoverUrl, setUpdateCoverUrl] = useState(null);
  const [fileCover, setFileCover] = useState(null);
  const [fileAvatar, setFileAvatar] = useState(null);

  // const { user } = useContext(AuthContext);
  const url = `${process.env.REACT_APP_BASE_URL}/me`;
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fileOpts = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  fileOpts.headers.Authorization = "Bearer " + currentUser.token;
  opts.headers.Authorization = "Bearer " + currentUser.token;

  const handleSubmit = (e) => {
    e.preventDefault();
    // loginCall(
    //   { phoneNumber: phoneNumber.current.value, password: password.current.value },
    //   dispatch
    // );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    let params = {
      name: username.current.value,
      // description: description.current.value,
      email: email.current.value,
      address: address.current.value,
      phone: phone.current.value,
      sex: sex.current.value,
      age: age.current.value,
    };

    if (fileCover || fileAvatar) {
      console.log("fileCover: ", fileCover);
      console.log("fileAvatar: ", fileAvatar);
      const data = new FormData();

      try {
        if (fileCover?.type.split("/")[0] === "image") {
          data.append("files", fileCover);
          let uploadedCover = await axios.post(mediaUrl, data, fileOpts);
          console.log("uploadedCover", uploadedCover);
          params.coverPicture = uploadedCover.data.result[0].id;
        }

        if (fileAvatar?.type.split("/")[0] === "image") {
          data.append("files", fileAvatar);
          let uploadedAvatar = await axios.post(mediaUrl, data, fileOpts);
          console.log("uploadedCover", uploadedAvatar);
          params.avatar = uploadedAvatar.data.result[0].id;
        }

        let updateInfo = await axios.put(url, params, opts);
        console.log("updateInfo", updateInfo);

        window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put(url, params, opts);
        window.location.reload(true);
      } catch (err) {}
    }
  };

  function handleChangeAvatar(e) {
    // const img = ref.current.files[0];
    // const obj = URL.createObjectURL(img);
    // setUrl(obj);
    setUpdateAvatarUrl(URL.createObjectURL(e.target?.files[0]));
    setFileAvatar(e.target.files[0]);

    // TODO: API to update to server
  }
  function handleChangeCover(e) {
    setUpdateCoverUrl(URL.createObjectURL(e.target?.files[0]));
    setFileCover(e.target.files[0]);
  }
  return (
    <div className="editUserModalContainer">
      <div className="editUserModal">
        <div className="editUserModalHeader">
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Cập nhật thông tin cá nhân
          </h2>
          <Button
            className="editUserCloseBtnModal"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <CloseRounded />
          </Button>
        </div>
        <div className="editUserModalBody">
          <>
            {fileCover && (
              <div className="editUserCoverImgContainer">
                {fileCover.type.split("/")[0] === "image" && (
                  <img
                    className="editUserCover"
                    src={URL.createObjectURL(fileCover)}
                    alt=""
                  />
                )}
                {fileCover.type.split("/")[0] === "video" && (
                  <video width="750" height="500" controls>
                    <source
                      src={URL.createObjectURL(fileCover)}
                      type="video/mp4"
                    />
                  </video>
                )}
                <Cancel
                  className="shareCancelImg"
                  onClick={() => setFileCover(null)}
                />
              </div>
            )}
            {fileCover == null && (
              <div className="editUserCoverImgContainer">
                <img
                  className="editUserCover"
                  // src={PF + "noBackground.jpg"}
                  src={
                    updateCoverUrl != null
                      ? updateCoverUrl
                      : currentUser.imageCover
                      ? `${mediaUrl}/${currentUser.imageCover}`
                      : PF + "person/noCover.jpg"
                  }
                  alt=""
                />
              </div>
            )}

            <div className="uploadCoverBtn">
              <label for="cover-upload" className="uploadLabel">
                <CloudUpload htmlColor="tomato" className="uploadIcon" />
                <span>
                  <h3>Ảnh bìa</h3>
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="cover-upload"
                  accept=".png,.jpeg,.jpg,.mp4"
                  onChange={(e) => setFileCover(e.target.files[0])}
                />
              </label>
            </div>

            {/* <div className="editUserAvatarContainer"> */}
            {fileAvatar == null && (
              <img
                className="editUserAvatar"
                src={
                  updateAvatarUrl != null
                    ? updateAvatarUrl
                    : currentUser.avatar
                    ? `${mediaUrl}/${currentUser.avatar}`
                    : PF + "person/noAvatar.png"
                }
                alt=""
                ref={avatarUploadRef}
              ></img>
            )}
            {fileAvatar && (
              <img
                className="editUserAvatar"
                src={URL.createObjectURL(fileAvatar)}
                alt=""
                ref={avatarUploadRef}
              ></img>
            )}

            <div className="uploadAvatarBtn">
              <label for="avatar-upload" className="uploadLabel">
                <CloudUpload htmlColor="tomato" className="uploadIcon" />

                <span>
                  <h3> Ảnh đại diện</h3>
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="avatar-upload"
                  accept=".png,.jpeg,.jpg,.mp4"
                  onChange={(e) => setFileAvatar(e.target.files[0])}
                />
              </label>
            </div>

            <hr className="editUserHr" />

            <form className="editUserBox" onSubmit={handleSubmit}>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserName">
                  Tên
                </label>
                <input
                  label="Name"
                  placeholder="Nhập tên của bạn"
                  defaultValue={currentUser?.name}
                  minLength="6"
                  type="text"
                  required
                  className="editUserInput"
                  ref={username}
                  id="editUserName"
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  Điện thoại
                </label>
                <input
                  placeholder="Nhập số điện thoại"
                  defaultValue={currentUser?.phone}
                  type="text"
                  required
                  minLength="6"
                  className="editUserInput"
                  ref={phone}
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  Email
                </label>
                <input
                  placeholder="Nhập địa chỉ email"
                  defaultValue={currentUser?.email}
                  type="text"
                  required
                  className="editUserInput"
                  ref={email}
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  Address
                </label>
                <input
                  placeholder="Nhập địa chỉ"
                  defaultValue={currentUser?.address}
                  type="text"
                  required
                  minLength="6"
                  className="editUserInput"
                  ref={address}
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  Giới tính
                </label>
                <input
                  placeholder="Nam"
                  defaultValue={currentUser?.sex}
                  type="text"
                  className="editUserInput"
                  ref={sex}
                />
              </div>
              <div className="editUserInputContainer">
                <label className="labelInputEditUser" for="editUserUsername">
                  Tuổi
                </label>
                <input
                  placeholder="Nhập tuổi của bạn"
                  defaultValue={currentUser?.age}
                  type="text"
                  className="editUserInput"
                  ref={age}
                />
              </div>
              <AppButton
                text="Cập nhật"
                type="submit"
                isLoading={isLoading}
                addtionalStyles={{
                  width: "150px",
                  height: "46px",
                  borderRadius: "6px",
                  margin: "10px 0px ",
                }}
              ></AppButton>
            </form>
          </>
        </div>
      </div>
    </div>
  );
}
