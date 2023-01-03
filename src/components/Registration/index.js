import React, { useState } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text, Flex, VStack } from "@react-native-material/core";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import Form from "./register";
import AppBar from "../AppBar";

export default function RegisterAs(props) {
  const [isType, setType] = useState(0);
  const [isLanding, setLanding] = useState(true);
  const driver = () => {
    setLanding(false);
    setType(2);
  };
  const passenger = () => {
    setLanding(false);
    setType(3);
  };
  const handleBack = () => {
    setLanding(true);
    setType(0);
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
              Magrehistro Bilang
            </Text>
          </Flex>
          <Flex fill center>
            <TouchableOpacity onPress={driver}>
              <Flex
                style={{
                  ...styles.bgBlue,
                  ...styles.backgroundPanel,
                }}
                fill
                center
              >
                <Image
                  style={styles.role}
                  source={require("../../img/drayber.png")}
                />
                <Text
                  variant="body2"
                  style={{
                    ...styles.txtWhite,
                    margin: 1,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Drayber
                </Text>
              </Flex>
            </TouchableOpacity>
          </Flex>
          <Flex fill center>
            <TouchableOpacity onPress={passenger}>
              <Flex
                style={{
                  ...styles.bgBlue,
                  ...styles.backgroundPanel,
                }}
                fill
                center
              >
                <Image
                  style={styles.role}
                  source={require("../../img/PASAHERO.png")}
                />
                <Text
                  variant="body2"
                  style={{
                    ...styles.txtWhite,
                    margin: 1,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Pasahero
                </Text>
              </Flex>
            </TouchableOpacity>
          </Flex>
        </VStack>
      </ScrollView>
    </Flex>
  );

  const MainPage = () => {
    if (isLanding === false) {
      return <Form value={isType} arrowBack={handleBack} />;
    }
    return indexPage;
  };
  return (
    <View style={{ ...styles.textWrapper }}>
      <MainPage />
    </View>
  );
}
