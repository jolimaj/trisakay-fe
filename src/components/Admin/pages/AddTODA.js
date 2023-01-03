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
  const [code, setCode] = useState(
    props.pages === "add" ? "" : props.rowsData.code
  );
  const [name, setName] = useState(
    props.pages === "add" ? "" : props.rowsData.name
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleAdd() {
    try {
      await axios.post("/admin/toda/add", { code, name });
      props.reloads();
      props.pageName("list");
    } catch (error) {
      if (error) {
        if (name === "" || code === "") {
          setErrorMsg(error.response.data.error[0]);
        } else {
          setErrorMsg(error.response.data.error.message);
        }
      }
    }
  }
  async function handleUpdate() {
    try {
      await axios.put(`/admin/toda/update/${props.rowsData.id}`, {
        code,
        name,
      });
      props.reloads();
      props.pageName("list");
    } catch (error) {
      if (error) {
        if (name === "" || code === "") {
          setErrorMsg(error.response.data.error[0]);
        } else {
          setErrorMsg(error.response.data.error.message);
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
            {`${props.pages === "add" ? "Magdagdag ng" : "I-Edit ang"} TODA`}
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
            placeholder="Code ng TODA"
            color="#132875"
            style={styles.txtInput}
            value={code}
            onChangeText={setCode}
          />
          <TextInput
            variant="outlined"
            placeholder="Pangalan ng TODA"
            color="#132875"
            value={name}
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
            onPress={props.pages === "add" ? handleAdd : handleUpdate}
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
