import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Loader from "./src/components/Loader";
import Login from "./src/components/Login";
import Landing from "./src/components/Landing";
import tw from "tailwind-react-native-classnames";
import rootReducer from "./src/Redux/Reducers";
import { Provider } from "react-redux";

import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userLoin = false;
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);
export default function App() {
  const [token, setTokenState] = useState(false);
  const [userData, setUserData] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);
  const [tokenData, setTokenData] = useState({});
  const [userStateData, setUserStateData] = useState({});

  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setTokenData(JSON.parse(value));
        setTokenState(true);
      } else {
        setTokenState(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem("UserData");
      if (value !== null) {
        setUserData(true);
        setUserStateData(JSON.parse(value));
      } else {
        setUserData(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopLoad = () => {
    setTimeout(() => setAppLoaded(true), 2000);
  };

  useEffect(() => {
    getUserToken();
    getUserData();
    stopLoad();
  }, []);

  if (!appLoaded) return <Loader />;
  return (
    <Provider store={store}>
      <SafeAreaView style={tw`bg-white h-full`}>
        {token && userData ? (
          <Landing token={tokenData} userData={userStateData} />
        ) : (
          <Login />
        )}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({});
