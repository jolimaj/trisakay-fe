import React, { useState, useEffect, useCallback } from "react";
import { Dialog } from "@rneui/themed";
import { View, ScrollView } from "react-native";
import {
  HStack,
  Divider,
  IconButton,
  VStack,
  Chip,
  TextInput,
  Text,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "../../../config/axios";
import styles from "../../../Stylesheet";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const ChatModal = (props) => {
  const [senderM, setSenderM] = useState("");
  const [receiverM, setReceiverM] = useState("");
  const [receiverID, setReceiverID] = useState("");
  console.log("🚀 ~ file: Chat.js:25 ~ ChatModal ~ receiverID", receiverID);
  const [mess, setMess] = useState("");
  useEffect(() => {
    axios.get(`/messages/sender/${props.data.id}`).then((response) => {
      setSenderM(response.data.data);
      setReceiverID(response.data.data[0].receiverID);
    });
  }, []);
  useEffect(() => {
    axios.get(`/messages/receiver/${receiverID}`).then((response) => {
      setReceiverM(response.data.data);
    });
  }, []);

  const onRefresh = useCallback(() => {
    wait(3000).then(() => {
      axios.get(`/messages/receiver/${receiverID}`).then((response) => {
        setReceiverM(response.data.data);
      });

      axios.get(`/messages/sender/${props.data.id}`).then((response) => {
        setSenderM(response.data.data);
      });
    });
  }, []);

  const toggleClose = () => {
    props.setOpenChat(false);
    setMess("");
  };

  async function sendMessage() {
    if (receiverM) {
      try {
        await axios.post("/messages", {
          senderID: props.data.id.toString(),
          receiverID: receiverM[0].senderID.toString(),
          messages: mess,
        });
        setMess("");
        onRefresh();
      } catch (error) {
        if (error) {
          console.log("🚀 ~ file: Chat.js:47 ~ sendMessage ~ error", error);
        }
      }
    }
  }
  return (
    <View>
      <Dialog
        isVisible={props.openChat}
        onBackdropPress={toggleClose}
        onPressIn={onRefresh}
      >
        <Dialog.Title
          title="Message"
          titleStyle={{
            textAlign: "center",
            fontSize: 15,
            textTransform: "uppercase",
            color: "#132875",
          }}
        />
        <View style={{ height: 300 }}>
          <ScrollView style={styles.scrollView}>
            <VStack m={5}>
              <Divider
                style={{
                  marginTop: 20,
                  marginHorizontal: 30,
                  height: 5,
                  backgroundColor: "#132875",
                }}
              />
              {receiverM &&
                receiverM.map((item) => (
                  <View>
                    <Chip
                      color="#132875"
                      label={item.messages}
                      key={item.id}
                      style={{
                        width: "auto",
                        marginRight: 50,
                        backgroundColor: "#8bd8bd",
                        marginTop: 5,
                      }}
                    />
                    <Text
                      variant="caption"
                      style={{
                        width: "auto",
                        marginRight: 50,
                      }}
                    >
                      {`Sent by ${item.fname} ${item.lname}`}
                    </Text>
                  </View>
                ))}
            </VStack>
            <VStack m={5}>
              {senderM &&
                senderM.map((item) => (
                  <Chip
                    color="#8bd8bd"
                    label={item.messages}
                    key={item.id}
                    style={{
                      width: "auto",
                      marginLeft: 50,
                      backgroundColor: "#132875",
                      marginTop: 5,
                    }}
                  />
                ))}
            </VStack>
            <HStack m={10}>
              <TextInput
                variant="outlined"
                color="#8bd8bd"
                onChangeText={setMess}
                style={{ width: 180 }}
                value={mess}
              ></TextInput>
              <IconButton
                icon={(props) => (
                  <Icon
                    name="send-circle"
                    {...props}
                    size={35}
                    color="#8bd8bd"
                  />
                )}
                onPress={sendMessage}
              />
            </HStack>
          </ScrollView>
        </View>
      </Dialog>
    </View>
  );
};

export default ChatModal;
