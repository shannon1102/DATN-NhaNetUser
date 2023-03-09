import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import './friendList.css'
import FriendCard from "./FriendCard";

export default function FriendList() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {

    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    opts.headers.Authorization = "Bearer " + currentUser.token;
    const params = new URLSearchParams({
      limit: 30,
      offset: 0,
    }).toString();
    const url =
      `${process.env.REACT_APP_BASE_URL}/friends`;
    const fetchUser = async () => {
      const res = await axios.get(url,opts);
      console.log("res get request friend Info: ", res.data);
      setFriends(res.data?.result);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      <>
        {friends?.length > 0 && (
          <>
           <Paper className="friendListTitle">
              <h1>Danh sách tất cả người bạn</h1>
              <hr className="hrFiend"></hr>
           </Paper>
          
          </>
        )}
      </>

        <Grid container spacing={3}>
          {friends?.length > 0 &&
            friends.map((friend) => (
              <Grid item xs={3} key={friend.id}>
                <FriendCard user={friend} curUser={currentUser}>
                </FriendCard>
              </Grid>
            ))}
        </Grid>
    </>
  );
}
