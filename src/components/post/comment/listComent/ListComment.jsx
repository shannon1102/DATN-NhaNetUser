import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Comment from "./comment/Comment";

export default function ListComment({ comments }) {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);
  console.log("COment", comments);
  return (
    <div className="commentTop">
      {comments
        ?.sort(function (a, b) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .map((cmt) => (
          <Comment comment={cmt} />
        ))}
    </div>
  );
}
