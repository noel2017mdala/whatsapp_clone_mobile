import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserContactList } from "../Redux/Actions/FetchUser";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  ImageBackground,
  Platform,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import uuid from "react-native-uuid";
import * as Permissions from "expo-permissions";
import Modal from "react-native-modal";
import Constant from "expo-constants";
import Checkbox from "expo-checkbox";
import env from "../utils/env";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/AntDesign";
import CameraIcon from "react-native-vector-icons/Ionicons";
import { HeaderTab } from "../utils/NavigationHeader";
import AppLoader from "../utils/Loader";

const CreateGroup = () => {
  let [checkedUsers, setCheckedUsers] = useState([]);
  const [refreshing, SetRefresh] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const select = useSelector((e) => {
    return e;
  });

  useEffect(() => {
    dispatch(FetchUserContactList(select.UserData, select.Tokens));
  }, []);

  const checkPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        await selectImage();
      } else {
        return false;
      }
    }
  };

  const selectImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.cancelled) {
      setUserImage(res.uri);
    }
  };

  const createUserGroup = () => {
    const formData = new FormData();

    formData.append("file", {
      uri: userImage,
      description,
      users: checkedUsers,
      created_by: select.UserData._id,
      Uid: uuid.v4(),
      type: "image/jpeg",
    });

    /*
     uri: userImage,
      file: userImage,
      description,
      users: checkedUsers,
      created_by: select.UserData._id,
      Uid: uuid.v4(),
    */
    let url = `${env.DEV_SERVER_URL}api/v1/group/createGroupMobile`;
    try {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  // console.log(select.Tokens);
  return (
    <>
      {/* group and camera modal */}

      <View style={[tw`relative`]}>
        <Modal
          isVisible={modalVisible}
          backdropOpacity={0.4}
          animationIn="slideInDown"
          animationOut="fadeOut"
          onBackButtonPress={() => {
            setModalVisible(false);
          }}
          onBackdropPress={() => {
            setModalVisible(false);
          }}
          backdropTransitionOutTiming={100}
        >
          <View
            style={[
              tw`absolute bottom-0`,
              {
                width: "100%",
                height: "50%",
              },
            ]}
          >
            <View
              style={[
                tw`bg-white`,
                {
                  width: "100%",
                  height: "50%",
                },
              ]}
            >
              <View>
                <Text style={[tw`text-lg p-3`]}>Group profile photo</Text>
              </View>

              <View style={[tw`flex flex-row m-4 `]}>
                <View>
                  <TouchableOpacity
                    style={[tw`border border-gray-200 p-3 rounded-full`]}
                  >
                    <CameraIcon name="camera" size={25} color="#128C7E" />
                  </TouchableOpacity>
                  <Text style={[tw`text-center mt-2`]}>Camera</Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={[tw`border border-gray-200 p-3 rounded-full mx-4`]}
                    onPress={() => {
                      setModalVisible(false);
                      checkPermission();
                    }}
                  >
                    <CameraIcon name="images" size={25} color="#128C7E" />
                  </TouchableOpacity>
                  <Text style={[tw`text-center mt-2`]}>Gallery</Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      {createGroup ? (
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <>
              <HeaderTab
                name="Create Group"
                navigateBack={() => {
                  setCreateGroup(false);
                }}
              />

              {/* <View>
            {userImage && (
              <View style={[tw`bg-red-300 flex items-center justify-center`]}>
                <Image
                  source={{
                    uri: userImage,
                  }}
                  style={[
                    tw``,
                    {
                      width: 100,
                      height: 90,
                      resizeMode: "contain",
                    },
                  ]}
                />
              </View>
            )}
          </View> */}

              <View
                style={[
                  tw``,
                  {
                    flex: 1,
                    backgroundColor: "#EDEDED",
                  },
                ]}
              >
                <View
                  style={[
                    tw`relative my-14`,
                    {
                      width: "100%",
                      height: "30%",
                    },
                  ]}
                >
                  <View style={[tw`m-auto relative`]}>
                    <View style={[tw`w-40 h-40 rounded-full`]}>
                      <Image
                        source={{
                          uri: userImage
                            ? userImage
                            : `${env.DEV_SERVER_URL}api/v1/users/getImage/defaultProfile.jpg`,
                        }}
                        style={[
                          tw`w-40 h-40 rounded-full`,
                          {
                            resizeMode: "cover",
                          },
                        ]}
                      />
                    </View>

                    <TouchableOpacity
                      style={[
                        tw`absolute top-0 right-2 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center`,
                        {
                          backgroundColor: "#128C7E",
                        },
                      ]}
                      onPress={() => {
                        setModalVisible(true);
                        // checkPermission
                      }}
                    >
                      <CameraIcon name="camera" size={25} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* <View
              style={[
                tw`items-center justify-center`,
                {
                  flex: 1,
                },
              ]}
            >
              <Button
                style={[tw``]}
                title="Select Image"
                onPress={checkPermission}
              />
            </View> */}

                <View style={[tw``]}>
                  <Text
                    style={[
                      tw`text-xl mb-2`,
                      {
                        marginLeft: "12%",
                      },
                    ]}
                  >
                    Group Name
                  </Text>

                  <TextInput
                    style={[
                      tw`p-3 border rounded mx-auto`,
                      {
                        width: "75%",
                      },
                    ]}
                    placeholder="Group Name"
                    value={description}
                    onChangeText={(text) => {
                      setDescription(text);
                    }}
                  />
                  <TouchableOpacity
                    style={[
                      tw`mt-12 mx-auto p-4 rounded`,
                      {
                        backgroundColor: "#128C7E",
                        width: "50%",
                      },
                    ]}
                    onPress={createUserGroup}
                  >
                    <Text style={[tw`text-white text-center text-xl`]}>
                      Create Group
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          </SafeAreaView>
        </KeyboardAvoidingView>
      ) : (
        <>
          <HeaderTab name="Add Participants" />
          <View
            style={[
              tw`relative `,
              {
                flex: 1,
              },
            ]}
          >
            {/* <Text>Hello Create Group</Text> */}
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
                    // onRefresh={() => {
                    //   SetRefresh(true);
                    //   dispatch(
                    //     FetchUserContactList(select.UserData, select.Tokens)
                    //   );
                    //   setTimeout(() => {
                    //     SetRefresh(false);
                    //   }, 4000);
                    // }}
                  />
                }
                renderItem={({ item }) => (
                  <View style={[tw`ml-2 mt-2`]}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        if (!checkedUsers.includes(item._id)) {
                          setCheckedUsers([...checkedUsers, item._id]);
                        } else {
                          setCheckedUsers([
                            ...checkedUsers.filter((value) => {
                              return value !== item._id;
                            }),
                          ]);
                        }
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
                        <View>
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
                        </View>

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
                                    width: 210,
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
                        <View style={[tw` m-auto`, {}]}>
                          <Checkbox
                            value={checkedUsers.includes(item._id)}
                            onValueChange={() => {
                              if (!checkedUsers.includes(item._id)) {
                                setCheckedUsers([...checkedUsers, item._id]);
                              } else {
                                setCheckedUsers([
                                  ...checkedUsers.filter((value) => {
                                    return value !== item._id;
                                  }),
                                ]);
                              }
                            }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />

              // <Text>Hello</Text>
            )}

            {checkedUsers.length > 0 ? (
              <View
                style={[
                  tw`absolute bottom-0 mb-8 flex items-center justify-center`,
                  {
                    width: "100%",
                  },
                ]}
              >
                {/* <View style={[tw`bg-green-400 w-14 h-14 rounded-full`]}>
            <Text>Hello World</Text>
          </View> */}
                <TouchableOpacity
                  style={[
                    tw`bg-green-400 w-14 h-14 rounded-full flex items-center justify-center`,
                    {
                      backgroundColor: "#128C7E",
                    },
                  ]}
                  onPress={() => {
                    setCreateGroup(true);
                  }}
                >
                  <Icon name="arrowright" size={25} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </>
      )}
    </>
  );
};

export default CreateGroup;
