import React, { useState, useEffect, useCallback } from "react";
import { Dialog, Avatar } from "@rneui/themed";
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
  console.log("🚀 ~ file: Chat.js:22 ~ ChatModal ~ props", props);
  const [senderM, setSenderM] = useState("");
  console.log("🚀 ~ file: Chat.js:23 ~ ChatModal ~ senderM", senderM);
  const [receiverM, setReceiverM] = useState("");
  console.log("🚀 ~ file: Chat.js:24 ~ ChatModal ~ receiverM", receiverM);
  const [mess, setMess] = useState("");
  useEffect(() => {
    axios
      .get(`/messages/sender/${props.data.driverDetail.id}`)
      .then((response) => {
        setReceiverM(response.data.data);
      });
  }, []);
  useEffect(() => {
    axios.get(`/messages/sender/${props.data.passengerID}`).then((response) => {
      setSenderM(response.data.data);
    });
  }, []);

  const onRefresh = useCallback(() => {
    wait(3000).then(() => {
      axios
        .get(`/messages/sender/${props.data.driverDetail.id}`)
        .then((response) => {
          setReceiverM(response.data.data);
        });

      axios
        .get(`/messages/sender/${props.data.passengerID}`)
        .then((response) => {
          setSenderM(response.data.data);
        });
    });
  }, []);

  const toggleClose = () => {
    props.visibleModal(true);
    props.setOpenChat(false);
    setMess("");
  };

  async function sendMessage() {
    try {
      await axios.post("/messages", {
        receiverID: props.data.driverDetail.id.toString(),
        senderID: props.data.passengerID.toString(),
        messages: mess,
      });
      setMess("");
      onRefresh();
    } catch (error) {
      if (error) {
        console.log(
          "🚀 ~ file: Chat.js:47 ~ sendMessage ~ error",
          error.response
        );
      }
    }
  }
  return (
    <View>
      <Dialog isVisible={props.openChat} onBackdropPress={toggleClose}>
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
                  <View>
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
                  </View>
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
