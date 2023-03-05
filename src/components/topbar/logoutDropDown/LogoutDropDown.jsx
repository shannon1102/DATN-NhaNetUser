import * as React from "react";
import { Button, Menu, MenuItem } from "@material-ui/core";
import "./logoutDropDown.css";
import { ArrowDropDown } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./logoutDropDown.css"

export default function LogoutDropDown({ currentUser }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async (e) => {
    try {
      console.log("Logout clicked");
      localStorage.removeItem("user");
      
      let checkUser = localStorage.getItem("user");
      console.log("checkUser",checkUser)


      e.preventDefault();
 
      setAnchorEl(null);
      window.location.reload(true);
    } catch (error) {}
  };

  return (
    <div>
      
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="#FFFFFF"
        variant="text"
        
      >
        <ArrowDropDown className="arrowLogout" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ marginRight: "30px" }}
      >
       <MenuItem onClick={handleLogout}><Link to={`/login`}>Log out</Link></MenuItem>
      </Menu>
    </div>
  );
}
