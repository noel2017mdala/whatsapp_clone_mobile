import socket from "../Socket";
import Store from "../Redux/Config";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/FetchUser";

const state = Store.getState();

socket.on("demo", (id, userDetails) => {
  store.dispatch(
    getAllMessages(
      userDetails.userSessionData,
      userDetails.userId,
      state.Tokens
    )
  );
  store.dispatch(fetchContactList(userDetails.userSessionData, state.Tokens));
});
