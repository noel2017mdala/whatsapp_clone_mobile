import env from "../../utils/env";
export const USER_GROUPS = "USER_GROUPS";
export const GetUserGroups = (userId, tokens) => {
  let id = userId._id;
  if (id) {
    let url = `${env.DEV_SERVER_URL}api/v1/group/userGroups/${id}`;

    return async (dispatch) => {
      //   axios
      //     .get(url, {
      //       headers: {
      //         "access-token": generateToken(),
      //         "user-id": getUserDAta()._id,
      //       },
      //     })
      //     .then((res) => {
      //       if (res.data) {
      //         dispatch({ type: USER_GROUPS, payLoad: res.data });
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });

      const response = await fetch(url, {
        headers: {
          "access-token": tokens,
          "user-id": id,
        },
      });

      const resData = await response.json();
      let data = resData;

      dispatch({ type: USER_GROUPS, payLoad: data });
    };
  }
};
