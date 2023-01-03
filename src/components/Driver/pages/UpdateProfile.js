import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import {
  Text,
  Avatar,
  TextInput,
  Flex,
  VStack,
  HStack,
  Button,
  ListItem,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../Stylesheet";
import * as ImagePicker from "react-native-image-picker";
import axios from "../../../config/axios";
import mime from "mime";
import SelectDropdown from "react-native-select-dropdown";
import { Tab, TabView } from "@rneui/themed";

export default function Profile(props) {
  const [address, setAddress] = useState(
    JSON.parse(props.userData.details).address
  );
  const [mobile, setMobile] = useState(props.userData.mobile);
  const [result, setResult] = useState("");
  const [todaName, setTODA] = useState([]);
  const [selectedToda, setselectedToda] = useState("");
  const [tric_num, setTricNum] = useState(
    JSON.parse(props.userData.details).driver.tric_num
  );
  const [p_motor, setPlaka] = useState(
    JSON.parse(props.userData.details).driver.p_motor
  );
  const [selectedProfile, setselectedProfile] = useState(null);
  const [selectedLicense, setSeletedLicences] = useState(
    JSON.parse(props.userData.details).driver.licence_pic
  );
  const [seletedFranchise, setSeletedFranchise] = useState(
    JSON.parse(props.userData.details).driver.franchise_pic
  );
  const [seletedRegistration, setSeletedRegistration] = useState(
    JSON.parse(props.userData.details).driver.registration_pic
  );
  const [seletedPicture, setSeletedPicture] = useState(
    JSON.parse(props.userData.details).driver.tric_pic
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      axios.get("/toda").then((response) => {
        setTODA(response.data.data);
      });
    }, 1000);
  }, []);
  const formData = new FormData();
  formData.append("address", address);
  formData.append("mobile", mobile);
  formData.append("profile", selectedProfile);
  formData.append("roleID", props.userData.roleID);
  formData.append("toda_name", selectedToda);
  formData.append("tric_num", tric_num);
  formData.append("p_motor", p_motor);
  formData.append("licence_pic", selectedLicense);
  formData.append("franchise_pic", seletedFranchise);
  formData.append("registration_pic", seletedRegistration);
  formData.append("tric_pic", seletedPicture);

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
  const handleLicensence = async () => {
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
      setSeletedLicences({
        uri: files.uri,
        name: files.uri.split("/").pop(),
        type: mime.getType(files.uri),
      });
    } catch (err) {
      setErrorMsg(err);
    }
  };
  const handleFranchise = async () => {
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
      setSeletedFranchise({
        uri: files.uri,
        name: files.uri.split("/").pop(),
        type: mime.getType(files.uri),
      });
    } catch (err) {
      setErrorMsg(err);
    }
  };
  const handleRegistration = async () => {
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
      setSeletedRegistration({
        uri: files.uri,
        name: files.uri.split("/").pop(),
        type: mime.getType(files.uri),
      });
    } catch (err) {
      setErrorMsg(err);
    }
  };
  const handleTric = async () => {
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
      setSeletedPicture({
        uri: files.uri,
        name: files.uri.split("/").pop(),
        type: mime.getType(files.uri),
      });
    } catch (err) {
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
        if (
          mobile === "" ||
          address === "" ||
          selectedProfile === null ||
          tric_num === "" ||
          selectedToda === "" ||
          selectedLicense === "" ||
          seletedFranchise === "" ||
          seletedRegistration === "" ||
          seletedPicture === ""
        ) {
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
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ minHeight: "100%" }}
      >
        <View style={{ paddingBottom: 150 }}>
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
                  size={50}
                />
              </TouchableOpacity>
              <Text
                variant="caption"
                style={{ ...styles.txtGreen, width: 300 }}
              >
                {selectedProfile !== null ? selectedProfile.name : null}
              </Text>
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
              <TextInput
                variant="outlined"
                placeholder="Numero ng Traysikel"
                color="#132875"
                value={tric_num}
                style={styles.txtInput}
                onChangeText={setTricNum}
              />
              <TextInput
                variant="outlined"
                placeholder="Plaka ng Motor"
                color="#132875"
                value={p_motor}
                style={styles.txtInput}
                onChangeText={setPlaka}
              />
              <SelectDropdown
                borderColor="#132875"
                defaultButtonText={"TODANG Nasalihan"}
                buttonStyle={{
                  ...styles.txtInput,
                  backgroundColor: "white",
                  height: 55,
                  borderRadius: 5,
                  padding: 5,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
                buttonTextStyle={{
                  color: "gray",
                  fontSize: 15,
                }}
                data={todaName.map((item) => item.code)}
                onSelect={(selectedItem) => {
                  console.log(selectedItem);
                  setselectedToda(selectedItem);
                }}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Icon
                      name={isOpened ? "chevron-up" : "chevron-down"}
                      style={{ color: "#132875", borderColor: "#132875" }}
                      size={30}
                    />
                  );
                }}
                renderCustomizedButtonChild={(selectedItem, index) => {
                  return (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: -50,
                      }}
                    >
                      {selectedItem ? (
                        <Icon
                          name="account-group"
                          style={{ color: "#132875" }}
                          size={32}
                        />
                      ) : (
                        <Icon
                          name="account-group"
                          style={{ color: "#132875" }}
                          size={32}
                        />
                      )}
                      <Text
                        style={{
                          textAlign: "right",
                          color: selectedItem ? "gray" : "black",
                          marginHorizontal: 10,
                        }}
                      >
                        {selectedItem ? selectedItem : "TODANG Nasalihan"}
                      </Text>
                    </View>
                  );
                }}
              />
              <Text
                variant="body1"
                style={{ ...styles.txtBlue, fontWeight: "bold" }}
              >
                Larawan ng Lisensya
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 100 }}
                onPress={handleLicensence}
              >
                <Icon name="camera" style={{ color: "#132875" }} size={50} />
              </TouchableOpacity>
              <Text
                variant="overline"
                style={{ ...styles.txtGreen, width: 300 }}
              >
                {selectedLicense !== null ? selectedLicense.name : null}
              </Text>
              <Text
                variant="body1"
                style={{ ...styles.txtBlue, fontWeight: "bold" }}
              >
                Larawan ng Prangkisa
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 100 }}
                onPress={handleFranchise}
              >
                <Icon name="camera" style={{ color: "#132875" }} size={50} />
              </TouchableOpacity>
              <Text
                variant="overline"
                style={{ ...styles.txtGreen, width: 300 }}
              >
                {" "}
                {seletedFranchise !== null ? seletedFranchise.name : null}
              </Text>
              <Text
                variant="body1"
                style={{ ...styles.txtBlue, fontWeight: "bold" }}
              >
                Larawan ng Rehistro ng Motor
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 100 }}
                onPress={handleRegistration}
              >
                <Icon name="camera" style={{ color: "#132875" }} size={50} />
              </TouchableOpacity>
              <Text
                variant="overline"
                style={{ ...styles.txtGreen, width: 300 }}
              >
                {seletedRegistration !== null ? seletedRegistration.name : null}
              </Text>
              <Text
                variant="body1"
                style={{ ...styles.txtBlue, fontWeight: "bold" }}
              >
                Larawan ng Traysikel
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 100 }}
                onPress={handleTric}
              >
                <Icon name="camera" style={{ color: "#132875" }} size={50} />
              </TouchableOpacity>
              <Text
                variant="overline"
                style={{ ...styles.txtGreen, width: 300 }}
              >
                {seletedPicture !== null ? seletedPicture.name : null}
              </Text>
            </Flex>
            <Flex fill>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

  return indexPage;
}
