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
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { HeaderTab } from "../utils/NavigationHeader";

const CreateUser = () => {
  return (
    <>
      <HeaderTab name="Add Contact" />

      <View style={[tw``, {}]}>
        <View style={[tw`h-full w-full`]}>
          <View
            style={[
              tw`mx-auto mt-12`,
              {
                width: "90%",
                height: "70%",
              },
            ]}
          >
            <View
              style={[
                tw`flex items-center justify-center  mx-auto`,
                {
                  width: "80%",
                },
              ]}
            >
              <View
                style={[
                  tw`mt-12`,
                  {
                    width: "100%",
                    height: "100%",
                  },
                ]}
              >
                <View>
                  <Text style={[tw`text-xl`]}>Contact Name</Text>
                  <TextInput
                    style={[
                      tw`p-3 border rounded mt-4`,
                      {
                        width: "100%",
                      },
                    ]}
                    placeholder="Contact Name"
                  />
                </View>

                <View style={tw`mt-12`}>
                  <Text style={[tw`text-xl`]}>Contact Number</Text>
                  <TextInput
                    style={[
                      tw`p-3 border rounded mt-4`,
                      {
                        width: "100%",
                      },
                    ]}
                    placeholder="Contact Number"
                  />
                </View>

                <TouchableOpacity
                  style={[
                    tw`m-auto p-4 rounded`,
                    {
                      backgroundColor: "#128C7E",
                      width: "65%",
                    },
                  ]}
                >
                  <Text style={[tw`text-white text-center text-xl`]}>
                    Create Contact
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CreateUser;
