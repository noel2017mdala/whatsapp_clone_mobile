const initialState = {};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_DATA":
      return {
        ...state,
        data: action.payLoad,
      };

    default:
      return state;
  }
};

export default userDataReducer;
