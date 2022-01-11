import { combineReducers } from "redux";
import LoginValidator from "./LoginReducer";
import fetchContactList from "./FetchUsersReducer";
import { Tokens, UserData } from "./tokens";
import NavHeader from "./NavHeader";
const rootReducer = combineReducers({
  LoginValidator,
  fetchContactList,
  Tokens,
  UserData,
  NavHeader,
});

export default rootReducer;
