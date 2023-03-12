import axios from "axios";
import { forwardRef, useRef, useState,Fragment } from "react";
import "./registerAfter.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AppButton from "../../components/AppButton/AppButton";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

import { AccessAlarm, Close } from '@material-ui/icons';
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
export default function Register() {
  const [open, setOpen] = useState(false);
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  console.log("BASEURLLLL", process.env.REACT_APP_BASE_URL);
  const baseURL = process.env.REACT_APP_BASE_URL;
  
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
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

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      console.log("Passwordm",passwordAgain,password)
      passwordAgain.current.setCustomValidity("Mật khẩu không giống nhau");
    } else {
      const user = {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        phone: phone.current.value
      };
      try {
        const resp = await axios.post(`${baseURL}/auth/register`, user);
        
        setOpen(true);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
    
    <div className="register">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 -1.5 15 7">
        <path
          d="M0 0 7 0Q9 0 9 2L9 3Q9 5 11 5L17 5M17 5 17-3 0-3 0 0"
          fill="#ffffff"
        />
      </svg>
      <div className="register__building">
        <img src="assets/building.png" alt="" />
      </div>
      <div className="register__box">
        <div className="register__box-title">Đăng ký</div>
        <div className="register__box-intro">Đăng ký tài khoản vào hệ thống</div>
        <form className="register__form" onSubmit={handleClick}>
          <div className="register__input-box">
            <input
              placeholder="Nhập địa chỉ email"
              type="tel"
              className="register__input"
              ref={email}
            />
            <img src="assets/email.png" alt="" />
          </div>
          <div className="register__input-box">
            <input
              placeholder="Nhập tên người dùng"
              type="tel"
              className="register__input"
              ref={name}
            />
            <img src="assets/name.png" alt="" />
          </div>
          <div className="register__input-box">
            <input
              placeholder="Nhập số điện thoại"
              type="tel"
              className="register__input"
              ref={phone}
            />
            <img src="assets/telephone.png" alt="" />
          </div>
          <div className="register__input-box">
            <input
              placeholder="Mật khẩu"
              type="password"
              className="register__input"
              ref={password}
            />
            <img src="assets/padlock.png" alt="" />
          </div>
          <div className="register__input-box">
            <input
              placeholder="Nhập lại mật khẩu"
              type="password"
              className="register__input"
              ref={passwordAgain}
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
            <a href="#" className="register__forgot">
              {/* Quên mật khẩu */}
            </a>
            <AppButton
              text="Đăng ký"
              type="submit"
              // isLoading={isFetching}
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
            Bạn đã có tài khoản?
          </span>
          <a
            href="/register"
            style={{
              color: "var(--primary-color)",
              fontWeight: "bold",
            }}
          >
            Đăng nhập ngay
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
