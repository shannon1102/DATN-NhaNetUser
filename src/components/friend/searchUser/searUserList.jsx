import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import "./searchUserList.css";
import SearchUserCard from "./SearchUserCard";
import { SearchContext } from "../../../context/SearchContext";

export default function SearchUserList() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [searchUsers, setSearchUsers] = useState([]);
  const { search } = useContext(SearchContext);

  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const opts = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    opts.headers.Authorization = "Bearer " + currentUser.token;
    const params = new URLSearchParams({
      // limit: 30,
      // offset: 0,
    }).toString();
    const url = `${process.env.REACT_APP_BASE_URL}/users`;
    const fetchUser = async () => {
      const res = await axios.get(url, opts);
      console.log("res get request SearchUser Info: ", res.data);
      setSearchUsers(res.data?.result);
    };
    fetchUser();
  }, [currentUser, search]);

  return (
    <>
      {/* {SearchUsers?.length > 0 && ( */}
      <>
        <Paper className="SearchUserListTitle">
          <h1>Danh sách gười dùng</h1>
          <hr className="hrFiend"></hr>
        </Paper>
      </>
      {/* )} */}

      <Grid container spacing={3}>
        {searchUsers?.length > 0 &&
          searchUsers
            .filter((e) =>
              e?.name?.toLowerCase().includes(search?.toLowerCase())
            )
            .map((searchUser) => (
              <Grid item xs={3} key={searchUser.id}>
                <SearchUserCard user={searchUser} curUser={currentUser}></SearchUserCard>
              </Grid>
            ))}
      </Grid>
    </>
  );
}
