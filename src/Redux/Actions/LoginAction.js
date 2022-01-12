import env from "../../utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export const CREATE_USER = "CREATE_USER";
export const LOGIN = "LOGIN";
export const ASSIGN_TOKENS = "ASSIGN_TOKENS";
export const GET_USER_DATA = "GET_USER_DATA";

// import  Axios  from "react-native-axios";

export const LogIn = (data, cb) => {
  let url = `${env.DEV_SERVER_URL}api/v1/users/login`;

  return async (dispatch) => {
    try {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cb(data);
          dispatch({ type: "LOGIN" });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const generateTokens = (data) => {
  const token = `${data.token.tokenHeader.header}.${data.token.tokenHeader.payload}.${data.token.signature}`;

  return async (dispatch) => {
    dispatch({ type: ASSIGN_TOKENS, payLoad: token });
  };
};

export const generateUserData = (data) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_DATA, payLoad: data.userData });
  };
};
