import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AppBar from "./AppBar";
import TermCondition from "./TermsCondition/TermCondition";
import styles from "../Stylesheet";
const Terms = (props) => {
  return (
    <View style={styles.textWrapper}>
      <AppBar backClick={props.arrowBack} />
      <TermCondition />
    </View>
  );
};
export default Terms;
