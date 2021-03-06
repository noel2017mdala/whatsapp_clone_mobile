import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import tw from "tailwind-react-native-classnames";

const CreateAccount = ({ navigation }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              justifyContent: "flex-end",
            }}
          >
            <View style={[tw`pb-16`]}>
              <View style={[tw`mt-10 ml-12`]}>
                <Text
                  style={[
                    tw`text-4xl mt-6 tracking-wider text-green-500 font-bold`,
                  ]}
                >
                  Hi!
                </Text>
                <Text style={[tw`text-2xl mt-2 text-green-500`]}>
                  Create a new account
                </Text>
              </View>
            </View>

            <View style={[tw``]}>
              <TextInput
                style={[
                  tw`mx-auto w-72 rounded max-w-lg p-3`,
                  {
                    ...styles.inputEmail,
                    fontSize: 15,
                  },
                ]}
                placeholder="User Name"
                keyboardType="default"
                // onChangeText={(value) => {
                //   setEmail(value);
                // }}
                // value={email}
              />

              <TextInput
                style={[
                  tw`mt-8 mx-auto w-72 rounded max-w-lg p-3 mb-4`,
                  {
                    ...styles.inputPassword,
                    fontSize: 15,
                  },
                ]}
                placeholder="Email"
                keyboardType="email-address"
                // onChangeText={(value) => {
                //   setPassword(value);
                // }}
                // value={password}
              />

              <TextInput
                style={[
                  tw`mt-6 mx-auto w-72 rounded max-w-lg p-3 mb-6`,
                  {
                    ...styles.inputPassword,
                    fontSize: 15,
                  },
                ]}
                placeholder="Phone Number"
                keyboardType="numeric"
                // onChangeText={(value) => {
                //   setPassword(value);
                // }}
                // value={password}
              />

              <TextInput
                style={[
                  tw`mt-6 mx-auto w-72 rounded max-w-lg p-3 mb-6`,
                  {
                    ...styles.inputPassword,
                    fontSize: 15,
                  },
                ]}
                placeholder="Password"
                secureTextEntry
                // onChangeText={(value) => {
                //   setPassword(value);
                // }}
                // value={password}
              />
            </View>

            <View>
              <TouchableOpacity
                style={[
                  tw`w-44 p-3 rounded mx-auto`,
                  {
                    backgroundColor: "#19aa8b",
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => {}}
              >
                <Text
                  style={[
                    tw`text-center text-xl font-bold`,
                    {
                      color: "#FFFFFF",
                    },
                  ]}
                >
                  Create Account
                </Text>
              </TouchableOpacity>

              <Text
                style={[tw`text-center mt-4 text-lg text-blue-600`]}
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                Login
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputEmail: {
    backgroundColor: "#FFFFFF",
    // width: 270,
    // marginTop: 20,
    // borderRadius: 15,
    // padding: 10,
    // borderColor: "#555",
    // paddingRight: 5,
  },

  inputPassword: {
    backgroundColor: "#FFFFFF",
    // width: 270,
    // marginTop: 50,
    // borderRadius: 15,
    // padding: 10,
    // borderColor: "#555",
    // paddingRight: 5,
  },
});

export default CreateAccount;
