import React, { useEffect } from "react";
import { View, LogBox } from "react-native";
import Styles from "./src/Stylesheet";
import Landing from "./src/components/index";

export default function App() {
  useEffect(() => LogBox.ignoreAllLogs(), []);
  return (
    <View style={Styles.container}>
      <Landing />
    </View>
  );
}
