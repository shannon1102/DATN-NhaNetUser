import axios from "axios";
import { useRef } from "react";
import "./register.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  console.log("BASEURLLLL", process.env.REACT_APP_BASE_URL);
  const baseURL = process.env.REACT_APP_BASE_URL;

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
        await axios.post(`${baseURL}/auth/register`, user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Lamasocial</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Tên"
              required
              ref={name}
              className="registerInput"
            />
             <input
              placeholder="Số điện thoại"
              required
              ref={phone}
              className="registerInput"
              type="tel"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="tel"
            />
            <input
              placeholder="Mật khẩu"
              required
              ref={password}
              className="registerInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Nhập lại mật khẩu"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
            <button className="registerRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
