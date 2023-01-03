import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { AppBar, Text } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../Stylesheet";
const NavBar = (props) => {
  return (
    <AppBar
      style={styles.bg}
      leading={() => (
        <TouchableOpacity title="" onPress={props.openDashboard}>
          <Icon
            name={props.value ? "close" : "menu"}
            size={50}
            style={{ color: "#ffff", marginLeft: 10 }}
          />
        </TouchableOpacity>
      )}
    />
  );
};
export default NavBar;
