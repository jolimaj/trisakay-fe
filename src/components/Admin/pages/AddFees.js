import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Flex,
  VStack,
  IconButton,
} from "@react-native-material/core";
import axios from "../../../config/axios";
import styles from "../../Stylesheet";

export default function AddTODA(props) {
  const [name, setName] = useState(
    props.pages === "add" ? "" : props.rowsData.name
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleUpdate() {
    try {
      await axios.put(`/admin/fees/${props.rowsData.id}`, {
        name,
      });
      props.reloads();
      props.pageName("list");
    } catch (error) {
      if (error) {
        console.log(
          "🚀 ~ file: AddFees.js ~ line 30 ~ handleUpdate ~ error",
          error
        );
        if (name === "") {
          setErrorMsg("Mag lagay ng presyo");
        }
      }
    }
  }
  async function handleCancel() {
    props.pageName("list");
    props.reloads();
  }
  return (
    <ScrollView style={styles.scrollView}>
      <VStack fill center>
        <Flex fill center>
          <Text
            variant="h6"
            style={{
              ...styles.txtBlue,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {`${
              props.pages === "add" ? "Magdagdag ng" : "I-Edit ang"
            } Pamasahe`}
          </Text>
        </Flex>
        <Flex fill>
          {errorMsg ? (
            <Text variant="subtitle1" style={styles.txtError}>
              {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
            </Text>
          ) : null}
          <TextInput
            variant="outlined"
            placeholder="Pangalan ng TODA"
            color="#132875"
            value={name}
            keyboardType="numeric"
            style={styles.txtInput}
            onChangeText={setName}
          />
        </Flex>

        <Flex fill mt={20}>
          <Button
            title="ISAVE"
            color="#FFFFFF"
            variant="outlined"
            style={{ ...styles.btnBlue, marginVertical: 10 }}
            onPress={handleUpdate}
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
}
