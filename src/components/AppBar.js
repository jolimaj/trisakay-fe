import React from "react";
import { TouchableOpacity } from "react-native";
import { AppBar } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const App_Bar = (props) => {
  return (
    <AppBar
      title="Back"
      titleStyle={{ color: "#132875", fontSize: 18 }}
      style={{ backgroundColor: "#FFFFFF", width: "100%" }}
      leading={() => (
        <TouchableOpacity title="" onPress={props.arrowBack}>
          <Icon
            name="arrow-left"
            size={30}
            style={{ color: "#132875", marginLeft: 10 }}
          />
        </TouchableOpacity>
      )}
    />
  );
};
module.exports = App_Bar;
