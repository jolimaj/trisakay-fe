import React from "react";
import { Image } from "react-native";
import styles from "../Stylesheet";

export default function Logo() {
  return <Image style={styles.logos} source={require("../../img/logo.png")} />;
}
