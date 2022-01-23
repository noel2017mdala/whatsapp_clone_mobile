import socket from "../Socket";
import Store from "../Redux/Config";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import { fetchContactList } from "../Redux/Actions/FetchUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

const state = Store.getState();

const getUserData = async (cb) => {
  try {
    let demo = await AsyncStorage.getItem("UserData");
    let token = await AsyncStorage.getItem("token");
    if (demo !== null) {
      // return JSON.parse(demo);
      let userData = JSON.parse(demo);
      token = JSON.parse(token);

      return {
        userData,
        token,
      };
    }
  } catch (e) {
    // remove error
  }
};

getUserData()
  .then((res) => {
    // console.log(res);
    const token = `${res.token.tokenHeader.header}.${res.token.tokenHeader.payload}.${res.token.signature}`;

    socket.on("demo", (id, userDetails) => {
      Store.dispatch(
        getAllMessages(userDetails.userData, userDetails.userId, token)
      );
      Store.dispatch(fetchContactList(userDetails.userData, token));
    });

    socket.on("demoBroadcast", (id, userDetails) => {
      Store.dispatch(
        getAllMessages(userDetails.userData, userDetails.userId, token)
      );

      Store.dispatch(fetchContactList(userDetails.userData, token));
    });
  })
  .catch((err) => {
    console.log(`we have an error ${err}`);
  });
