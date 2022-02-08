import axios from "axios";
import env from "../../utils/env";
export const FETCH_USER_CONTACT_LIST = "FETCH_USER_CONTACT_LIST";
export const USER_CONTACT_LIST = "USER_CONTACT_LIST";
export const fetchContactList = (userId, tokens) => {
  let id = userId._id;

  const url = `${env.DEV_SERVER_URL}api/v1/users/getUser/${id}`;
  return async (dispatch) => {
    const response = await fetch(url, {
      headers: {
        "access-token": tokens,
        "user-id": id,
      },
    });
    const resData = await response.json();
    let data = resData;

    dispatch({ type: FETCH_USER_CONTACT_LIST, payLoad: data });
  };
};

export const FetchUserContactList = (userId, tokens) => {
  let id = userId._id;
  return async (dispatch) => {
    const url = `${env.DEV_SERVER_URL}api/v1/users/getContactList/${id}`;
    // axios
    //   .get(url, {
    //     method: "get",
    //     responseType: "stream",
    //     headers: {
    //       "access-token": token,
    //       "user-id": id,
    //     },
    //   })
    //   .then((response) => {
    //     dispatch({ type: USER_CONTACT_LIST, payLoad: response.data });
    //     // console.log(response.data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    const response = await fetch(url, {
      headers: {
        "access-token": tokens,
        "user-id": id,
      },
    });

    const resData = await response.json();
    let data = resData;

    dispatch({ type: USER_CONTACT_LIST, payLoad: data });
  };
};
