import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./requestItem.css";
import axios from "axios";
export default function RequestFriend({ user,curUser }) {

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + curUser.token;

  const handleAcceptClick = async ()=>{
  
    try {
      const params = new URLSearchParams({
        requesterId: user.id
      });
      const uri =
        `${process.env.REACT_APP_BASE_URL}/friends/accept-friend`;
      const acceptResponse = await axios.post(uri,{requesterId: user.id},opts);
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
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/profile/${user.id}`}>
      <CardMedia
        component="img"
        height="250"
        image={ user?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${user?.avatar}` : "/assets/person/noAvatar.png"}
        alt=""
      />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.name || "Lizard Alina"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.sameFriend + " bạn chung"}
        </Typography>
      </CardContent>
      <CardActions className="cardAction">
        <Button
          size="medium"
          style={{ backgroundColor: "#2374E1", color: "#F3F8FE" ,width:"100%"}}
          onClick={handleAcceptClick}
        >
          Chấp nhận
        </Button>
        </CardActions>
        <CardActions className="cardAction">
        <Button
          size="medium"
          style={{ backgroundColor: "#606770", color: "#F3F8FE" ,width:"100%" }}
          onClick={handleRemoveClick}
        >
          Xóa, gỡ bỏ
        </Button>
      </CardActions>
    </Card>
  );
}
