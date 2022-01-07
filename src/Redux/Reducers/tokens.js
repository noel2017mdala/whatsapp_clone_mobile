import { ASSIGN_TOKENS } from "../Actions/LoginAction";
import { GET_USER_DATA } from "../Actions/LoginAction";
const initialState = "";
export const Tokens = (state = initialState, action) => {
  switch (action.type) {
    case ASSIGN_TOKENS:
      state = action.payLoad;
    default:
      return state;
  }
};

export const UserData = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      state = action.payLoad;
    default:
      return state;
  }
};
