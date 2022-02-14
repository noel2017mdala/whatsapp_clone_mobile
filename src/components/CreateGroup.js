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
  CheckBox,
} from "react-native";
//4461
import env from "../utils/env";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/AntDesign";
import { HeaderTab } from "../utils/NavigationHeader";

const CreateGroup = () => {
  let [checkedUsers, setCheckedUsers] = useState([]);
  const [refreshing, SetRefresh] = useState(false);
  const dispatch = useDispatch();
  const select = useSelector((e) => {
    return e;
  });

  useEffect(() => {
    dispatch(FetchUserContactList(select.UserData, select.Tokens));
  }, []);

  const handleCheck = (params) => {
    console.log(params);
  };
  return (
    <>
      <HeaderTab name="Create Group" />
      <View
        style={[
          tw`relative `,
          {
            flex: 1,
          },
        ]}
      >
        {/* <Text>Hello Create Group</Text> */}
        {!select.ContactList ? null : !select.ContactList.data ? null : (
          <FlatList
            keyExtractor={(item) => item._id}
            data={select.ContactList.data}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                colors={["#128C7E"]}
                onRefresh={() => {
                  console.log("user is about to refresh");
                  return;
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
                <TouchableOpacity>
                  <View
                    style={[
                      tw`h-16 mb-2  mt-1 border-b-2 border-gray-200 flex flex-row`,
                      {
                        width: "100%",
                      },
                    ]}
                  >
                    <TouchableOpacity>
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
                    <View style={[tw``, {}]}>
                      <CheckBox
                        name={item}
                        checked={true}
                        onPress={handleCheck}
                        key={item._id}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />

          // <Text>Hello</Text>
        )}

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
          >
            <Icon name="arrowright" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CreateGroup;
