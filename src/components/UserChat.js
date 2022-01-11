import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "react-native-vector-icons/Ionicons";
import Option from "react-native-vector-icons/SimpleLineIcons";

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";

import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native-gesture-handler";
import formatTime from "../utils/DateFormater";

const UserChat = ({ navigation, route }) => {
  const { name, profileImage, userActivity } =
    route.params.chartData.userDetails;
  const [lastSeen, setLastSeen] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
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

  return (
    <SafeAreaView style={[tw``]}>
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
                    uri: `http://192.168.43.193:8000/api/v1/users/getImage/${profileImage}`,
                  }}
                  style={[tw` rounded-full w-10 h-10`]}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={[tw`ml-1  w-2/5`]}>
            <TouchableOpacity style={[tw``, {}]}>
              <Text style={[tw`text-lg text-white`]}>{name}</Text>

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
      <View style={[tw``, {}]}></View>

      <ImageBackground
        source={require("../Images/bg-chat-dark.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <View style={[tw``]}>
          <Text>Hello {name}</Text>
        </View>
      </ImageBackground>
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
});
export default UserChat;
