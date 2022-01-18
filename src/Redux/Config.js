import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./Reducers";

const middleware = [thunk];

const Store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default Store;
