import axios from "axios";
require("dotenv").config();
export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    console.log("BASEURLLLL", process.env.REACT_APP_BASE_URL);
    const baseURL = process.env.REACT_APP_BASE_URL;
    console.log("URLLLL", baseURL);
    const url = `${baseURL}/auth/login`;
    const res = await axios.post(url, userCredential);
    console.log("res: ", res);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.result });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const logoutCall = async (token, dispatch) => {
  dispatch({ type: "LOGOUT_START" });
  try {
    // console.log("BASEURLLLL", process.env.REACT_APP_BASE_URL);
    // const baseURL = process.env.REACT_APP_BASE_URL;
    // console.log("URLLLL", baseURL);
    // const params = new URLSearchParams({
    //   token: token
    // }).toString();
    // const url =
    //   `${baseURL}/auth/logout?` +
    //   params;
    // const res = await axios.post(url);
    // console.log('res: ', res);
    dispatch({ type: "LOGOUT_SUCCESS", payload: null });
  } catch (err) {
    dispatch({ type: "LOGOUT_FAILURE", payload: err });
  }
};
