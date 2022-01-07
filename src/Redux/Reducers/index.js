import { combineReducers } from "redux";
import LoginValidator from "./LoginReducer";
import fetchContactList from "./FetchUsersReducer";
import { Tokens, UserData } from "./tokens";
const rootReducer = combineReducers({
  LoginValidator,
  fetchContactList,
  Tokens,
  UserData,
});

export default rootReducer;
