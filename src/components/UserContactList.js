import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import GroupUsersIcon from "react-native-vector-icons/Ionicons";
import { HeaderTab } from "../utils/NavigationHeader";

const UserChatList = ({ navigation }) => {
  const NavigateBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <HeaderTab name={"Select Contacts"} navigateBack={NavigateBack} />
      {/* <View style={styles.container}>
        <Text>Hello User List</Text>
      </View> */}

      <View
        style={[
          tw`relative`,
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text>Hello User List</Text>

        <View
          style={[
            tw`absolute bottom-0 right-0 z-20`,
            {
              marginRight: "2%",
              marginBottom: "4%",
            },
          ]}
        >
          <TouchableOpacity
            style={[tw`mt-3`, {}]}
            onPress={() => {
              console.log("Create User");
            }}
          >
            <View
              style={[
                tw`w-14 h-14 rounded-full flex items-center justify-center p-3`,
                {
                  backgroundColor: "#128C7E",
                },
              ]}
            >
              <GroupUsersIcon name="person-add" size={25} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default UserChatList;
