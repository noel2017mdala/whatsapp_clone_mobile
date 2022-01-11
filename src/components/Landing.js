import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Loader from "./Loader";
import TabsContainer from "./TabsContainer";

import { generateTokens, generateUserData } from "../Redux/Actions/LoginAction";
const Tab = createMaterialTopTabNavigator();

const Landing = (props) => {
  const [appLoaded, setAppLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(generateTokens(props));
    dispatch(generateUserData(props));
    stopLoad();
  }, []);

  const stopLoad = () => {
    setTimeout(() => setAppLoaded(true), 2000);
  };

  if (!appLoaded) return <Loader />;

  return (
    <SafeAreaView style={[tw`bg-white h-full`]}>
      <TabsContainer />
    </SafeAreaView>
  );
};

export default Landing;
