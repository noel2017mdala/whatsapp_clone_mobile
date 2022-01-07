import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { fetchContactList } from "../Redux/Actions/FetchUser";
import Icon from "react-native-vector-icons/Ionicons";
import formatTime from "../utils/DateFormater";

const Chat = ({ navigation }) => {
  const [refreshing, SetRefresh] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContactList(select.UserData, select.Tokens));
  }, []);
  const select = useSelector((e) => {
    return e;
  });

  return (
    <View
      style={[
        tw``,
        {
          flex: 1,
          backgroundColor: "#f5f5f5",
        },
      ]}
    >
      {!select.fetchContactList ? null : !select.fetchContactList
          .data ? null : (
        <FlatList
          keyExtractor={(item) => item.userDetails._id}
          data={select.fetchContactList.data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={["#128C7E"]}
              onRefresh={() => {
                SetRefresh(true);
                dispatch(fetchContactList(select.UserData, select.Tokens));
                setTimeout(() => {
                  SetRefresh(false);
                }, 4000);
              }}
            />
          }
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  console.log("user wants to view chat");
                }}
              >
                <View
                  style={[
                    tw`h-16 mb-2  mt-1 border-b-2 border-gray-200 flex flex-row`,
                    {},
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      console.log("user wants to view the image");
                    }}
                  >
                    <View style={[tw`pl-4`]}>
                      <Image
                        source={{
                          uri: `http://192.168.43.193:8000/api/v1/users/getImage/${item.userDetails.profileImage}`,
                        }}
                        style={[tw` rounded-full w-14 h-14`]}
                      />
                    </View>
                  </TouchableOpacity>

                  <View style={[tw`ml-6 flex`, {}]}>
                    <View>
                      <Text style={[tw`font-bold text-lg`]}>
                        {item.userDetails.name}
                      </Text>
                    </View>

                    <View style={[tw``, {}]}>
                      <View>
                        <Text style={[tw``]}>
                          {item.userLastMessage.from === select.UserData._id ? (
                            <Icon
                              name={
                                item.userLastMessage.messageStatus === "sent"
                                  ? "checkmark"
                                  : "checkmark-done"
                              }
                              size={18}
                              color={
                                item.userLastMessage.messageStatus === "read"
                                  ? "#7EC8E3"
                                  : "#C5C5C5"
                              }
                            />
                          ) : null}
                          <Text style={[tw`text-base`]}>
                            {" "}
                            {item.userLastMessage.messagesBody}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      tw` pr-6`,
                      {
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "flex-end",
                      },
                    ]}
                  >
                    <Text style={[tw`text-green-600`]}>
                      {formatTime(item.userLastMessage.timeSent)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
          style={[tw`mt-4`]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;
