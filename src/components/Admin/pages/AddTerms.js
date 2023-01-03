import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Button,
  TextInput,
  Flex,
  VStack,
} from "@react-native-material/core";
import axios from "../../../config/axios";
import styles from "../../Stylesheet";

export default function AddTerms(props) {
  const [title, setTitle] = useState(
    props.pages === "add" ? "" : props.rowsData.title
  );
  const [description, setDescription] = useState(
    props.pages === "add" ? "" : props.rowsData.description
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleAdd() {
    try {
      await axios.post("/admin/terms/add", { title, description });
      props.reloads();
      props.pageName("list");
    } catch (error) {
      if (error) {
        if (description === "" || title === "") {
          setErrorMsg(error.response.data.error[0]);
        } else {
          setErrorMsg(error.response.data.error.message);
        }
      }
    }
  }
  async function handleUpdate() {
    try {
      await axios.put(`/admin/terms/update/${props.rowsData.id}`, {
        title,
        description,
      });
      props.reloads();
      props.pageName("list");
    } catch (error) {
      if (error) {
        if (title === "" || description === "") {
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
            {`${
              props.pages === "add" ? "Magdagdag ng" : "I-Edit ang"
            } Terms at Kondisyon`}
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
            placeholder="Ilagay ang Pamagat"
            color="#132875"
            style={styles.txtInput}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            variant="outlined"
            placeholder="Ilagay ang deskripsyon"
            color="#132875"
            value={description}
            style={styles.txtInput}
            onChangeText={setDescription}
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
