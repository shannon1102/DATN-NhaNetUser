import { Typography } from "@material-ui/core";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import PostMedia from "../postMedias/PostMedia";
import CommentExpand from "./comment/CommentExpand";
import PostHandlePopup from "./popup/PostHandlePopup";
import "./post.css";
require("dotenv").config();

export default function Post({ post }) {
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;

  const [like, setLike] = useState(post.like);
  const [noCmts, setNoCmts] = useState(post.comments.length);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isExpandComment, setIsExpandComment] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setUser(post.user);
  }, [post.user]);

  const opts = {
    headers: {
        'Content-Type': 'application/json'
    }
};
    opts.headers.Authorization = "Bearer " + currentUser.token;

  const likeHandler = async () => {
    try {
      const params ={
        postId: post.id,
      };
      const uri = `${process.env.REACT_APP_BASE_URL}/like`;
      const likeResponse = await axios.post(uri,params,opts);
      console.log("likeResponse: ", likeResponse);
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked == true ? parseInt(like) - 1 : parseInt(like) + 1);
    setIsLiked(isLiked === false ? true : false);
  };
  let postOneImgUrl = "";
  if (post.mediaMaps?.length === 1) {
    postOneImgUrl =
      `${process.env.REACT_APP_MEDIA_URL}/` +
      post.mediaMaps[0].media.id;
    console.log("postImgUrl", postOneImgUrl);
  }

  return (
    <>
      <div className="post">
        <>
          <div className="postWrapper">
            <div className="postTop">
              <div className="postTopLeft">
                <Link to={`/profile/${user.id}`}>
                  <img
                    className="postProfileImg"
                    src={
                      user.avatar
                        ? `${mediaUrl}/${user.avatar}`
                        : PF + "person/noAvatar.png"
                    }
                    alt=""
                  />
                </Link>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    marginLeft: "10px",
                  }}
                >
                  <span className="postUsername">{user.name}</span>
                  <span className="postDate" style={{ marginTop: "4px" }}>
                    {format(post.createdAt)}
                  </span>
                </div>
              </div>
              <div className="postTopRight">
                <PostHandlePopup
                  post={post}
                  currentUser={currentUser}
                ></PostHandlePopup>
              </div>
            </div>
            {post.description && (
              <Typography
                style={{
                  margin: "8px 20px 8px 20px",
                }}
              >
                {post.description}
              </Typography>
            )}
            {post.mediaMaps?.length > 0 && (
              <PostMedia mediaMaps={post.mediaMaps}></PostMedia>
            )}
            <div className="postBottom">
              <div className="postBottomLeft">
                {/* <img
                  className="likeIcon"
                  src={`${PF}like.png`}
                  onClick={likeHandler}
                  alt=""
                /> */}
                <img
                  className="likeIcon"
                  src={`${PF}heart.png`}
                  onClick={likeHandler}
                  alt=""
                />
                {isLiked === true && (
                  <span className="postLikeCounter">
                    {parseInt(like) - 1 == 0 ? "Bạn đã thích" : `Bạn và ${parseInt(like) - 1 } người đã thích` }
                  </span>
                )}
                {isLiked === false && (
                  <span className="postLikeCounter">{like}</span>
                )}
              </div>
              <div
                className="postBottomRight"
                onClick={() => {
                  setIsExpandComment(!isExpandComment);
                }}
              >
                <img
                  className="likeIcon"
                  src={`${PF}comment.png`}
                  // onClick={likeHandler}
                  alt=""
                />
                <span className="postLikeCounter">{noCmts} comments</span>
              </div>
            </div>
            {/* <hr className="sidebarHr" /> */}
          </div>

          {isExpandComment && <CommentExpand post={post} setNoCmts={setNoCmts}/>}
        </>
      </div>
    </>
  );
}
