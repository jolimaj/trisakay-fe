import React, { useState, useRef, useCallback } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Button,
  Flex,
  VStack,
  TextInput,
  IconButton,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import AppBar from "../AppBar";
import axios from "../../config/axios";
import Pin from "../Registration/VerifyPin";

export default function CreatePassword(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState("");
  const inputEl = useRef(null);
  const [eyeIcon, setEyeIcon] = useState("eye");
  const [isPassword, setIsPassword] = useState(true);
  const [eyeIcon1, setEyeIcon1] = useState("eye");
  const [isPassword1, setIsPassword1] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const changePwdType = () => {
    setEyeIcon(isPassword ? "eye-off" : "eye");
    setIsPassword((prevState) => !prevState);
  };
  const changePwdType1 = () => {
    setEyeIcon1(isPassword1 ? "eye-off" : "eye");
    setIsPassword1((prevState) => !prevState);
  };
  const onHandleCreate = async () => {
    setLoading(true);
    if (password === confirmPassword) {
      try {
        const res = await axios.put(
          `/register/set_password/${
            "userID" in props ? props.userID : props.value.id
          }`,
          {
            password,
          }
        );
        setResult(res.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          if (password === "") {
            setErrorMsg("Ang password ay hindi pweding blangko!");
            setLoading(false);
          } else {
            setErrorMsg(error.response.data.error[0]);
            setLoading(false);
          }
        }
      }
    } else {
      setErrorMsg("Hindi tugma ang password!");
      setLoading(false);
    }
  };
  const handlePassword = useCallback(
    (ev) => {
      const input = ev.nativeEvent.text;
      setPassword(input);
    },
    [setPassword]
  );
  const handleConfirmPassword = useCallback(
    (ev) => {
      const input = ev.nativeEvent.text;
      setConfirmPassword(input);
    },
    [setConfirmPassword]
  );
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
              Gumawa ng Password
            </Text>
          </Flex>
          <Flex fill center mt={10}>
            {errorMsg ? (
              <Text variant="subtitle1" style={styles.txtError}>
                {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
              </Text>
            ) : null}
            <TextInput
              variant="outlined"
              placeholder="Ilagay ang Password"
              color="#132875"
              style={styles.txtInput}
              secureTextEntry={isPassword}
              onEndEditing={handlePassword}
              ref={inputEl}
              defaultValue={password}
              leading={(props) => (
                <Icon
                  name="form-textbox-password"
                  {...props}
                  style={{ color: "#132875" }}
                />
              )}
              trailing={(props) => (
                <IconButton
                  icon={(props) => (
                    <Icon
                      name={eyeIcon}
                      {...props}
                      style={{ color: "#132875" }}
                    />
                  )}
                  {...props}
                  onPress={changePwdType}
                />
              )}
            />
            <TextInput
              variant="outlined"
              placeholder="Konpirmahin ang Password"
              color="#132875"
              style={styles.txtInput}
              secureTextEntry={isPassword1}
              onEndEditing={handleConfirmPassword}
              ref={inputEl}
              defaultValue={confirmPassword}
              leading={(props) => (
                <Icon
                  name="form-textbox-password"
                  {...props}
                  style={{ color: "#132875" }}
                />
              )}
              trailing={(props) => (
                <IconButton
                  icon={(props) => (
                    <Icon
                      name={eyeIcon1}
                      {...props}
                      style={{ color: "#132875" }}
                    />
                  )}
                  {...props}
                  onPress={changePwdType1}
                />
              )}
            />
          </Flex>
          <Flex fill m={10} w={300}>
            <Text
              variant="subtitle"
              style={{
                ...styles.txtGray,
                textAlign: "left",
              }}
            >
              Kaylangang magtaglay ng walo or higit pang letra.
            </Text>
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

  const MainPage = () => {
    if (result.code === "PASSWORD_SET") {
      return <Pin value={result} arrowBack={props.arrowBack} />;
    }
    return indexPage;
  };
  return (
    <View style={{ ...styles.textWrapper }}>
      <MainPage />
    </View>
  );
}
