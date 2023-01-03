import React, { useState, useEffect } from "react";
import { Dialog, Avatar } from "@rneui/themed";
import { View } from "react-native";
import { Flex, TextInput, Divider, VStack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Rating, AirbnbRating } from "react-native-ratings";
import axios from "../../../config/axios";
import styles from "../../Stylesheet";

const DriverRate = (props) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [currValue, setCurrValue] = useState(0);
  const [comment, setComment] = useState("");

  const toggleClose = () => {
    props.setRates(false);
  };
  const getValue = (e) => {
    console.log("🚀 ~ file: DriverRate.js:19 ~ getValue ~ e", e);
    setRatingValue(e);
  };
  useEffect(() => {
    axios.get(`rating/${props.id}`).then((response) => {
      setCurrValue(response.data.data);
    });
  }, []);
  const toggleSubmit = async () => {
    const rates =
      parseFloat(ratingValue) +
      parseFloat(currValue.rate === null ? 0 : currValue.rate) / 5;
    console.log("🚀 ~ file: DriverRate.js:29 ~ toggleSubmit ~ rates", rates);
    await axios.put(`/rating/${props.id}`, {
      rate: rates,
      comment,
    });
    props.setRates(false);
    props.setOrder(null);
  };

  return (
    <View>
      <Dialog isVisible={props.rates}>
        <Dialog.Title
          title="I-rate ang Drayber"
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
          <VStack m={20}>
            <Rating
              ratingCount={5}
              imageSize={25}
              isDisabled={true}
              startingValue={ratingValue}
              onFinishRating={getValue}
            />
            <TextInput
              variant="outlined"
              placeholder="Komento"
              style={{ ...styles.txtInput, margin: 20, width: 200 }}
              color="#132875"
              onChangeText={setComment}
            />
          </VStack>
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
            title="IClose"
            onPress={toggleClose}
            titleStyle={{
              textAlign: "center",
              fontSize: 15,
              textTransform: "uppercase",
              color: "red",
              fontWeight: "bold",
            }}
          />
          <Dialog.Button
            title="Isubmit"
            onPress={toggleSubmit}
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

export default DriverRate;
