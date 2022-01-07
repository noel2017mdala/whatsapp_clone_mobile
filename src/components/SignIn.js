import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../Redux/Actions/LoginAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import SvgImage from "../Images/svgimage";
import tw from "tailwind-react-native-classnames";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const regEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const [errorState, setErrorState] = useState({
    phoneNumberErr: false,
    passwordErr: false,
  });

  const dispatch = useDispatch();
  const select = useSelector((e) => {
    return e;
  });

  const validateUserInput = () => {
    if (email === "" && password === "") {
      setErrorState({
        ...errorState,
        phoneNumberErr: true,
        passwordErr: true,
      });
    } else if (email === "") {
      setErrorState({
        ...errorState,
        phoneNumberErr: true,
      });
    } else if (password === "") {
      setErrorState({
        ...errorState,
        passwordErr: true,
      });
    } else if (!regEx.test(email)) {
      setErrorState({
        ...errorState,
        phoneNumberErr: true,
      });
    } else {
      dispatch(
        LogIn(
          {
            email,
            password,
          },
          (res) => {
            if (res.status) {
              saveUserData(res.loginDetails, res.userDetails);
            }
          }
        )
      );
      setEmail("");
      setPassword("");
    }
  };

  const saveUserData = async (tokens) => {
    try {
      const userTokens = JSON.stringify({
        tokenHeader: tokens.headers,
        signature: tokens.signature,
      });

      const userDetails = JSON.stringify(tokens.userDetails);
      await AsyncStorage.setItem("token", userTokens);
      await AsyncStorage.setItem("UserData", userDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        console.log(value);
      } else {
        console.log(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getUserToken();
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              justifyContent: "flex-end",
            }}
          >
            <View style={[tw`pb-8`]}>
              <View style={[tw`mt-10 ml-12`]}>
                <Text
                  style={[
                    tw`text-4xl mt-6 tracking-wider text-green-500 font-bold`,
                  ]}
                >
                  Welcome!
                </Text>
                <Text style={[tw`text-2xl mt-2 text-green-500`]}>
                  Sign up to continue
                </Text>
              </View>
            </View>

            <SvgImage style={[tw``]} />

            <View style={[tw``]}>
              <TextInput
                style={[
                  tw`mx-auto w-72 rounded max-w-lg p-3 border border-white mb-2 ${
                    errorState.phoneNumberErr
                      ? `border-solid border-red-500 `
                      : null
                  }`,
                  {
                    ...styles.inputEmail,
                    fontSize: 15,
                  },
                ]}
                placeholder="Phone Number"
                keyboardType="numeric"
                onChangeText={(value) => {
                  setEmail(value);
                  setErrorState({
                    ...errorState,
                    phoneNumberErr: false,
                    passwordErr: false,
                  });
                }}
                value={email}
              />

              <Text style={[tw`text-red-500  pb-2 mx-10 font-bold`]}>
                {errorState.phoneNumberErr
                  ? "Please enter a valid Phone Number"
                  : null}
              </Text>

              <TextInput
                style={[
                  tw`mt-4 mx-auto w-72 rounded max-w-lg p-3 mb-3 border border-white  ${
                    errorState.passwordErr
                      ? `border-solid border-red-500 `
                      : null
                  }`,
                  {
                    ...styles.inputPassword,
                    fontSize: 15,
                  },
                ]}
                placeholder="Password"
                secureTextEntry
                onChangeText={(value) => {
                  setPassword(value);
                  setErrorState({
                    ...errorState,
                    phoneNumberErr: false,
                    passwordErr: false,
                  });
                }}
                value={password}
              />
              <Text style={[tw`text-red-500 pb-4 mx-10 font-bold`]}>
                {errorState.passwordErr ? "This field is required" : null}
              </Text>
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
                onPress={() => {
                  validateUserInput();
                }}
              >
                <Text
                  style={[
                    tw`text-center text-xl font-bold`,
                    {
                      color: "#FFFFFF",
                    },
                  ]}
                >
                  Login
                </Text>
              </TouchableOpacity>

              <Text
                style={[tw`text-center mt-4 text-lg text-blue-600`]}
                onPress={() => {
                  navigation.navigate("CreateAccount");
                }}
              >
                Create Account
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

export default SignIn;
