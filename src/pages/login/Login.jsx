import { Fragment, forwardRef, useContext, useRef, useState } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import AppButton from "../../components/AppButton/AppButton";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

import { AccessAlarm, Close } from '@material-ui/icons';
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
require("dotenv").config();

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    // try{
    e.preventDefault();
    let resp = await loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
      );
      console.log("resp",resp)
      if(resp)
       setOpen(true);
  
  };
  const Alert =forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen] = useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <Close fontSize="small" />
      </IconButton>
    </Fragment>
  );


  return (<>
    <div className="login">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 -1.5 15 7">
        <path
          d="M0 0 7 0Q9 0 9 2L9 3Q9 5 11 5L17 5M17 5 17-3 0-3 0 0"
          fill="#ffffff"
        />
      </svg>
      <div className="login__building">
        <img src="assets/building.png" alt="" />
      </div>
      <div className="login__box">
        <div className="login__box-title">????ng nh???p</div>
        <div className="login__box-intro">????ng nh???p h??? th???ng</div>
        <form className="login__form" onSubmit={handleClick}>
          <div className="login__input-box">
            <input
              placeholder="Nh???p ?????a ch??? email"
              type="tel"
              className="login__input"
              ref={email}
            />
            <img src="assets/email.png" alt="" />
          </div>
          <div className="login__input-box">
            <input
              placeholder="M???t kh???u"
              type="password"
              className="login__input"
              ref={password}
            />
            <img src="assets/padlock.png" alt="" />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "400px",
            }}
          >
            <a href="#" className="login__forgot">
              Qu??n m???t kh???u
            </a>
            <AppButton
              text="????ng nh???p"
              type="submit"
              isLoading={isFetching}
              addtionalStyles={{
                margin: "15px",
                width: "150px",
              }}
            ></AppButton>
          </div>
        </form>

        <div
          style={{
            marginTop: "10px",
          }}
        >
          <span
            style={{
              marginRight: "4px",
            }}
          >
            B???n ch??a c?? t??i kho???n?
          </span>
          <a
            href="/register"
            style={{
              color: "var(--primary-color)",
              fontWeight: "bold",
            }}
          >
            ????ng k?? ngay
          </a>
        </div>
      </div>
    </div>
    <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
}
