import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  Flex,
  VStack,
  TextInput,
  Avatar,
  Box,
} from "@react-native-material/core";
import mime from "mime";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import SelectDropdown from "react-native-select-dropdown";
import * as ImagePicker from "react-native-image-picker";
import CreatePassword from "../../components/Password/CreatePassword";
import AppBar from "../AppBar";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import axios from "../../config/axios";

export default function Register(props) {
  const [isLoading, setLoading] = useState(false);
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [passengerType, setPassengerType] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [todaName, setTODA] = useState([]);
  const [selectedToda, setselectedToda] = useState("");
  const [tric_num, setTricNum] = useState(null);
  const [p_motor, setPlaka] = useState(null);
  const [selectedProfile, setselectedProfile] = useState(null);
  const [selectedLicense, setSeletedLicences] = useState(null);
  const [seletedFranchise, setSeletedFranchise] = useState(null);
  const [seletedRegistration, setSeletedRegistration] = useState(null);
  const [seletedPicture, setSeletedPicture] = useState(null);
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    setTimeout(() => {
      axios.get("/toda").then((response) => {
        setTODA(response.data.data);
      });
    }, 1000);
  }, []);

  const formData = new FormData();
  formData.append("roleID", props.value);
  formData.append("fname", fname);
  formData.append("mname", mname);
  formData.append("lname", lname);
  formData.append("address", address);
  formData.append("mobile", mobile);
  formData.append("email", email);
  formData.append("toda_name", selectedToda);
  formData.append("tric_num", tric_num);
  formData.append("p_motor", p_motor);
  formData.append("licence_pic", selectedLicense);
  formData.append("franchise_pic", seletedFranchise);
  formData.append("registration_pic", seletedRegistration);
  formData.append("tric_pic", seletedPicture);
  formData.append("profile", selectedProfile);

  const formsData = new FormData();
  formsData.append("roleID", props.value);
  formsData.append("fname", fname);
  formsData.append("mname", mname);
  formsData.append("lname", lname);
  formsData.append("address", address);
  formsData.append("mobile", mobile);
  formsData.append("email", email);
  formsData.append("passengerType", passengerType);
  formsData.append("profile", selectedProfile);

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

  const onHandleRegister = async () => {
    const roleID = props.value;
    setLoading(true);
    try {
      const res = await axios.post(
        "/register",
        roleID == 2 ? formData : formsData
      );
      setResult(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(
          "🚀 ~ file: register.js ~ line 217 ~ onHandleRegister ~ error",
          error
        );

        if (props.value === 3) {
          if (
            selectedProfile === null ||
            fname === "" ||
            lname === "" ||
            address === "" ||
            passengerType === "" ||
            mobile === "" ||
            email === ""
          ) {
            setErrorMsg("Please complete all required fields");
          } else {
            setErrorMsg(
              error.response.data.error[0] ?? error.response.data.error.message
            );
          }
        } else {
          if (
            selectedProfile === null ||
            fname === "" ||
            lname === "" ||
            address === "" ||
            mobile === "" ||
            email === "" ||
            tric_num === "" ||
            selectedToda === "" ||
            selectedLicense === "" ||
            seletedFranchise === "" ||
            seletedRegistration === "" ||
            seletedPicture === ""
          ) {
            setErrorMsg("Please complete all required fields");
          } else {
            setErrorMsg(
              error.response.data.error[0] ?? error.response.data.error.message
            );
          }
        }
      }
    }
  };

  const userTypes = ["None", "Student", "PWD", "Senior Citizen"];
  const indexPage = (
    <Flex fill center mb={20}>
      <AppBar arrowBack={props.arrowBack} />
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <VStack fill center>
            <Flex fill center style={{ width: 300, height: 200 }}>
              <Logo />
              <Text
                variant="h6"
                style={{ ...styles.txtBlue, fontWeight: "bold" }}
              >
                {`Magrehistro Bilang ${
                  props.value == 2 ? "Drayber" : "Pasahero"
                }`}
              </Text>
            </Flex>
            <Flex fill center m={"5%"}>
              {errorMsg ? (
                <Text variant="subtitle1" style={styles.txtError}>
                  {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
                </Text>
              ) : null}
              <TouchableOpacity onPress={handleProfile}>
                <Avatar
                  style={styles.bgBlue}
                  icon={(props) => (
                    <Icon name="camera-account" {...props} color="#FFFFFF" />
                  )}
                />
              </TouchableOpacity>
              <Text
                variant="caption"
                style={{ ...styles.txtGreen, width: 300 }}
              >
                {selectedProfile !== null ? selectedProfile.name : null}
              </Text>
              <Text
                variant="body1"
                style={{ ...styles.txtBlue, fontWeight: "bold" }}
              >
                Mag-upload ng Larawan
              </Text>
              <TextInput
                variant="outlined"
                placeholder="Pangalan"
                style={styles.txtInput}
                color="#132875"
                onChangeText={setFname}
                leading={(props) => (
                  <Icon
                    name="account"
                    {...props}
                    color="#132875"
                    type="material-community"
                  />
                )}
              />
              <TextInput
                variant="outlined"
                placeholder="Pangitna"
                color="#132875"
                style={styles.txtInput}
                onChangeText={setMname}
                leading={(props) => (
                  <Icon
                    name="account"
                    {...props}
                    style={{ color: "#132875" }}
                  />
                )}
              />
              <TextInput
                variant="outlined"
                placeholder="Apelyido"
                color="#132875"
                style={styles.txtInput}
                onChangeText={setLname}
                leading={(props) => (
                  <Icon
                    name="account"
                    {...props}
                    style={{ color: "#132875" }}
                  />
                )}
              />
              <TextInput
                variant="outlined"
                placeholder="Address"
                color="#132875"
                style={styles.txtInput}
                onChangeText={setAddress}
                leading={(props) => (
                  <Icon name="home" {...props} style={{ color: "#132875" }} />
                )}
              />
              <TextInput
                variant="outlined"
                placeholder="Numero ng Selpon"
                style={styles.txtInput}
                color="#132875"
                onChangeText={setMobile}
                leading={(props) => (
                  <Icon
                    name="cellphone"
                    {...props}
                    style={{ color: "#132875" }}
                  />
                )}
              />

              <TextInput
                variant="outlined"
                placeholder="Email Address"
                style={styles.txtInput}
                color="#132875"
                onChangeText={setEmail}
                leading={(props) => (
                  <Icon name="email" {...props} style={{ color: "#132875" }} />
                )}
              />
              {props.value == 3 && (
                <View>
                  <SelectDropdown
                    borderColor="#132875"
                    defaultButtonText={"Kategorya"}
                    buttonStyle={{
                      ...styles.txtInput,
                      backgroundColor: "white",
                      height: 55,
                      borderRadius: 5,
                      padding: 5,
                      borderWidth: 1,
                      borderColor: "gray",
                    }}
                    value={"Driver"}
                    buttonTextStyle={{
                      color: "gray",
                      fontSize: 15,
                    }}
                    data={userTypes.map((item) => item)}
                    onSelect={(selectedItem) => {
                      setPassengerType(selectedItem);
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
                              name="format-list-bulleted-type"
                              style={{ color: "#132875" }}
                              size={32}
                            />
                          ) : (
                            <Icon
                              name="format-list-bulleted-type"
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
                            {selectedItem ? selectedItem : "Kategorya"}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              )}

              {props.value == 2 && (
                <Box>
                  <TextInput
                    variant="outlined"
                    placeholder="Numero ng Traysikel"
                    style={styles.txtInput}
                    color="#132875"
                    onChangeText={setTricNum}
                    leading={(props) => (
                      <Icon
                        name="license"
                        {...props}
                        style={{ color: "#132875" }}
                      />
                    )}
                  />
                  <TextInput
                    variant="outlined"
                    placeholder="Palaka ng motor"
                    style={{ ...styles.txtInput }}
                    color="#132875"
                    onChangeText={setPlaka}
                    leading={(props) => (
                      <Icon
                        name="card-text"
                        {...props}
                        style={{ color: "#132875" }}
                      />
                    )}
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
                  <Box mt={20}>
                    <Text
                      variant="body1"
                      style={{ ...styles.txtBlue, fontWeight: "bold" }}
                    >
                      Larawan ng lisensya
                    </Text>
                    <TouchableOpacity
                      style={{ marginHorizontal: 100 }}
                      onPress={handleLicensence}
                    >
                      <Icon
                        name="camera"
                        style={{ color: "#132875" }}
                        size={100}
                      />
                    </TouchableOpacity>

                    <Text
                      variant="caption"
                      style={{ ...styles.txtGreen, width: 300 }}
                    >
                      {selectedLicense !== null ? selectedLicense.name : null}
                    </Text>
                  </Box>
                  <Box mt={20}>
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
                      <Icon
                        name="camera"
                        style={{ color: "#132875" }}
                        size={100}
                      />
                    </TouchableOpacity>
                    <Text
                      variant="caption"
                      style={{ ...styles.txtGreen, width: 300 }}
                    >
                      {" "}
                      {seletedFranchise !== null ? seletedFranchise.name : null}
                    </Text>
                  </Box>
                  <Box my={20}>
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
                      <Icon
                        name="camera"
                        style={{ color: "#132875" }}
                        size={100}
                      />
                    </TouchableOpacity>
                    <Text
                      variant="caption"
                      style={{ ...styles.txtGreen, width: 300 }}
                    >
                      {" "}
                      {seletedRegistration !== null
                        ? seletedRegistration.name
                        : null}
                    </Text>
                  </Box>
                  <Box mt={20}>
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
                      <Icon
                        name="camera"
                        style={{ color: "#132875" }}
                        size={100}
                      />
                    </TouchableOpacity>
                    <Text
                      variant="caption"
                      style={{ ...styles.txtGreen, width: 300 }}
                    >
                      {" "}
                      {seletedPicture !== null ? seletedPicture.name : null}
                    </Text>
                  </Box>
                </Box>
              )}
            </Flex>
            <Flex fill mt={"5%"}>
              <Button
                title="MAGREHISTRO"
                color="#FFFFFF"
                variant="outlined"
                style={{ ...styles.btnBlue, marginVertical: 10 }}
                loading={isLoading}
                disabled={isLoading}
                onPress={onHandleRegister}
              />
            </Flex>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </Flex>
  );

  return (
    <View style={{ ...styles.textWrapper }}>
      {result === "" ? (
        indexPage
      ) : (
        <CreatePassword userID={result.data.id} arrowBack={props.arrowBack} />
      )}
    </View>
  );
}
