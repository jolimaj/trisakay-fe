import React, { useState } from "react";
import { Dialog, Avatar } from "@rneui/themed";
import { View } from "react-native";
import { HStack, Text, Divider, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const DriverModal = (props) => {
  const driverData = props.driverDetail;

  const toggleYes = () => {};
  const toggleNo = () => {};
  return (
    <View>
      <Dialog isVisible={props.visibles}>
        <Dialog.Title
          title="Gusto mo na maglogout?"
          titleStyle={{
            textAlign: "center",
            fontSize: 15,
            textTransform: "uppercase",
            color: "#132875",
          }}
        />

        <Divider
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            height: 5,
            backgroundColor: "#132875",
          }}
        />
        <Dialog.Actions>
          <Dialog.Button title="HINDI" onPress={toggleNo} />
          <Dialog.Button title="OO" onPress={toggleYes} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default ConfirmModal;
