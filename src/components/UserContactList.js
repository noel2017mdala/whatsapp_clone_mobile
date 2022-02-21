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
import env from "../utils/env";
import Modal from "react-native-modal";
import tw from "tailwind-react-native-classnames";
import GroupUsersIcon from "react-native-vector-icons/Ionicons";
import { HeaderTab } from "../utils/NavigationHeader";
import { FetchUserContactList } from "../Redux/Actions/FetchUser";
import Icon from "react-native-vector-icons/Ionicons";
import AppLoader from "../utils/Loader";

const UserChatList = ({ navigation }) => {
  const [refreshing, SetRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const select = useSelector((e) => {
    return e;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchUserContactList(select.UserData, select.Tokens));
  }, []);

  const NavigateBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <HeaderTab name="Select Contacts" navigateBack={NavigateBack} />
      {/* <View style={styles.container}>
        <Text>Hello User List</Text>
      </View> */}

      <View
        style={[
          tw`relative`,
          {
            flex: 1,
          },
        ]}
      >
        <View
          style={[
            tw``,
            {
              width: "100%",
              height: "100%",
            },
          ]}
        >
          <View>
            <Modal
              isVisible={modalVisible}
              backdropOpacity={0.5}
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
                    tw`bg-white   mx-auto my-20 flex flex-col relative`,
                    {
                      width: "80%",
                      height: "50%",
                    },
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
                      {modalData ? modalData.name : null}
                    </Text>
                  </View>
                  <ImageBackground
                    source={{
                      uri: `${env.DEV_SERVER_URL}api/v1/users/getImage/${
                        modalData ? modalData.profileImage : ""
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
                    <View
                      style={[tw`pt-5 flex flex-row justify-around mb-3`, {}]}
                    >
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

          {!select.ContactList ? (
            <AppLoader />
          ) : !select.ContactList.data ? (
            <AppLoader />
          ) : (
            <FlatList
              keyExtractor={(item) => item._id}
              data={select.ContactList.data}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  colors={["#128C7E"]}
                  onRefresh={() => {
                    SetRefresh(true);
                    dispatch(
                      FetchUserContactList(select.UserData, select.Tokens)
                    );
                    setTimeout(() => {
                      SetRefresh(false);
                    }, 4000);
                  }}
                />
              }
              renderItem={({ item }) => (
                <View style={[tw`ml-2 mt-2`]}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate("ChartConversation", {
                        userData: select.UserData,
                        chartData: item,
                      });
                    }}
                  >
                    <View
                      style={[
                        tw`h-16 mb-2  mt-1 border-b-2 border-gray-200 flex flex-row`,
                        {
                          width: "100%",
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setModalData(item);
                          setModalVisible(true);
                        }}
                      >
                        <View
                          style={[
                            tw``,
                            {
                              paddingLeft: "4%",
                            },
                          ]}
                        >
                          <Image
                            source={{
                              uri: `${env.DEV_SERVER_URL}api/v1/users/getImage/${item.profileImage}`,
                            }}
                            style={[tw` rounded-full w-14 h-14`]}
                          />
                        </View>
                      </TouchableOpacity>

                      <View
                        style={[
                          tw`flex `,
                          {
                            marginLeft: "2%",
                          },
                        ]}
                      >
                        <View style={[tw``, {}]}>
                          <Text style={[tw`font-bold text-lg`, {}]}>
                            {item.name}
                          </Text>
                        </View>

                        <View>
                          <View>
                            <Text
                              style={[
                                tw`overflow-hidden italic`,
                                {
                                  width: 240,
                                },
                              ]}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {item.userAbout}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />

            // <Text>Hello</Text>
          )}
        </View>
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
              navigation.navigate("CreateUser");
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
