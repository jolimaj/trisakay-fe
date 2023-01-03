import React from "react";
import { ListItem, Avatar } from "@react-native-material/core";
import { View } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Support = () => (
  <>
    <View style={{ margin: 10 }}>
      <ListItem
        leadingMode="avatar"
        leading={<Icon color="#132875" size={50} name="email" />}
        title="Email:"
        secondaryText="trisakay36@gmail.com"
      />
    </View>
    <View style={{ margin: 10 }}>
      <ListItem
        leadingMode="avatar"
        leading={<Icon color="#132875" size={50} name="phone" />}
        title="Customer Support Hotline"
        secondaryText="+639109923734
+639913355487
+639813182657"
      />
    </View>
  </>
);

export default Support;
