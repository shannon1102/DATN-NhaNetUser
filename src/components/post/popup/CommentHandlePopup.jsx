import * as React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "./commentHandelPopup.css";
import axios from "axios";

import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import Modal from "../modal/Modal";
export default function CommentHandlePopup({ comment, currentUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const open = Boolean(anchorEl);
  const [isEditComment, setIsEditComment] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = async () => {
    try {
      const opts = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      opts.headers.Authorization = "Bearer " + currentUser.token;
      const uri = `${baseUrl}/comments/${comment.id}`;
      console.log("uri: ", uri);
      const deleteResp = await axios.delete(uri, opts);
      console.log("deleteResp: ", deleteResp);
      setAnchorEl(null);
    //   window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };


  const checkOwner = (comment, currentUser) => {
    if (comment?.userId === currentUser.id) return true;
    return false;
  };
  return (
    <>
      {checkOwner(comment, currentUser) && (
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVert />
        </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDelete}>Delete Comment</MenuItem>
      </Menu>
      {isEditComment && (
        <Modal
          comment={comment}
          currentUser={currentUser}
          setIsOpen={setIsEditComment}
        />
      )}
    </>
  );
}
