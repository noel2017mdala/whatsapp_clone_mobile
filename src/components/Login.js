import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import GradientContainer from "./GradientContainer";
import SignIn from "./SignIn";
import CreateAccount from "./CreateAccount";

const Stack = createStackNavigator();

const NavigateSignIn = ({ navigation }) => {};

const Navigation = () => {
  const dispatch = useDispatch();
  const select = useSelector((e) => {
    return e;
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Login = ({ navigation }) => {
  return (
    <GradientContainer style={[tw`bg-white h-full`, styles.container]}>
      <View
        style={[
          tw`m-auto`,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Image
          style={{
            width: 90,
            height: 90,
            resizeMode: "contain",
          }}
          source={require("../Images/whatsapp2.png")}
        />

        <View style={[tw`mt-4`]}>
          <Text style={[tw`text-white text-2xl m-2 text-center`]}>
            Welcome to
          </Text>
          <Text
            style={[
              tw`text-white text-4xl text-center font-bold tracking-wider`,
            ]}
          >
            WhatsApp
          </Text>
        </View>
      </View>

      <View style={[tw`mb-16`]}>
        <Text style={[tw`text-white text-center text-sm`]}>
          Read our{" "}
          <Text
            onPress={() => {
              Linking.openURL("http://whatsapp-webb-clone.netlify.app/");
            }}
            style={{
              color: "#5C5CFF",
            }}
          >
            Privacy policy
          </Text>
          . Tap "Agree & Continue"
        </Text>
        <Text style={[tw`text-white text-center text-sm`]}>
          to accept the Terms of Service
        </Text>
      </View>

      <TouchableOpacity
        style={[tw`bg-white w-44 p-3 rounded mx-auto mb-8`, {}]}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        activeOpacity={0.8}
      >
        <Text
          style={[
            tw`text-center text-xl font-bold`,
            {
              color: "#19aa8b",
            },
          ]}
        >
          Agree & Continue
        </Text>
      </TouchableOpacity>
    </GradientContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
export default Navigation;
