import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
// import Modal from "../post/modal/Modal";

export default function Feed({ userID }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    opts.headers.Authorization = "Bearer " + user.token;
    let a= userID;
    console.log("AAAAAAAAAAAAAAAAAAAAA",a)
  
  const fetchPosts = async () => {
    const profileParams = new URLSearchParams({
      token: user.token,
      limit: 30,
      user_id: userID,
      offset: 0,
    }).toString();
    console.log("USERIDDDDDDDD",userID)
    let url = "";
    if (userID) {
      url = `${process.env.REACT_APP_BASE_URL}/posts?userId=${userID}`;
    } else {
      url = `${process.env.REACT_APP_BASE_URL}/posts`;
    }
    console.log("Base URL",url);
    const res = await axios.get(url,opts);
    setPosts(
      res.data.result.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };
  useEffect(() => {
    fetchPosts();
  }, [userID, user.token]);

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {(!userID || userID === user.id) && <Share fetchPosts={fetchPosts} />}

          {posts.map((p) => (
            <Post key={p.id} post={p} />
          ))}
        </div>
      </div>
      {/* <Modal></Modal> */}
    </>
  );
}
