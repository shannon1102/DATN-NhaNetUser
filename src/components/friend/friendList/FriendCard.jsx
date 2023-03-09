
import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import "./friend.css"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
export default function FriendCard({ user,curUser }) {

  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  opts.headers.Authorization = "Bearer " + curUser.token;
  const histpry = useHistory();

  const handleChatClick = async ()=>{
    try {
      const data = {
        firstUserId: curUser.id,
        secondUserId: user.id
      };
      const uri =
        `${process.env.REACT_APP_BASE_URL}/chat/conversations`;
      const createConversationResp = await axios.post(uri,data,opts);
      console.log('createConversationResp: ', createConversationResp);
      histpry.push("/messenger")
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
          onClick={handleChatClick}
        >
          Nhắn tin
        </Button>
        </CardActions>
        <CardActions className="cardAction">
        <Button
          size="medium"
          style={{ backgroundColor: "#606770", color: "#F3F8FE" ,width:"100%" }}
          onClick={handleRemoveClick}
        >
          Xóa bạn
        </Button>
      </CardActions>
    </Card>
  );
}
