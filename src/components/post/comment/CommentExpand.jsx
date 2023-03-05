import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import InputFormComment from "./inputFormComment/InputFormComment";
import ListComment from "./listComent/ListComment";
import './commentExpand.css'
export default function CommentExpand({ post }) {
  const { user: currentUser } = useContext(AuthContext);
  const [comments, setComments] = useState(post.comments);
  const cmtRef = useRef();
  const opts = {
    headers: {
        'Content-Type': 'application/json'
    }
};
    opts.headers.Authorization = "Bearer " + currentUser.token;
 
  const handleSendComment = async () => {
    console.log("Alooo0000000000000",)
    try {
      const params ={
        postId: post.id,
        comment: cmtRef.current.value,
        userId: currentUser.id,
      };
      console.log("Check data",cmtRef.current.value);

      const url =
        `${process.env.REACT_APP_BASE_URL}/comments`;
  
        const res = await axios.post(url,params,opts);
        console.log("res get comments: ", res?.data?.result);
        setComments(res?.data?.result.post.comments);
        cmtRef.current = ""

    } catch (error) {}
  };

  return (
    <div>
      <>
        <InputFormComment
          user={currentUser}
          forwardedRef={cmtRef}
          sendCmtClick={handleSendComment}
        />
        <ListComment comments={comments} />
      </>
    </div>
  );
}
