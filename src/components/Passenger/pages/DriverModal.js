import React, { useState, useEffect } from "react";
import { Dialog, Avatar } from "@rneui/themed";
import { View } from "react-native";
import { HStack, Text, Divider, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Chat from "./Chat";
import { Rating } from "react-native-ratings";
import axios from "../../../config/axios";

const DriverModal = (props) => {
  const [ratingValue, setRatingValue] = useState(0);
  useEffect(() => {
    axios.get(`/rating/${props.driverDetail.id}`).then((response) => {
      const rates = parseFloat(response.data.data.rate);
      setRatingValue(rates);
    });
  }, []);
  const [openChat, setOpenChat] = useState(false);
  const driverData = props.driverDetail;
  const toggleDriver = () => {
    props.setVisible(false);
  };

  const toggleBook = () => {
    props.setBookeds(true);
    const books = {
      passengerID: props.passengerID,
      driverID: props.driverDetail.id,
    };
    props.setBookss(books);
    props.setVisible(false);
  };
  const chatMe = () => {
    setOpenChat(true);
    props.setVisible(false);
  };
  return (
    <View>
      <Chat
        openChat={openChat}
        setOpenChat={setOpenChat}
        visibleModal={props.setVisible}
        data={props}
      />
      <Dialog isVisible={props.visibles} onBackdropPress={toggleDriver}>
        <Dialog.Title
          title="Ang Drayber na iyong napili"
          titleStyle={{
            textAlign: "center",
            fontSize: 15,
            textTransform: "uppercase",
            color: "#132875",
          }}
        />
        <View
          style={{
            position: "relative",
            alignItems: "center",
          }}
        >
          <Avatar rounded source={{ uri: driverData.profile }} size={72} />
          <Text
            variant="h5"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              padding: 2,
              color: "#132875",
            }}
          >{`${driverData.fname} ${driverData.lname}`}</Text>
          <HStack m={4}>
            {Array.from({ length: Math.ceil(ratingValue) }, (x, i) => {
              return <Icon name="star" key={i} size={20} color="#FFA000" />;
            })}
            {Array.from({ length: 5 - ratingValue }, (x, i) => {
              return (
                <Icon name="star-outline" key={i} size={20} color="#FFA000" />
              );
            })}
          </HStack>
          <Text
            variant="h6"
            style={{
              textAlign: "center",
              padding: 2,
              color: "#132875",
            }}
          >
            {JSON.parse(driverData.details).driver.toda_name}
          </Text>

          <HStack m={4} spacing={6}>
            <Text
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#8bd8bd",
              }}
            >
              {`${JSON.parse(driverData.details).driver.p_motor}`}
            </Text>
            <Text
              variant="subtitle1"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                color: "#132875",
              }}
            >
              |
            </Text>
            <Text
              variant="subtitle1"
              style={{ textAlign: "center", color: "#363636" }}
            >
              {JSON.parse(driverData.details).driver.tric_num}
            </Text>
          </HStack>
        </View>
        <HStack m={4} spacing={6}>
          <Icon name="email" size={20} color="#132875" />{" "}
          <Text
            variant="subtitle2"
            style={{
              textAlign: "left",
              color: "#363636",
              fontStyle: "italic",
            }}
          >
            {driverData.email}
          </Text>
        </HStack>
        <HStack m={4} spacing={6}>
          <Icon name="cellphone" size={20} color="#132875" />{" "}
          <Text
            variant="subtitle2"
            style={{
              textAlign: "left",
              color: "#363636",
              fontStyle: "italic",
            }}
          >
            {driverData.mobile}
          </Text>
        </HStack>
        <HStack m={4} spacing={6}>
          <Icon name="home-city" size={20} color="#132875" />{" "}
          <Text
            variant="subtitle2"
            style={{
              textAlign: "left",
              color: "#363636",
              fontStyle: "italic",
            }}
          >
            {JSON.parse(driverData.details).address}
          </Text>
        </HStack>
        <Divider
          style={{
            marginTop: 20,
            marginHorizontal: 30,
            height: 5,
            backgroundColor: "#132875",
          }}
        />
        <Dialog.Actions>
          <Dialog.Button
            title="Chat"
            onPress={chatMe}
            titleStyle={{
              textAlign: "center",
              fontSize: 15,
              textTransform: "uppercase",
              color: "red",
              fontWeight: "bold",
            }}
          />
          <Dialog.Button
            title="Book"
            onPress={toggleBook}
            titleStyle={{
              textAlign: "center",
              fontSize: 15,
              textTransform: "uppercase",
              color: "#132875",
              fontWeight: "bold",
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default DriverModal;
