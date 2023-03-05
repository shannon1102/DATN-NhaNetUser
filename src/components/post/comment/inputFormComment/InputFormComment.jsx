import React from "react";
import "./inputFormComment.css";
import { Send } from "@material-ui/icons";
export default function InputFormComment({ user, forwardedRef, sendCmtClick }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <>
        <div className="commentInputContainer">
          <img
            className="commentProfileImg"
            src={
              user.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${user.avatar}` : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            // className={}
            placeholder={"Viết bình luận ... "}
            className="commentInput"
            ref={forwardedRef}
          />
          <Send onClick={sendCmtClick} className="commentSend" />
        </div>
      </>
    </div>
  );
}
