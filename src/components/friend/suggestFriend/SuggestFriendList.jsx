import * as React from "react";
// import { styled } from "@material-ui/core";
import { Grid, Box, Paper } from "@material-ui/core";
import SuggestFriend from "./suggestFriend/SuggestFriend";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import { SearchContext } from "../../../context/SearchContext";

export default function SuggestFriendList() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [suggestUser, setSuggestUser] = useState([]);
  const { search } = useContext(SearchContext);
  // const userID = useParams().user_id;
  const { user: currentUser } = useContext(AuthContext);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + currentUser.token;
  useEffect(() => {
    const params = new URLSearchParams({
      offset: 0,
      limit: 100,
    }).toString();
    const url = `${process.env.REACT_APP_BASE_URL}/friends/suggested-friends`;
    const fetchUser = async () => {
      const res = await axios.get(url, opts);
      console.log("res get suggested friend: ", res.data);
      console.log(res?.data?.result);
      setSuggestUser(res?.data?.result);
    };
    fetchUser();
  }, [currentUser]);

  return (
    <>
      <>
        {suggestUser.filter((e) =>
          e?.name?.toLowerCase().includes(search?.toLowerCase())
        )?.length > 0 && (
          <>
            <Paper className="friendListTitle">
              <h1>Những người bạn có thể biết</h1>
              <hr className="hrFiend"></hr>
            </Paper>
          </>
        )}
      </>
      <Grid container spacing={3}>
        {suggestUser.length > 0 &&
          suggestUser
            .filter((e) =>
              e?.name?.toLowerCase().includes(search?.toLowerCase())
            )
            .map((user) => (
              <Grid item xs={3} key={user.id}>
                <SuggestFriend user={user} curUser={currentUser}>
                  {" "}
                </SuggestFriend>
              </Grid>
            ))}
      </Grid>
    </>
  );
}
