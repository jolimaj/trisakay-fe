import React, { useState, useEffect } from "react";
import { View } from "react-native";
import AppBar from "./AppBar";
import RegisterForm from "./Forms/RegisterForm";
import styles from "../Stylesheet";
const Register = (props) => {
  return (
    <View style={styles.textWrapper}>
      <AppBar backClick={props.arrowBack} />
      <RegisterForm />
    </View>
  );
};
export default Register;
