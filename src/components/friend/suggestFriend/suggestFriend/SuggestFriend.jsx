import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import "./suggestFriend.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function SuggestFriend({  user,curUser  }) {
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + curUser.token;
  const handleAddClick = async ()=>{
    try {
      const params = {
        addresseeId:user.id,
      };
      const uri =
        `${process.env.REACT_APP_BASE_URL}/friends/add-friend`;
      const acceptResponse = await axios.post(uri,params,opts);
      console.log('friend Response: ', acceptResponse);
      window.location.reload(true);

    } catch (err) {
      console.log(err);
    }
  };


  const handleRemoveClick =async ()=>{
    try {
      const data ={
        statusCode: 0,
        userId: user.id
      };
      const uri =
        `${process.env.REACT_APP_BASE_URL}/friends/update-friend-status`;
      const rejectesponse = await axios.post(uri,data,opts);
      window.location.reload(true);
      console.log('rejectesponse: ', rejectesponse);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <Paper>
      <Card sx={{ minWidth: 345 ,maxWidth:400 }}>
      <Link to={`/profile/${user.id}`}>
      <CardMedia
        component="img"
        height="250"
        image= { user?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${user?.avatar}` :  "/assets/person/noAvatar.png"}
        alt=""
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.name || "user" + user?.id?.substring(0, 8)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {user?.sameFriend + ' bạn chung'}
        </Typography>
      </CardContent>
      <CardActions className="cardAction">
        <Button className = "friendCardBtn"size="medium" style={{ width:"100%" ,backgroundColor: "#2374E1", color:"#F3F8FE" }} onClick={handleAddClick}>
          Thêm bạn bè
        </Button>
        </CardActions>
        <CardActions className="cardAction">
        <Button className ="friendCardBtn" size="medium" style={{  width:"100%" , backgroundColor: "#F0F2F5" }} onClick={handleRemoveClick}>
          Xóa
        </Button>
      </CardActions>
    </Card>
    // </Paper>
    
  );
}
