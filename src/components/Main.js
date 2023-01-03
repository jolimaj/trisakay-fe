import React, { useState } from "react";
import { Image, View } from "react-native";
import {
  Text,
  Button,
  Stack,
  Flex,
  Divider,
} from "@react-native-material/core";
import styles from "../Stylesheet";
import Login from "./Login";
import Register from "./Register";
import Term from "./Term";
import Dashboard from "./Dashboard";

export default function Main() {
  LogBox.ignoreLogs(["Require cycle:"]);
  const [isForm, setForm] = useState("");
  console.log("🚀 ~ file: Main.js ~ line 18 ~ Main ~ isForm", isForm);
  const [isLanding, setLanding] = useState(true);
  const handleLogin = () => {
    setLanding(false);
    setForm("login");
  };
  const handleRegister = () => {
    setLanding(false);
    setForm("register");
  };
  const handleLanding = () => {
    setLanding(true);
    setForm("");
  };
  const handleTerm = () => {
    setLanding(false);
    setForm("term");
  };

  const landing_layout = (
    <Flex fill center>
      <Image style={styles.image} source={require("../img/logo.png")} />
      <Image source={require("../img/UI.png")} />
      <Stack fill center>
        <Button title="Maglogin" style={styles.button} onPress={handleLogin} />
        <Text variant="subtitle1" style={{ marginTop: 10 }}>
          Wala pang Account?
          <Text style={styles.btnTxt} onPress={handleRegister}>
            Magrehistro
          </Text>
        </Text>
        <Divider style={{ marginTop: 50 }} />
        <Text variant="subtitle1">
          By using Tri-Sakay you are agreeing to our
        </Text>
        <Text style={{ color: "#132875" }} onPress={handleTerm}>
          Terms of Service & Privacy Policy
        </Text>
      </Stack>
    </Flex>
  );
  const MainPage = () => {
    if (isLanding === false) {
      if (isForm === "login") {
        return <Login arrowBack={handleLanding} />;
      } else if (isForm === "register") {
        return <Register arrowBack={handleLanding} />;
      } else {
        return <Term arrowBack={handleLanding} />;
      }
    }
    return landing_layout;
  };
  return (
    <View style={styles.textWrapper}>
      <Flex fill center>
        <MainPage />
      </Flex>
    </View>
  );
}
