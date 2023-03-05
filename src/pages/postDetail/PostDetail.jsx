/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useState } from "react";
// import { Slide, Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
// import Topbar from "../../components/topbar/Topbar";
import "./postDetail.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Fade } from "react-slideshow-image";
import { format } from "timeago.js";
import PostHandlePopup from "../../components/post/popup/PostHandlePopup";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { GET } from "../../aixosHttpUitls";
import { Typography } from "@material-ui/core";
export default function PostDetail({post}) {
  const [currPost,setCurrPost] = useState(null)
  const [isLoading,setIsLoading] = useState(true);
  
  let { post_id } = useParams();
  console.log("POSTID",post_id);
  const { user: currentUser } = useContext(AuthContext);
  
  const mediaUrl = `${process.env.REACT_APP_BASE_URL}/media`;
  useEffect(() => {
    setIsLoading(true);
    const params = new URLSearchParams({
      token: currentUser.token,
    }).toString();
    
    console.log('params: ', params);
    const url =
      `${process.env.REACT_APP_BASE_URL}/posts/${post_id}`;
      console.log("url");
    const fetchPostDetail = async () => {
      const res = await axios.get(url);
      console.log("res get Info: ", res.data);
      setCurrPost(res.data.result.post);
      setIsLoading(false)
    };
    fetchPostDetail();
  }, [currentUser.token, post_id]);
  console.log("dadadad", currPost);

  const FileBaseURL = process.env.REACT_APP_NODEJS_BE_FILE_FOLDER;
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  let oneImageUrl = "";
  if(currPost?.mediaMaps.length === 1){

    oneImageUrl = "http://localhost:4000/static/" + currPost.mediaMaps[0].media.link;
  }
  if(isLoading)
    return <p>...Loading </p>
  else return (
    <div className="postDetail">
      <div className="mediaContainer">
        <div
          className="slide-container"
          style={{
            display: "block",
            // justifyContent: "center",
            marginLeft: "auto",
            marginRight: "auto",
            width: "1000px",
          }}
        >
          {currPost?.mediaMaps.length > 1 && (
            <Fade>
              {currPost?.mediaMaps.map((fadeImage, index) => {
                let imageUrl =
                  "http://localhost:4000/static/" + fadeImage.media.link;
                // console.log("IMG LINK", imageUrl);
                return (
                  <div
                    className="each-fade"
                    key={index}
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                      // marginBottom:"auto",
                      marginTop: "20px",
                      width: "100%",
                      maxHeight: "500px",
                      maxWidth: "100%",
                    }}
                  >
                    <div className="image-container" width={"600px"}>
                      <img
                        src={imageUrl}
                        alt="postimage"
                        width={"100%"}
                        height={"auto"}
                      />
                    </div>
                    <h2>{fadeImage?.caption}</h2>
                  </div>
                );
              })}
            </Fade>
          )}
          {currPost?.mediaMaps.length === 1 && (
            <div className="image-container" width={"900px"}>
              <img src={oneImageUrl}></img>
            </div>
          )}
        </div>
      </div>
      <div class="dataContainer">
        <div className="postDataContainer">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${currPost.user.id}`}>
                <img
                  className="postProfileImg"
                  src={
                    currPost.user.avatar
                      ? `${mediaUrl}/${currPost.user.avatar}`
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              </Link>
              <span className="postUsername">{currPost.user.name}</span>
              <span className="postDate">{format(currPost.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <PostHandlePopup
                post={currPost}
                currentUser={currentUser}
              ></PostHandlePopup>
              {currPost.description && (
                // <span className="postText">{post.described}</span>
                <Typography>{currPost.description}</Typography>
              )}
            </div>
          </div>
        </div>
        <div className="commentContainer"></div>
      </div>
    </div>
  );
}
