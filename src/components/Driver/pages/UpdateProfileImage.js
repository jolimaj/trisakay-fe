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
    <KeyboardAvoidingView behavior="position" style={styles.container}>
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
            <>
              <ListItem
                leadingMode="avatar"
                leading={
                  <Avatar
                    style={styles.bgBlue}
                    icon={(props) => (
                      <Icon name="camera-account" {...props} color="#FFFFFF" />
                    )}
                  />
                }
                title="Larawan ng Lisensya"
                secondaryText={
                  selectedLicense !== null ? selectedLicense.name : null
                }
                onPress={handleLicensence}
              />
              <ListItem
                leadingMode="avatar"
                leading={
                  <Avatar
                    style={styles.bgBlue}
                    icon={(props) => (
                      <Icon name="camera-account" {...props} color="#FFFFFF" />
                    )}
                  />
                }
                title="Larawan ng Prangkisa"
                secondaryText={
                  seletedFranchise !== null ? seletedFranchise.name : null
                }
                onPress={handleFranchise}
              />
              <ListItem
                leadingMode="avatar"
                leading={
                  <Avatar
                    style={styles.bgBlue}
                    icon={(props) => (
                      <Icon name="camera-account" {...props} color="#FFFFFF" />
                    )}
                  />
                }
                title="Larawan ng Rehistro ng motor"
                secondaryText={
                  seletedRegistration !== null ? seletedRegistration.name : null
                }
                onPress={handleRegistration}
              />
              <ListItem
                leadingMode="avatar"
                leading={
                  <Avatar
                    style={styles.bgBlue}
                    icon={(props) => (
                      <Icon name="camera-account" {...props} color="#FFFFFF" />
                    )}
                  />
                }
                title="Larawan ng Traysikel"
                secondaryText={
                  seletedPicture !== null ? seletedPicture.name : null
                }
                onPress={handleTric}
              />
            </>
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
    </KeyboardAvoidingView>
  );

  return indexPage;
}
