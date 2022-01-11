import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";

const ChatHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
      }}
    >
      <Text>Hello Chat Header</Text>
    </View>
  );
};

export default ChatHeader;
