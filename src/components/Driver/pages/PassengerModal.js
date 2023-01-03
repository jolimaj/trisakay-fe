import React, { useState, useEffect } from "react";
import { Dialog, Avatar } from "@rneui/themed";
import { View } from "react-native";
import { HStack, Text, Divider, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Geocoder from "react-native-geocoding";
const GOOGLE_MAPS_APIKEY = "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8";
import axios from "../../../config/axios";

const PassengerModal = (props) => {
  const passengerData = props.passengerDetail;
  const [origin, setOrigin] = useState("");
  const [destination, setDestinations] = useState("");
  const toggleAccept = async () => {
    await axios.put(`/booking/accept/${passengerData.driverID}`, {
      passengerID: passengerData.passengerID,
    });
    props.setVisible(false);
    props.setEnd(null);
    props.setPassenger(null);
    props.setEndTxt("Find Passenger");
    props.onGetCurrentPassenger();
  };
  const toggleReject = async () => {
    await axios.put(`/booking/reject/${passengerData.driverID}`, {
      passengerID: passengerData.passengerID,
    });
    props.setVisible(false);
    props.setEnd(null);
    props.setPassenger(null);
    props.setEndTxt("Find Passenger");
  };
  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_APIKEY);
    Geocoder.from(
      JSON.parse(passengerData.booking_details).origin.lat,
      JSON.parse(passengerData.booking_details).origin.long
    )
      .then((json) => {
        const { formatted_address, place_id, geometry } = json.results[0];
        setOrigin(formatted_address);
      })
      .catch((error) => console.warn(error));
  }, []);
  useEffect(() => {
    Geocoder.init(GOOGLE_MAPS_APIKEY);
    Geocoder.from(
      JSON.parse(passengerData.booking_details).destination.lat,
      JSON.parse(passengerData.booking_details).destination.long
    )
      .then((json) => {
        const { formatted_address, place_id, geometry } = json.results[0];
        setDestinations(formatted_address);
      })
      .catch((error) => console.warn(error));
  }, []);
  return (
    <View>
      <Dialog isVisible={props.visibles}>
        <Dialog.Title
          title="Pasaherong Nakuha"
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
          <Avatar rounded source={{ uri: passengerData.profile }} size={72} />
          <Text
            variant="h5"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              padding: 2,
              color: "#132875",
            }}
          >{`${passengerData.fname} ${passengerData.lname}`}</Text>
        </View>
        <View style={{ width: 200 }}>
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
              {passengerData.mobile}
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
              {JSON.parse(passengerData.other).address}
            </Text>
          </HStack>
          <HStack m={4} spacing={6}>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#132875",
                fontWeight: "bold",
              }}
            >
              Bilang ng Pasahero:
            </Text>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#363636",
                fontStyle: "italic",
                width: 150,
              }}
            >
              {JSON.parse(passengerData.booking_details).passenger}
            </Text>
          </HStack>
          <HStack m={4} spacing={6}>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#132875",
                fontWeight: "bold",
              }}
            >
              Area ng Pick up:{" "}
            </Text>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#363636",
                fontStyle: "italic",
                width: 150,
              }}
            >
              {origin}
            </Text>
          </HStack>
          <HStack m={4} spacing={6}>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#132875",
                fontWeight: "bold",
              }}
            >
              Destinasyon:
            </Text>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#363636",
                fontStyle: "italic",
                width: 150,
              }}
            >
              {destination}
            </Text>
          </HStack>
          <HStack m={4} spacing={6}>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#132875",
                fontWeight: "bold",
              }}
            >
              Distansya:
            </Text>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#363636",
                fontStyle: "italic",
                width: 150,
              }}
            >
              {`${JSON.parse(passengerData.booking_details).distance} km`}
            </Text>
          </HStack>
          <HStack m={4} spacing={6}>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#132875",
                fontWeight: "bold",
              }}
            >
              Pamasahe:
            </Text>
            <Text
              variant="subtitle2"
              style={{
                textAlign: "left",
                color: "#363636",
                fontStyle: "italic",
                width: 150,
              }}
            >
              {`₱ ${passengerData.fee}`}
            </Text>
          </HStack>
        </View>
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
            title="Ireject"
            onPress={toggleReject}
            titleStyle={{
              textAlign: "center",
              fontSize: 15,
              textTransform: "uppercase",
              color: "red",
              fontWeight: "bold",
            }}
          />
          <Dialog.Button
            title="Tanggapin"
            onPress={toggleAccept}
            variant="text"
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

export default PassengerModal;
