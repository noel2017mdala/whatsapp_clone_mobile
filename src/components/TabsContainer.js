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
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import Camera from "./Camera";
import Chats from "./Chats";
import Status from "./Status";
import Calls from "./Calls";
import Groups from "./Groups";
import UserChat from "./UserChat";
import UserChatList from "./UserContactList";
import OptionsIcon from "react-native-vector-icons/SimpleLineIcons";
import SearchICon from "react-native-vector-icons/EvilIcons";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const HeaderTab = (props) => {
  const select = useSelector((e) => {
    return e;
  });

  return (
    <>
      <View style={[tw`pb-2`, styles.header]}>
        <View style={[tw`pt-6`, styles.iconsHeader]}>
          <Text style={[tw`text-white  m-4 text-2xl font-bold tracking-wider`]}>
            Whatsapp
          </Text>

          <View style={[tw`mt-4 mr-4`, styles.icons]}>
            <SearchICon
              name="search"
              size={28}
              color="white"
              style={[tw`mr-4`]}
            />
            <OptionsIcon name="options-vertical" size={18} color="white" />
          </View>
        </View>
      </View>
    </>
  );
};

const UserChartData = () => {
  return (
    <>
      <HeaderTab />
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
        {/* <Tab.Screen name="Group" component={Groups} /> */}
        <Tab.Screen name="Status" component={Status} />
        <Tab.Screen name="Calls" component={Calls} />
      </Tab.Navigator>
    </>
  );
};

const TabsContainer = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(ActivateHeader());
  // });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserChat">
        <Stack.Screen
          name="UserChat"
          component={UserChartData}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChartConversation"
          component={UserChat}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="UserContactList"
          component={UserChatList}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Groups"
          component={Groups}
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen
  name="CreateAccount"
  component={CreateAccount}
  options={{
    headerShown: false,
  }}
/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  header: {
    backgroundColor: "#128C7E",
  },

  iconsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icons: {
    flexDirection: "row",
  },
});

export default TabsContainer;
