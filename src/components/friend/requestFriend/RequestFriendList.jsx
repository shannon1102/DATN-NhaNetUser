import * as React from "react";
// import { styled } from "@material-ui/core";
import { Grid, Box, Paper } from "@material-ui/core";
import RequestFriend from "./requestItem/RequestFriend";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import './requestFriendList.css'

export default function RequestFriendList() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [requestUsers, setRequestUsers] = useState([]);

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
      `${process.env.REACT_APP_BASE_URL}/friends/requested-friends`;
    const fetchUser = async () => {
      const res = await axios.get(url,opts);
      console.log("res get request friend Info: ", res.data);
      setRequestUsers(res.data?.result);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      <>
        {requestUsers?.length > 0 && (
          <>
           <Paper className="friendListTitle">
              <h1>Request Friends</h1>
              <hr className="hrFiend"></hr>
           </Paper>
          
          </>
        )}
      </>
      <Box
        sx={{ flexGrow: 1 }}
        // sx={{ width: 300 }}
      >
        <Grid container spacing={3}>
          {requestUsers?.length > 0 &&
            requestUsers.map((requestUser) => (
              <Grid item xs={2.5} key={requestUser.id}>
                <RequestFriend user={requestUser.requester} curUser={currentUser}>
                </RequestFriend>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
