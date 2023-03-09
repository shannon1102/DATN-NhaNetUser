import { MoreVert } from "@material-ui/icons";
import React, { useContext } from "react";
import { useEffect } from "react";
import "./comment.css";
import { Paper, Typography } from "@material-ui/core";
import { format } from "timeago.js";
import CommentHandlePopup from "../../../popup/CommentHandlePopup";
import { AuthContext } from "../../../../../context/AuthContext";
export default function Comment({ comment ,listComments, setListComments,setNoCmts}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  return (
    // <div className="cmtContainer">
    <Paper className="cmtContainer">
      <div className="topComment">
        <img
          className="cmtUserAvatar"
          src={
            comment?.user?.avatar
              ? `${process.env.REACT_APP_MEDIA_URL}/${comment?.user?.avatar}`
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <span className="postDate" style={{ marginTop: "4px" }}>
          {format(comment.createdAt)}
        </span>
        <CommentHandlePopup
          comment={comment}
          listComments={listComments}
          setListComments={setListComments}
          currentUser={currentUser}
          className="cmtPopUp"
          setNoCmts={setNoCmts}
        ></CommentHandlePopup>
      </div>
      <div className="cmtRight">
        <>
          <p className="cmtRightUser"> {comment?.user.name}</p>
          <Typography>{comment?.comment}</Typography>
        </>
      </div>
    </Paper>

    // </div>
  );
}
