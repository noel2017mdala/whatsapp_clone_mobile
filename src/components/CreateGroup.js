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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constant from "expo-constants";
import Checkbox from "expo-checkbox";
import env from "../utils/env";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/AntDesign";
import { HeaderTab } from "../utils/NavigationHeader";
import AppLoader from "../utils/Loader";

const CreateGroup = () => {
  let [checkedUsers, setCheckedUsers] = useState([]);
  const [refreshing, SetRefresh] = useState(false);
  const [createGroup, setCreateGroup] = useState(false);
  const [userImage, setUserImage] = useState(null);
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
        selectImage();
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

    console.log(res);

    if (!res.cancelled) {
      setUserImage(res.uri);
    }
  };
  return (
    <>
      {createGroup ? (
        <>
          <HeaderTab
            name="Create Group"
            navigateBack={() => {
              setCreateGroup(false);
            }}
          />
          <View
            style={[
              tw`items-center justify-center`,
              {
                flex: 1,
              },
            ]}
          >
            {/* <Text>Hello World</Text> */}
            <Button title="Select Image" onPress={checkPermission} />
            {userImage && (
              <Image
                source={{ url: userImage }}
                style={{
                  width: 200,
                  height: 200,
                }}
              />
            )}
          </View>
        </>
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
