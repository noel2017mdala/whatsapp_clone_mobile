import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "react-native-vector-icons/Ionicons";
import Option from "react-native-vector-icons/SimpleLineIcons";
import env from "../utils/env";
import Smiley from "react-native-vector-icons/Feather";
import Attachment from "react-native-vector-icons/Ionicons";
import Camera from "react-native-vector-icons/SimpleLineIcons";
import Mic from "react-native-vector-icons/Feather";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import formatTime from "../utils/DateFormater";
import { getAllMessages } from "../Redux/Actions/MessagesAction";

const UserChat = ({ navigation, route }) => {
  const { name, profileImage, userActivity } =
    route.params.chartData.userDetails;
  const [lastSeen, setLastSeen] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const select = useSelector((e) => {
    return e;
  });
  useEffect(() => {
    dispatch(
      getAllMessages(
        select.UserData,
        route.params.chartData.userDetails._id,
        select.Tokens
      )
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

  console.log(select.lastMessage);
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
                  size={20}
                  color="white"
                  style={[tw`mr-6`]}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <BackIcon
                  name="call"
                  size={19}
                  color="white"
                  style={[tw`mr-4`]}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Option
                  name="options-vertical"
                  size={18}
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
              <TouchableOpacity>
                <Smiley
                  name="smile"
                  size={22}
                  color={"#525252"}
                  style={[tw`p-2`]}
                />
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
                  setMessageBody(e);
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
                  <Mic name="send" size={22} color={"white"} />
                ) : (
                  <Mic name="mic" size={22} color={"white"} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <EmojiBoard showBoard={show} onClick={onClick} /> */}
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
