import env from "../../utils/env";
export const GET_ALL_MESSAGE = "GET_ALL_MESSAGE";

export const getAllMessages = (myId, id, tokens) => {
  // console.log({
  //   myId,
  //   id,
  //   tokens,
  // });

  let userId = myId._id;
  if (id) {
    const url = `${env.DEV_SERVER_URL}api/v1/chat/getAllMessages/${userId}/${id}`;
    return async (dispatch) => {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "access-token": tokens,
          "user-id": userId,
        },
      });
      const resData = await response.json();
      let data = resData;

      dispatch({ type: GET_ALL_MESSAGE, payLoad: data });
    };
  }
};
