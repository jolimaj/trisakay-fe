import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { View } from "react-native";
import { HStack, Divider, Text, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
const MessageModal = (props) => {
  const toggleClose = () => {
    props.setVisible(false);
  };

  return (
    <View>
      <Dialog isVisible={props.visibles} onBackdropPress={toggleClose}>
        <Dialog.Title
          title="Mensahe"
          titleStyle={{
            textAlign: "center",
            fontSize: 15,
            textTransform: "uppercase",
            color: "red",
          }}
        />
        <View
          style={{
            position: "relative",
            alignItems: "center",
          }}
        >
          <View style={{ width: 200 }}>
            <HStack m={4} spacing={6}>
              <Icon name="flask-empty-off" size={30} color="red" />
              <Text
                variant="subtitle2"
                style={{
                  textAlign: "left",
                  color: "#363636",
                  fontStyle: "italic",
                }}
              >
                {"Kasulukuyang walang traysikel na available!"}
              </Text>
            </HStack>
          </View>
        </View>
        <Divider
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            height: 5,
            backgroundColor: "#132875",
          }}
        />
      </Dialog>
    </View>
  );
};

export default MessageModal;
