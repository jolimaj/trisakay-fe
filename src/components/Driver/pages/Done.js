import React, { useState } from "react";
import { Dialog } from "@rneui/themed";
import { View } from "react-native";
import { HStack, Divider, Text, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "../../../config/axios";

const DOneNotif = (props) => {
  const toggleClose = async () => {
    try {
      await axios.put(`/booking/done/${props.passenger.driverID}`, {
        passengerID: props.passenger.passengerID,
      });
      props.setDone(false);
      props.setOrder(null);
      props.setDisFind(false);
      props.setUserstatus(0);
      props.setDes(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Dialog isVisible={props.dones}>
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
              <Icon name="bell" size={30} color="red" />
              <Text
                variant="subtitle2"
                style={{
                  textAlign: "left",
                  color: "#363636",
                  fontStyle: "italic",
                }}
              >
                {"Naihatid na ang pasahero!"}
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
        <Dialog.Actions>
          <Dialog.Button
            title="Close"
            onPress={toggleClose}
            variant="text"
            titleStyle={{
              textAlign: "center",
              fontSize: 15,
              textTransform: "uppercase",
              color: "#8bd8bd",
              fontWeight: "bold",
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default DOneNotif;
