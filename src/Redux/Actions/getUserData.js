export const userData = (data) => {
  return async (dispatch) => {
    dispatch({
      type: "FETCH_USER_DATA",
      payLoad: data,
    });
  };
};
