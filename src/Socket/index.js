import { io } from "socket.io-client/dist/socket.io";
import env from "../utils/env";
import Store from "../Redux/Config";
const state = Store.getState();
// console.log(state.UserData._id);
let socket = io(`${env.DEV_SERVER_URL}`, {
  transports: ["websocket"],
  query: `mobileId=${state.UserData._id}`,
});

export default socket;
