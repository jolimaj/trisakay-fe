import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Button,
  Flex,
  VStack,
  TextInput,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import AppBar from "../AppBar";
import VerifyPin from "../../components/Registration/VerifyPin";
import axios from "../../config/axios";
import CreatePassword from "./CreatePassword";

export default function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onHandleCreate = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/login/forgot_password`, {
        email,
      });

      setResult(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMsg(
          error.response.data.error[0] ?? error.response.data.error.message
        );
      }
    }
  };
  const indexPage = (
    <Flex fill center mb={20}>
      <AppBar arrowBack={props.arrowBack} />
      <ScrollView style={styles.scrollView}>
        <VStack fill center>
          <Flex fill center style={{ width: 300, height: 200 }}>
            <Logo />
            <Text
              variant="h6"
              style={{
                ...styles.txtBlue,
                fontWeight: "bold",
              }}
            >
              Ireset ang password
            </Text>
          </Flex>
          <Flex fill center w={300}>
            <Text
              variant="subtitle"
              style={{
                ...styles.txtGray,
              }}
            >
              Ilagay ang email na ginamit sa pagrehistro ng iyong account.
              Magpapadala kami ng pin para makagawa ng panibagong password.
            </Text>
          </Flex>
          <Flex fill center mt={30}>
            {errorMsg ? (
              <Text variant="subtitle1" style={styles.txtError}>
                {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
              </Text>
            ) : null}
            <TextInput
              variant="outlined"
              placeholder="Ilagay ang Email"
              color="#132875"
              style={styles.txtInput}
              onChangeText={setEmail}
              value={email}
              leading={(props) => (
                <Icon name="email" {...props} style={{ color: "#132875" }} />
              )}
            />
          </Flex>
          <Flex fill m={20}>
            <Button
              title="ISUBMIT"
              color="#FFFFFF"
              variant="outlined"
              style={{ ...styles.btnBlue }}
              loading={isLoading}
              disabled={isLoading}
              onPress={onHandleCreate}
            />
          </Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  return (
    <View style={{ ...styles.textWrapper }}>
      {result === "" ? (
        indexPage
      ) : (
        <CreatePassword value={result} arrowBack={props.arrowBack} />
      )}
    </View>
  );
}
