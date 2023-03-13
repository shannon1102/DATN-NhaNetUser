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
import { SearchContext } from "../../context/SearchContext";
// import Modal from "../post/modal/Modal";

export default function Feed({ userID }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const { search } = useContext(SearchContext);

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + user.token;
  let a = userID;
  console.log("AAAAAAAAAAAAAAAAAAAAA", a);

  const fetchPosts = async () => {
    console.log("USERIDDDDDDDD", userID);
    let url = "";
    if (userID) {
      url = `${process.env.REACT_APP_BASE_URL}/posts?userId=${userID}`;
    } else {
      url = `${process.env.REACT_APP_BASE_URL}/posts`;
    }
    console.log("Base URL", url);
    const res = await axios.get(url, opts);
    setPosts(
      res.data.result.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };
  useEffect(() => {
    fetchPosts();
  }, [
    userID,
    user.token,
    user.name,
    user.avatar,
    user.phone,
    user.age,
    user.sex,
    search,
  ]);

  return (
    <>
      <div className="feed">
        <div className="feedWrapper">
          {(!userID || userID === user.id) && (
            <Share fetchPosts={fetchPosts} user={user} />
          )}

          {posts
            .filter((e) =>
              e.description?.toLowerCase().includes(search?.toLowerCase())
            )

            .map((p) => (
              <Post key={p.id} post={p} />
            ))}
        </div>
      </div>
      {/* <Modal></Modal> */}
    </>
  );
}
