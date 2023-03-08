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
      const params = {
        requesterId:user.id,
      };
      const uri =
        `${process.env.REACT_APP_BASE_URL}/friends/accept-friend`;
      const rejectesponse = await axios.post(uri,params,opts);
      window.location.reload(true);
      console.log('rejectesponse: ', rejectesponse);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image= { user?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${user?.avatar}` :  "/assets/person/noAvatar.png"}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.name || "user" + user?.id?.substring(0, 8)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {user?.same_friends + ' same friend'}
        </Typography>
      </CardContent>
      <CardActions className="cardAction">
        <Button size="medium" style={{ backgroundColor: "#2374E1", color:"#F3F8FE" }} onClick={handleAddClick}>
          Add
        </Button>
        <Button size="medium" style={{ backgroundColor: "#606770", color:"#F3F8FE" }} onClick={handleRemoveClick}>
          Remove
        </Button>
      </CardActions>
    </Card>
    </Paper>
    
  );
}
