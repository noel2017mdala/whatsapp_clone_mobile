import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import SearchICon from "react-native-vector-icons/EvilIcons";
import Loader from "./Loader";
import TabsContainer from "./TabsContainer";
const Tab = createMaterialTopTabNavigator();

const Landing = () => {
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    stopLoad();
  }, []);

  const stopLoad = () => {
    setTimeout(() => setAppLoaded(true), 4000);
  };

  if (!appLoaded) return <Loader />;

  return (
    <SafeAreaView style={[tw`bg-white h-full`]}>
      <View style={[tw`pb-2`, styles.header]}>
        <View style={[tw`pt-6`, styles.iconsHeader]}>
          <Text style={[tw`text-white  m-4 text-2xl font-bold tracking-wider`]}>
            Whatsapp
          </Text>

          <View style={[tw`mt-4 mr-4`, styles.icons]}>
            <SearchICon
              name="search"
              size={28}
              color="white"
              style={[tw`mr-4`]}
            />
            <Icon name="options-vertical" size={18} color="white" />
          </View>
        </View>
      </View>
      <TabsContainer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  header: {
    backgroundColor: "#128C7E",
  },

  iconsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  icons: {
    flexDirection: "row",
  },
});

export default Landing;
