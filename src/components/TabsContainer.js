import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Camera from "./Camera";
import Chats from "./Chats";
import Status from "./Status";
import Calls from "./Calls";

const Tab = createMaterialTopTabNavigator();

const TabsContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Chats"
        // screenOptions={{
        //   style: {
        //     backgroundColor: "#128C7E",
        //   },
        // }}

        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#128C7E",
          },
        }}
        tabBarOptions={{
          activeTintColor: "#FFFFFF",
          inactiveTintColor: "#d4d2d2",
          labelStyle: {
            fontSize: 16,
          },
          indicatorStyle: { backgroundColor: "white" },
        }}
      >
        <Tab.Screen
          options={{
            title: (props) => <Icon name="camera" size={22} color="white" />,
          }}
          component={Camera}
          name="Camera"
        />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen component={Status} name="Status" />
        <Tab.Screen component={Calls} name="Calls" />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabsContainer;
