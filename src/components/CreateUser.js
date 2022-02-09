import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  ImageBackground,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { HeaderTab } from "../utils/NavigationHeader";

const CreateUser = () => {
  return (
    <>
      <HeaderTab name="Add Contact" />

      <View
        style={[
          tw``,
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Text>Hello Create User</Text>
      </View>
    </>
  );
};

export default CreateUser;
