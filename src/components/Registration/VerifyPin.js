import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Button,
  TextInput,
  HStack,
  Flex,
  VStack,
} from "@react-native-material/core";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import axios from "../../config/axios";
import AppBar from "../AppBar";
import LoginForm from "../LoginForm/index1";

export default function VerifyPin(props) {
  const [txtOne, setTxtOne] = useState("");
  const [txtTwo, setTxtTwo] = useState("");
  const [txtThree, setTxtThree] = useState("");
  const [txtFour, setTxtFour] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onVerifyPin = async () => {
    setLoading(true);
    if (txtOne === "" || txtTwo === "" || txtThree === "" || txtFour === "") {
      setLoading(false);

      setErrorMsg("Ilagay ang PIN");
    } else {
      try {
        const userID =
          "data" in props.value ? props.value.data[0].id : props.value.id;
        const data = { otp: `${txtOne}${txtTwo}${txtThree}${txtFour}` };
        const res = await axios.post(
          `/register/set_password/otp/${userID}`,
          data
        );

        setResult(res.data);
        setLoading(false);
      } catch (error) {
        if (error) {
          console.log(
            "🚀 ~ file: VerifyPin.js ~ line 44 ~ onVerifyPin ~ error",
            error
          );
          setErrorMsg("Mali ang PIN");
          setLoading(false);
        }
      }
    }
  };
  const indexPage = (
    <Flex fill center mb={20}>
      <AppBar arrowBack={props.arrowBack} />
      <ScrollView style={styles.scrollView}>
        <VStack fill center>
          <Flex fill center style={{ width: 300, height: 300 }}>
            <Logo />
            <Text
              variant="h6"
              style={{
                ...styles.txtBlue,
                fontWeight: "bold",
              }}
            >
              Patunayan ang iyong Email
            </Text>
            <Text
              variant="subtitle"
              style={{
                ...styles.txtGray,
              }}
            >
              Ilagay ang apat na numero na ipinadala sa iyong email.
            </Text>
          </Flex>
          <Flex fill center mt={50}>
            {errorMsg ? (
              <Text variant="subtitle1" style={styles.txtError}>
                {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
              </Text>
            ) : null}
            <HStack m={10} spacing={10}>
              <TextInput
                variant="outlined"
                keyboardType="numeric"
                style={styles.otpView}
                maxLength={1}
                color="#132875"
                onChangeText={setTxtOne}
                value={txtOne}
              />
              <TextInput
                variant="outlined"
                keyboardType="numeric"
                style={styles.otpView}
                maxLength={1}
                color="#132875"
                onChangeText={setTxtTwo}
                value={txtTwo}
              />
              <TextInput
                variant="outlined"
                keyboardType="numeric"
                style={styles.otpView}
                maxLength={1}
                color="#132875"
                onChangeText={setTxtThree}
                value={txtThree}
              />
              <TextInput
                variant="outlined"
                keyboardType="numeric"
                style={styles.otpView}
                maxLength={1}
                color="#132875"
                onChangeText={setTxtFour}
                value={txtFour}
              />
            </HStack>
          </Flex>

          <Flex fill>
            <Button
              title="Patunayan"
              color="#FFFFFF"
              variant="outlined"
              style={{ ...styles.btnBlue, marginBottom: 10 }}
              loading={isLoading}
              disabled={isLoading}
              onPress={onVerifyPin}
            />
            {/* <Text color="#132875" w={20} style={styles.txtGreen}>
              Magpadala ulit ng bagong pin.
            </Text> */}
          </Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  const MainPage = (props) => {
    if (result.data === "Granted") {
      return <LoginForm arrowBack={props.props.arrowBack} />;
    }
    return indexPage;
  };
  return (
    <View style={{ ...styles.textWrapper }}>
      <MainPage props={props} />
    </View>
  );
}
