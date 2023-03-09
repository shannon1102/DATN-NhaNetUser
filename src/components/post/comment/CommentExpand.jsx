import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ListComment from "./listComent/ListComment";
import "./commentExpand.css";
import { Send } from "@material-ui/icons";
export default function CommentExpand({ post, setNoCmts }) {
  const { user: currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState(post.comments);
  // const cmtRef = useRef();
  const [commentInput, setCommentInput] = useState("");
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + currentUser.token;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handleSendComment = async () => {
    console.log("Alooo0000000000000");
    try {
      const params = {
        postId: post.id,
        comment: commentInput,
        userId: currentUser.id,
      };
      console.log("Check data", commentInput);

      const url = `${process.env.REACT_APP_BASE_URL}/comments`;

      const res = await axios.post(url, params, opts);
      console.log("res get comments: ", res?.data?.result);
      setComments(res?.data?.result.post.comments);
      setNoCmts(res?.data?.result.post.comments.length);
      setCommentInput("")
      // cmtRef.current.reset();
    } catch (error) {}
  };

  return (
    <div>
      <>
        <>
          <div className="commentInputContainer">
            <img
              className="commentProfileImg"
              src={
                currentUser.avatar
                  ? `${process.env.REACT_APP_MEDIA_URL}/${currentUser.avatar}`
                  : PF + "person/noAvatar.png"
              }
              alt=""
            />
            <input
              // className={}
              placeholder={"Viết bình luận ... "}
              className="commentInput"
              onChange={(e)=>setCommentInput(e.target.value)}
              value={commentInput}
              // ref={forwardedRef}
            />
            <Send onClick={handleSendComment} className="commentSend" />
          </div>
        </>
        <ListComment comments={comments} setListComments={setComments} setNoCmts={setNoCmts}/>
      </>
    </div>
  );
}
