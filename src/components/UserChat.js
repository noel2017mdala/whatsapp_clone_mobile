import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "react-native-vector-icons/Ionicons";
import Option from "react-native-vector-icons/SimpleLineIcons";
import env from "../utils/env";
import Smiley from "react-native-vector-icons/Feather";
import Attachment from "react-native-vector-icons/Ionicons";
import Camera from "react-native-vector-icons/SimpleLineIcons";
import Mic from "react-native-vector-icons/Feather";
import Keyboard from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import socket from "../Socket";
import socketHelper from "../utils/socketHelper";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
} from "react-native";

import tw from "tailwind-react-native-classnames";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import formatTime from "../utils/DateFormater";
import { getAllMessages } from "../Redux/Actions/MessagesAction";
import EmojiSelector from "react-native-emoji-selector";
import EmojiData from "./EmojiData";

const UserChat = ({ navigation, route }) => {
  const { name, profileImage, userActivity } = route.params.chartData;
  const [lastSeen, setLastSeen] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [show, setShow] = useState(false);
  const [emojiState, setEmojiState] = useState(false);

  const dispatch = useDispatch();
  const select = useSelector((e) => {
    return e;
  });
  useEffect(() => {
    dispatch(
      getAllMessages(select.UserData, route.params.chartData._id, select.Tokens)
    );
    setTimeout(() => {
      returnLastSeen();
    }, 1000);
  }, []);

  const returnLastSeen = () => {
    let data = userActivity.map((e) => {
      return e.socketId === null
        ? setLastSeen(`Last seen at ${formatTime(e.lastSeenTime)}`)
        : setLastSeen("online");
    });

    return data;
  };

  const validate = (input) => {
    if (/^\s/.test(input) && input !== undefined) {
      input = "";
    }
  };

  // console.log(select.lastMessage);

  return (
    <SafeAreaView style={[tw``]}>
      <View
        style={[
          tw`flex flex-col`,
          {
            width: "100%",
            height: "100%",
          },
        ]}
      >
        <View style={[tw`pb-2`, styles.header]}>
          <View style={[tw`pt-10 flex flex-row justify-between`]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <View style={[tw`pl-3 flex flex-row relative`]}>
                <View style={[tw`absolute ml-2 top-1`]}>
                  <BackIcon
                    name="arrow-back-outline"
                    size={25}
                    color="white"
                    style={[tw`mr-1`]}
                  />
                </View>
                <View style={[tw`ml-6`]}>
                  <Image
                    source={{
                      uri: `${env.DEV_SERVER_URL}api/v1/users/getImage/${profileImage}`,
                    }}
                    style={[tw` rounded-full w-10 h-10`]}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View style={[tw`ml-1  w-2/5`]}>
              <TouchableOpacity style={[tw``, {}]}>
                <Text style={[tw`text-2xl text-white font-bold`]}>{name}</Text>

                <Text style={[tw`text-sm text-white`]}>{lastSeen}</Text>
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row  justify-end`}>
              <TouchableOpacity>
                <BackIcon
                  name="ios-videocam"
                  size={23}
                  color="white"
                  style={[tw`mr-6`]}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <BackIcon
                  name="call"
                  size={23}
                  color="white"
                  style={[tw`mr-4`]}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Option
                  name="options-vertical"
                  size={19}
                  color="white"
                  style={[tw`mr-4`]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ImageBackground
          source={require("../Images/bg-chat-dark.png")}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {/* <View style={[tw`bg-red-400 `]}>
            <Text>Hello World</Text>
          </View> */}
          {/* {!select.lastMessage ? null : !select.lastMessage
              .data ? null : !select.lastMessage.data.message ? null : (
            <FlatList
              keyExtractor={(item) => {
                return item._id;
              }}
              data={select.lastMessage.data.message}
              renderItem={({ item }) => (
                <View>
                  <Text>{item.messagesBody}</Text>
                </View>
              )}
            />
          )} */}
          <View
            style={
              (tw``,
              {
                height: "77%",
              })
            }
          >
            <ScrollView style={tw``}>
              <View style={[tw`flex flex-col items-center justify-center`]}>
                {/* <Text
    style={[
      tw`p-2 rounded mt-2 font-medium`,
      {
        backgroundColor: "#ade0f7",
      },
    ]}
  >
    TODAY
  </Text> */}
                <Text
                  style={[
                    tw`p-2 rounded mt-4 font-medium`,
                    {
                      backgroundColor: "#ade0f7",
                    },
                  ]}
                >
                  20/12/2021
                </Text>
              </View>

              <View
                style={[
                  tw`flex p-1 mt-3 rounded flex-row relative w-4/5 mx-auto `,
                  {
                    backgroundColor: "#fdf4c5",
                  },
                ]}
              >
                <Text style={[tw`text-black relative text-center font-medium`]}>
                  <Attachment name="lock-closed-sharp" size={12} />
                  Messages are end-to-end encrypted. No one outside of this
                  chat, not even WhatsApp, can read or listen to them.
                  {
                    <Text style={[tw`text-green-600 font-medium underline`]}>
                      Click to learn more.
                    </Text>
                  }
                </Text>
              </View>
              <View style={[tw`flex mt-3`]}>
                {!select.lastMessage
                  ? null
                  : !select.lastMessage.data
                  ? null
                  : !select.lastMessage.data.message
                  ? null
                  : select.lastMessage.data.message.map((item, index) => (
                      <View key={index}>
                        <View
                          style={[
                            tw`mt-2  flex flex-col relative items-start  ${
                              item.from !== select.UserData._id
                                ? `items-start ml-3`
                                : `items-end mr-6`
                            }`,
                            ,
                          ]}
                        >
                          <View
                            style={[
                              tw`bg-red-300 rounded pt-1 pr-2 pb-2 pl-2.5 leading-6  ${
                                item.from !== select.UserData._id
                                  ? `bg-white`
                                  : ``
                              }`,
                              item.from !== select.UserData._id
                                ? {
                                    backgroundColor: "#FFFFFF",
                                  }
                                : {
                                    backgroundColor: "#dbf8c6",
                                  },
                              {
                                maxWidth: "75%",
                                minWidth: "30%",
                              },
                            ]}
                          >
                            <View style={[tw`relative`]}>
                              <Text style={[tw`text-base leading-6`]}>
                                {item.messagesBody}
                              </Text>

                              <View style={[tw`flex items-end `]}>
                                <Text
                                  style={tw`text-black text-xs italic font-bold`}
                                >
                                  {formatTime(item.timeSent)}
                                  {item.from !== select.UserData._id ? null : (
                                    <Icon
                                      name={
                                        item.messageStatus === "sent"
                                          ? "checkmark"
                                          : "checkmark-done"
                                      }
                                      size={20}
                                      color={
                                        item.messageStatus === "read"
                                          ? "#7EC8E3"
                                          : "#C5C5C5"
                                      }
                                    />
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    ))}
              </View>
            </ScrollView>
          </View>
        </ImageBackground>

        <View style={[tw` mt-auto`]}>
          <View style={[tw`flex flex-row`]}>
            <View
              style={[
                tw`flex flex-row bg-white rounded-3xl ml-2 mr-1 mb-2 w-4/5`,
                {
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setEmojiState(!emojiState);
                }}
              >
                {emojiState ? (
                  <Keyboard
                    name="keyboard-o"
                    size={22}
                    color={"#525252"}
                    style={[tw`p-2`]}
                  />
                ) : (
                  <Smiley
                    name="smile"
                    size={22}
                    color={"#525252"}
                    style={[tw`p-2`]}
                  />
                )}
              </TouchableOpacity>

              <TextInput
                style={[
                  tw`bg-white w-3/4 rounded p-3 text-gray-600`,
                  {
                    flex: 1,
                    width: "100%",
                    height: "100%",
                  },
                ]}
                placeholder="Message"
                multiline={true}
                value={messageBody}
                onChangeText={(e) => {
                  emojiState ? setEmojiState(!emojiState) : null;
                  // validate(e)
                  setMessageBody(e);
                }}
                onTouchStart={() => {
                  emojiState ? setEmojiState(!emojiState) : null;
                }}
              />

              <TouchableOpacity>
                <Attachment name="attach" size={25} color={"#525252"} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Camera
                  name="camera"
                  size={22}
                  color={"#525252"}
                  style={[tw`ml-3 mr-3`]}
                />
              </TouchableOpacity>
              {/* <Mic name="mic" size={22} /> */}
            </View>

            <TouchableOpacity>
              <View
                style={[
                  tw`mr-2 mb-2 p-3 rounded-full flex items-center justify-center`,
                  {
                    backgroundColor: "#128C7E",
                  },
                ]}
              >
                {/* <Mic
                  name={messageBody.length > 0 ? "send" : "mic"}
                  size={22}
                  color={"white"}
                /> */}
                {messageBody.length > 0 ? (
                  <Mic
                    name="send"
                    size={22}
                    color={"white"}
                    onPress={() => {
                      let userData = select.UserData;
                      let userId = route.params.chartData._id;
                      let messageContent = {
                        from: userData._id,
                        to: userId,
                        messagesBody: messageBody,
                      };
                      socket.emit("message-sent", messageContent, {
                        userData,
                        userId,
                      });

                      setMessageBody("");
                    }}
                  />
                ) : (
                  <Mic name="mic" size={22} color={"white"} />
                )}
              </View>
            </TouchableOpacity>
          </View>
          {emojiState ? (
            <View style={[tw`bg-white  pt-52 ml-2 mr-2 rounded `]}>
              <View>
                <Text>Emojis Are coming soon 😊 </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
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

  input: {
    width: 120,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
  },
});
export default UserChat;
