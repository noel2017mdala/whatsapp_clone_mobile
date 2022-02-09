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

const CreateGroup = () => {
  return (
    <>
      <HeaderTab name="Create Group" />
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
        <Text>Hello Create Group</Text>
      </View>
    </>
  );
};

export default CreateGroup;
