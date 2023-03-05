import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Comment from "./comment/Comment";

export default function ListComment({ comments }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  return (
    <div className="commentTop">
      {comments?.map((cmt) => (
        <Comment comment={cmt} />
      ))}
    </div>
  );
}
