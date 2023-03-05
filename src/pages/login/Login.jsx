import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import AppButton from "../../components/AppButton/AppButton";
require("dotenv").config();

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
  };

  return (
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
        <div className="login__box-title">Đăng nhập</div>
        <div className="login__box-intro">Đăng nhập hệ thống</div>
        <form className="login__form" onSubmit={handleClick}>
          <div className="login__input-box">
            <input
              placeholder="Nhập địa chỉ email"
              type="tel"
              className="login__input"
              ref={email}
            />
            <img src="assets/email.png" alt="" />
          </div>
          <div className="login__input-box">
            <input
              placeholder="Mật khẩu"
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
              Quên mật khẩu
            </a>
            <AppButton
              text="Đăng nhập"
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
            Bạn chưa có tài khoản?
          </span>
          <a
            href="/register"
            style={{
              color: "var(--primary-color)",
              fontWeight: "bold",
            }}
          >
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}
