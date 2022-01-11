export const FETCH_USER_CONTACT_LIST = "FETCH_USER_CONTACT_LIST";
export const fetchContactList = (userId, tokens) => {
  let id = userId._id;

  const url = `https://node-whatsapp-backend.herokuapp.com/api/v1/users/getUser/${id}`;
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
