import { combineReducers } from "redux";
import LoginValidator from "./LoginReducer";
import fetchContactList from "./FetchUsersReducer";
import { Tokens, UserData } from "./tokens";
import NavHeader from "./NavHeader";
import userDataReducer from "./UserData";
import lastMessage from "./MessagesReducer";
import ContactList from "./FetchContactList";
import { UserGroupsData } from "./GetUserGroups";
const rootReducer = combineReducers({
  LoginValidator,
  fetchContactList,
  Tokens,
  UserData,
  NavHeader,
  lastMessage,
  userDataReducer,
  ContactList,
  UserGroupsData,
});

export default rootReducer;
