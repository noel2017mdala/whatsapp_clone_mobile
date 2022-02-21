import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import tw from "tailwind-react-native-classnames";

const AppLoader = () => {
  return (
    <View
      style={[
        tw`mx-auto`,
        {
          width: "30%",
          height: "20%",
        },
      ]}
    >
      <LottieView
        source={require("../Loader/lf30_editor_rngrrh8q.json")}
        autoPlay
        loop
      />
    </View>
  );
};

export default AppLoader;
