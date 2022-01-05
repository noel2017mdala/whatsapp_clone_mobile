import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Login from "./src/components/Login";
import Landing from "./src/components/Landing";
import tw from "tailwind-react-native-classnames";

const userLoin = false;
export default function App() {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      {userLoin ? <Landing /> : <Login />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
