import React, { useState, useCallback } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import {
  Text,
  Avatar,
  TextInput,
  Flex,
  VStack,
  Button,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../Stylesheet";
import * as ImagePicker from "react-native-image-picker";
import axios from "../../../config/axios";
import mime from "mime";

export default function Profile(props) {
  const [address, setAddress] = useState(
    JSON.parse(props.userData.details).address
  );
  const [mobile, setMobile] = useState(props.userData.mobile);
  const [result, setResult] = useState("");
  const [selectedProfile, setselectedProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("address", address);
  formData.append("mobile", mobile);
  formData.append("profile", selectedProfile);
  formData.append("roleID", props.userData.roleID);

  const handleProfile = async () => {
    try {
      let files;
      await ImagePicker.launchImageLibrary(
        {
          mediaType: "photo",
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
          skipBackup: true,
          path: "images",
        },
        (response) => {
          files = response.assets[0];
        }
      );
      setselectedProfile({
        uri: files.uri,
        name: files.uri.split("/").pop(),
        type: mime.getType(files.uri),
      });
    } catch (err) {
      console.log(
        "🚀 ~ file: UpdateProfile.js ~ line 54 ~ handleProfile ~ err",
        err
      );
      setErrorMsg(err);
    }
  };
  const onHandleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `/user/${props.userData.id}`,
        selectedProfile === null ? { roleID: "3", mobile, address } : formData
      );
      setResult(res);
      props.setPages("list");
      props.reloads();
      props.setisUpdate(true);
      setLoading(false);
    } catch (error) {
      if (error) {
        console.log(
          "🚀 ~ file: UpdateProfile.js ~ line 68 ~ onHandleSave ~ error",
          error.response.data
        );
        if (mobile === "" || address === "" || selectedProfile === null) {
          setErrorMsg("Kompletohin lahat ng field!");
        } else {
          setErrorMsg(error.response.data.error[0]);
        }
        setLoading(false);
      }
    }
  };
  const handleCancel = async () => {
    props.setPages("list");
  };
  const indexPage = (
    <ScrollView style={styles.scrollView}>
      <VStack fill center mt={30}>
        <Flex fill center>
          <Text
            variant="h6"
            style={{
              ...styles.txtBlue,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            I-Edit ang Profile
          </Text>
        </Flex>
        <Flex fill center m={"5%"}>
          <TouchableOpacity onPress={handleProfile}>
            <Avatar
              style={styles.bgBlue}
              icon={(props) => (
                <Icon name="camera-account" {...props} color="#FFFFFF" />
              )}
            />
          </TouchableOpacity>
          {errorMsg ? (
            <Text variant="subtitle1" style={styles.txtError}>
              {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
            </Text>
          ) : null}
          <TextInput
            variant="outlined"
            placeholder="Numero ng Selpon"
            color="#132875"
            style={styles.txtInput}
            value={mobile}
            onChangeText={setMobile}
          />
          <TextInput
            variant="outlined"
            placeholder="Address"
            color="#132875"
            value={address}
            style={styles.txtInput}
            onChangeText={setAddress}
          />
        </Flex>
        <Flex fill mt={20}>
          <Button
            title="ISAVE"
            color="#FFFFFF"
            variant="outlined"
            style={{ ...styles.btnBlue, marginVertical: 10 }}
            onPress={onHandleSave}
            loading={isLoading}
            disabled={isLoading}
          />
          <Button
            title="KANSELAHIN"
            color="#FFFFFF"
            variant="outlined"
            style={{ ...styles.btnGreen }}
            onPress={handleCancel}
          />
        </Flex>
      </VStack>
    </ScrollView>
  );

  return <View style={{ ...styles.textWrapper }}>{indexPage}</View>;
}
