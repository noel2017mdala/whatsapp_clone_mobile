import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={["#27cb84", "#1fb889", "#19aa8b"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },

  container: {
    flex: 1,
  },
});
export default GradientContainer;
