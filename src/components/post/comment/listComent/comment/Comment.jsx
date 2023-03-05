import { MoreVert } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import "./comment.css";
import { Paper, Typography } from "@material-ui/core";
export default function Comment({ comment }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    // <div className="cmtContainer">
    <Paper className="cmtContainer">
      <img
        className="cmtUserAvatar"
        src={
          comment?.user?.avatar
            ? `${process.env.REACT_APP_MEDIA_URL}/${comment?.user?.avatar}`
            : PF + "person/noAvatar.png"
        }
        alt=""
      />

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
