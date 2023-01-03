import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AppBar from "./AppBar";
import LoginForm from "./Forms/LoginForm";
import styles from "../Stylesheet";
const Login = (props) => {
  return (
    <View style={styles.textWrapper}>
      <AppBar backClick={props.arrowBack} />
      <LoginForm />
    </View>
  );
};
export default Login;
