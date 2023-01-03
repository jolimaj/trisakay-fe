import React, { useState } from "react";
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
  Divider,
} from "@react-native-material/core";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "../../../config/axios";

const LogoutModal = (props) => {
  const toggleClose = () => {
    props.setLogout(true);
    props.setPages("User");
    props.navigation.navigate("Mga User");
  };
  async function logoutData() {
    await AsyncStorage.clear();
    await axios.put(`/logout/${props.value.id}`);
    props.setPages("HomeMap");
  }
  return (
    <>
      <Dialog
        visible={props.isLogout}
        style={{
          width: "200px",
          marginLeft: "40%",
          backgroundColor: "transparent",
        }}
      >
        <DialogHeader
          title="Logout Confirmation"
          headerStyle={{
            textAlign: "center",
            fontSize: 15,
            textTransform: "uppercase",
            color: "#132875",
          }}
        />
        <DialogContent>
          <Text
            variant="subtitle2"
            style={{
              textAlign: "left",
              color: "#363636",
              fontStyle: "italic",
            }}
          >
            Sigurado ka na ba na gusto mong mag logout?
          </Text>
          <Divider
            style={{
              marginTop: 20,
              marginHorizontal: 30,
              height: 5,
              backgroundColor: "#132875",
            }}
          />
        </DialogContent>
        <DialogActions backgroundColor="white">
          <Button
            title="OO"
            compact
            variant="text"
            onPress={logoutData}
            color="green"
          />
          <Button
            title="Hindi"
            compact
            variant="text"
            onPress={toggleClose}
            color="red"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
const AppProvider = (props) => (
  <Provider>
    <LogoutModal
      setLogout={props.setLogout}
      navigation={props.navigation}
      isLogout={props.isLogout}
      setPages={props.setPages}
      value={props.value}
    />
  </Provider>
);

export default AppProvider;
