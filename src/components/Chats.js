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
  ImageBackground,
} from "react-native";

import Modal from "react-native-modal";
import tw from "tailwind-react-native-classnames";
import { fetchContactList } from "../Redux/Actions/FetchUser";
import Icon from "react-native-vector-icons/Ionicons";
import formatTime from "../utils/DateFormater";
import env from "../utils/env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import socket from "../Socket";

const Chat = ({ navigation }) => {
  const [refreshing, SetRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    // removeValueToken();
    // removeValue();
    dispatch(fetchContactList(select.UserData, select.Tokens));
  }, []);
  const select = useSelector((e) => {
    return e;
  });

  // const removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem("UserData");
  //   } catch (e) {
  //     // remove error
  //   }

  //   console.log("Done.");
  // };

  // const removeValueToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem("token");
  //   } catch (e) {
  //     // remove error
  //   }

  //   console.log("Done.");
  // };

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
      {/* <View style={[tw`bg-red-400 w-2/4 shadow-sm absolute  z-10 `]}>
        <Text>Modal</Text>
      </View> */}

      <View>
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.4}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackButtonPress={() => {
            setModalVisible(false);
            setModalData({});
          }}
          onBackdropPress={() => {
            setModalVisible(false);
            setModalData({});
          }}
          backdropTransitionOutTiming={100}
        >
          <View style={{ flex: 1 }}>
            <View
              style={[
                tw`bg-white h-1/2  w-3/4  mx-auto my-20 flex flex-col relative`,
                {},
              ]}
            >
              <View
                style={[
                  tw`pb-3 absolute z-10  right-0  left-0`,
                  {
                    backgroundColor: "rgba(0, 0, 0, 0.3);",
                  },
                ]}
              >
                <Text style={[tw`text-white text-lg ml-2 mt-2`]}>
                  {modalData.userDetails ? modalData.userDetails.name : null}
                </Text>
              </View>
              <ImageBackground
                source={{
                  uri: `${env.DEV_SERVER_URL}api/v1/users/getImage/${
                    modalData.userDetails
                      ? modalData.userDetails.profileImage
                      : ""
                  }`,
                }}
                resizeMode="cover"
                style={[
                  tw``,
                  {
                    flex: 1,
                    justifyContent: "center",
                  },
                ]}
              />
              <View
                style={[
                  tw`mt-auto`,
                  {
                    backgroundColor: "#FFFFFF",
                  },
                ]}
              >
                <View style={[tw`pt-5 flex flex-row justify-around mb-3`, {}]}>
                  {/* <Text>icons</Text> */}
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("ChartConversation", {
                        userData: select.UserData,
                        chartData: modalData,
                      });
                    }}
                  >
                    <Icon
                      name="chatbox-ellipses-outline"
                      size={22}
                      color="#128C7E"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="call-sharp" size={22} color="#128C7E" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon name="videocam" size={22} color="#128C7E" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Icon
                      name="information-circle-outline"
                      size={22}
                      color="#128C7E"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

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
                  navigation.navigate("ChartConversation", {
                    userData: select.UserData,
                    chartData: item,
                  });
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
                      setModalData(item);
                      setModalVisible(true);
                    }}
                  >
                    <View style={[tw`pl-4`]}>
                      <Image
                        source={{
                          uri: `${env.DEV_SERVER_URL}api/v1/users/getImage/${item.userDetails.profileImage}`,
                        }}
                        style={[tw` rounded-full w-14 h-14`]}
                      />
                    </View>
                  </TouchableOpacity>

                  <View style={[tw`ml-4 flex`, {}]}>
                    <View>
                      <Text style={[tw`font-bold text-lg`]}>
                        {item.userDetails.name}
                      </Text>
                    </View>

                    <View style={[tw``, {}]}>
                      <View>
                        <Text
                          style={[
                            tw`overflow-hidden`,
                            {
                              width: "100%",
                            },
                          ]}
                          numberOfLines={1}
                        >
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
                          <Text
                            style={[tw`text-base overflow-hidden`]}
                            numberOfLines={1}
                          >
                            {" "}
                            {/* {item.userLastMessage.messagesBody} */}
                            {item.userLastMessage.messagesBody.length > 30
                              ? item.userLastMessage.messagesBody.substring(
                                  0,
                                  30
                                ) + "..."
                              : item.userLastMessage.messagesBody}
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
                    <Text style={[tw`text-green-700`]}>
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
