import { Button, CircularProgress } from "@material-ui/core";
import { Cancel, CloseRounded, CloudUpload } from "@material-ui/icons";
import axios from "axios";
import React, { useRef, useState, useContext } from "react";
import AppButton from "../../../components/AppButton/AppButton";
import "./editUserInforModal.css";
import { AuthContext } from "../../../context/AuthContext";
export default function EditUserInfoModal({ currentUser, setIsOpen }) {
  const username = useRef();
  const email = useRef();
  const phone = useRef();
  const address = useRef();
  const sex = useRef();
  const age = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const avatarUploadRef = useRef(null);

  const [updateAvatarUrl, setUpdateAvatarUrl] = useState(null);
  const [updateCoverUrl, setUpdateCoverUrl] = useState(null);
  const [fileCover, setFileCover] = useState(null);
  const [fileAvatar, setFileAvatar] = useState(null);
  const { isFetching, dispatch } = useContext(AuthContext);

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

  const handleSubmit = async (e) => {
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

        let res = await axios.put(url, params, opts);
        let updatedInfo = res.data.result;
        console.log("updateInfo", updatedInfo);
        dispatch({
          type: "EDIT_USER_SUCCESS",
          payload: {
            ...updatedInfo,
            token: currentUser.token,
          },
        });
        if(isFetching){
          return <p>Loadinggg</p>
        }else{
          setIsOpen(false);
          // window.location.reload(true);
          
        }
        // window.location.reload(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.put(url, params, opts);
        let updatedInfo = res.data.result;
        console.log("res Edittttt: ", res);
        dispatch({
          type: "EDIT_USER_SUCCESS",
          payload: {
            ...updatedInfo,
            token: currentUser.token,
          },
        });
        // console.log(user)
        // window.location.reload(true);
        if(isFetching){
          return <p>Loadinggg</p>
        }else{
          setIsOpen(false);
          // window.location.reload(true);
          
        }
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
            C???p nh???t th??ng tin c?? nh??n
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
                  <h3>???nh b??a</h3>
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
                  <h3> ???nh ?????i di???n</h3>
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
                  T??n
                </label>
                <input
                  label="Name"
                  placeholder="Nh???p t??n c???a b???n"
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
                  ??i???n tho???i
                </label>
                <input
                  placeholder="Nh???p s??? ??i???n tho???i"
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
                  placeholder="Nh???p ?????a ch??? email"
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
                  placeholder="Nh???p ?????a ch???"
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
                  Gi???i t??nh
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
                  Tu???i
                </label>
                <input
                  placeholder="Nh???p tu???i c???a b???n"
                  defaultValue={currentUser?.age}
                  type="text"
                  className="editUserInput"
                  ref={age}
                />
              </div>
              <AppButton
                text="C???p nh???t"
                type="submit"
                isLoading={isLoading}
                onClick={handleSubmit}
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
