import React from "react";
import Share from "../../share/Share";
import { Cancel, CloseRounded, EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import "./modal.css";
import { Button } from "@material-ui/core";
export default function Modal({post,currentUser,setIsOpen}) {
  console.log('post: ', post);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="modalContainer">
      <div className="modal">
        <div className="modalHeader">
          <h3>Edit post</h3>
          <Button className="closeBtnModal" onClick={() => {setIsOpen(false)} }>
            <CloseRounded />
          </Button>
        </div>
        <div className="modalBody">
          <>
          <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              currentUser?.data?.avatar
                ? `${process.env.REACT_APP_MEDIA_URL}/${currentUser?.data?.avatar}`
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"Bạn đang nghĩ gì " + currentUser?.name + "?"}
            className="shareInput"
            // ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {/* {file && (
          <div className="shareImgContainer">
            {(file.type.split("/")[0] === "image") && <img className="shareImg" src={URL.createObjectURL(file)} alt="" />}
            {(file.type.split("/")[0] === "video") &&  <video width="750" height="500" controls ><source src={URL.createObjectURL(file)} type="video/mp4"/></video>}
            <Cancel className="shareCancelImg" onClick={() => {}} />
          </div>
        )} */}
        <form className="shareBottom" onSubmit={()=>{}}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Ảnh/Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg,.mp4"
                onChange={(e) => {}}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Cảm thấy</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Đăng
          </button>
        </form>
      </div>
          </>
        </div>
      </div>
    </div>
  );
}
