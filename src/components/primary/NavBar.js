import React from "react";
import { TouchableOpacity } from "react-native";
import { AppBar } from "@react-native-material/core";
import { Icon } from "@rneui/themed";
import styles from "../Stylesheet";
const App_Bar = (props) => {
  return (
    <AppBar
      leading={() => (
        <TouchableOpacity title="" onPress={props.backClick}>
          <Icon
            reverse
            name="arrow-back"
            type="ionicon"
            color={styles.txtBlue}
          />
        </TouchableOpacity>
      )}
    />
  );
};
module.exports = App_Bar;
