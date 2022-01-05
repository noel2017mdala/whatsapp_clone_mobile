import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import tw from "tailwind-react-native-classnames";

const Loader = () => {
  return (
    <SafeAreaView style={[tw`bg-white h-full`, styles.container]}>
      <View style={[tw`m-auto`]}>
        <Image
          style={{
            width: 90,
            height: 90,
            resizeMode: "contain",
          }}
          source={require("../Images/whatsapp2.png")}
        />
      </View>

      <View style={[tw` `]}>
        <Text style={[tw`text-gray-500 text-xl text-center`]}>from</Text>
      </View>
      <View style={[tw`mx-auto mb-8  p-4`]}>
        <Text style={[tw`p-1 mx-2`]}>
          <Image
            style={[
              tw``,
              {
                width: 30,
                height: 30,
                resizeMode: "contain",
              },
            ]}
            source={require("../Images/metaIcon2.png")}
          />
          <Text style={[tw`text-xl text-green-400 mx-2 font-bold `]}>Meta</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default Loader;
