import { io } from "socket.io-client/dist/socket.io";
import env from "../utils/env";
import Store from "../Redux/Config";
const state = Store.getState();
// console.log(state.UserData._id);
let socket = io(`${env.DEV_SERVER_URL}`, {
  transports: ["websocket"],
  query: `mobileId=61b7336a571c140016f8577f`,
});

export default socket;
