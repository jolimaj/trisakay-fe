import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Button,
  Flex,
  TextInput,
  IconButton,
} from "@react-native-material/core";
import styles from "../../Stylesheet";
import axios from "../../../config/axios";
import Geocoder from "react-native-geocoding";
import { getDistance } from "geolib";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Dimensions } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Notification from "./Notification";
import NotificationDone from "./NotificationDone";
import REject from "./REject";
import AcceptModal from "./AcceptModal";

const screenWidth = Dimensions.get("window").width;

export default function Booking(props) {
  const [driverData, setDriverData] = useState(null);
  const [passengerData, setPassengerData] = useState(null);
  const [myAddress, setCurrentAddress] = useState(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8";
  const [places, setPlaces] = useState("");
  const [numPass, setNumPass] = useState(1);
  const [minimum, setMin] = useState(0);
  const [fee, setFee] = useState(0);
  const [discount, setDiscount] = useState(0.0);
  const [destinations, setDestinations] = useState(0);
  const [distance, setDistance] = useState(4);
  const [booked, setBooked] = useState(false);
  const [boos, setBoos] = useState(false);
  const [isPick, setPick] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [isAccept, setAccept] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isDs, setDs] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState(null);
  const [isCancel, setCancell] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    axios.get(`/fees`).then((response) => {
      const feesData = response.data.data;
      setMin(parseFloat(feesData[0].name).toFixed(2));
    });
  }, []);
  const onRefresh = async () => {
    const res = await axios.get(`/booking/pickup/${props.booksID.passengerID}`);
    let results = res.data.data;

    if (results && results.status === 1) {
      setAccept(true);
      setDs(true);
    } else if (results && results.status === 2) {
      setRejected(true);
    } else if (results && results.status === 4) {
      setPick(true);
    } else if (results && results.status === 0) {
      setBoos(true);
    } else if (results && results.status === 5) {
      setDone(true);
    }
  };
  const onEnd = async () => {
    await axios.put(`/booking/end/${props.booksID.driverID}`, {
      passengerID: props.booksID.passengerID,
    });
  };
  useEffect(() => {
    axios.get(`/drivers/${props.booksID.driverID}`).then((response) => {
      setDriverData(response.data.data);
    });
  }, []);
  useEffect(() => {
    axios.get(`/passengers/${props.booksID.passengerID}`).then((response) => {
      setPassengerData(response.data.data);
      Geocoder.init(GOOGLE_MAPS_APIKEY);
      Geocoder.from(response.data.data.latitude, response.data.data.longitude)
        .then((json) => {
          const { formatted_address, place_id, geometry } = json.results[0];
          setCurrentAddress(formatted_address);
        })
        .catch((error) => console.warn(error));
    });
  }, []);

  const getMarker = (data, details) => {
    if (numPass > 3) {
      setErrorMsg("Hanggang tatlo lang pasahero");
    } else {
      setErrorMsg("");
      setPlaces(data.description);
      const dis = getDistance(
        {
          latitude: passengerData.latitude,
          longitude: passengerData.longitude,
        },
        {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        }
      );
      setDestinations({
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      });
      let dstn = dis / 1000;

      const fees =
        Math.round(parseFloat(dstn - 4) * 1 + parseFloat(minimum), 2) * numPass;
      setDistance(dis / 1000);
      setFee(fees);
      if (
        JSON.parse(passengerData.details).passengerType.toLowerCase() !== "none"
      ) {
        const disc = fees - fees * 0.1;
        setDiscount(disc);
      } else {
        setDiscount(0);
      }
    }
  };

  const onBookDriver = async () => {
    setLoading(true);
    const payload = {
      passengerID: props.booksID.passengerID,
      driverID: props.booksID.driverID,
      fee: fee.toString(),
      origin: {
        lat: passengerData.latitude,
        long: passengerData.longitude,
      },
      destination: {
        lat: destinations.latitude,
        long: destinations.longitude,
      },
      distance: distance,
      passNum: numPass,
    };
    try {
      const res = await axios.post("/booking", payload);
      setResult(res.data.data);
      setBooked(true);
      setCancell(false);
      props.setRatesD(props.booksID.driverID);
    } catch (error) {
      if (error) {
        console.log(
          "🚀 ~ file: Booking.js:159 ~ onBookDriver ~ error",
          error.response
        );
        if (destinations === 0) {
          setErrorMsg("Ang destinasyon hindi maaring wala sa pag book!");
        }
      }
    }
  };
  const onBookCancel = async () => {
    if (booked) {
      try {
        await axios.put(`/booking/cancell/${props.booksID.driverID}`, {
          passengerID: props.booksID.passengerID,
        });
        props.setBookeds(false);
        props.setDrivers([]);
        props.setEndTxt("Find Driver");
        setDone(false);
      } catch (error) {
        console.log(
          "🚀 ~ file: Booking.js ~ line 108 ~ onBookCancel ~ error",
          error
        );
      }
    } else {
      props.setBookeds(false);
      props.setDrivers([]);
      props.setEndTxt("Find Driver");
      setDone(false);
    }
  };
  const indexPage = (
    <Stack fill>
      <VStack
        fill
        style={{
          width: screenWidth - 50,
          minWidth: screenWidth - 50,
          height: 200,
          margin: 20,
        }}
      >
        <AcceptModal
          isAccept={isAccept}
          setAccept={setAccept}
          setCancell={setCancell}
          setBookeds={props.setBookeds}
          setEndTxt={props.setEndTxt}
          setDrivers={props.setDrivers}
          setDisFind={props.setDisFind}
          onGetCurrentPassenger={props.onGetCurrentPassenger}
        />
        <REject
          rejected={rejected}
          setRejected={setRejected}
          setCancell={setCancell}
          setBookeds={props.setBookeds}
          setEndTxt={props.setEndTxt}
          setDrivers={props.setDrivers}
          onEnd={onEnd}
        />
        <Notification
          isPick={isPick}
          setPicks={setPick}
          setCancell={setCancell}
          setBookeds={props.setBookeds}
          setEndTxt={props.setEndTxt}
          setDrivers={props.setDrivers}
          setDisFind={props.setDisFind}
          onGetCurrentPassenger={props.onGetCurrentPassenger}
        />
        <NotificationDone
          isDone={isDone}
          setDone={setDone}
          setBookeds={props.setBookeds}
          setEndTxt={props.setEndTxt}
          setDrivers={props.setDrivers}
          onEnd={onEnd}
          setRates={props.setRates}
        />
        <Flex fill>
          <HStack m={6} spacing={6}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={getMarker}
              query={{
                key: "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8",
                language: "en", // language of the results
                location: "13.906576702674702, 121.50914479403703",
                radius: "7000", //15 km
                strictbounds: true,
              }}
              //filterReverseGeocodingByTypes={["locality", "subpremise"]}
              enablePoweredByContainer={false}
              searchOptions={{ types: ["locality"] }}
              autoFocus={true}
              returnKeyType={"search"}
              fetchDetails={true}
              GooglePlacesDetailsQuery={{
                fields: "geometry",
              }}
              GooglePlacesSearchQuery={{
                rankby: "distance",
              }}
              style={{
                description: {
                  fontWeight: "bold",
                },
                predefinedPlacesDescription: {
                  color: "#FFFFF",
                },
                textInputContainer: {
                  backgroundColor: "rgba(0,0,0,0)",
                  width: screenWidth - 50,
                  borderWidth: 0,
                  margin: 5,
                  top: 23,
                  flex: 1,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  opacity: 0.5,
                },
                textInput: {
                  margin: 5,
                  color: "#5d5d5d",
                  fontSize: 16,
                  borderWidth: 0,
                },
                listView: {
                  backgroundColor: "rgba(192,192,192,0.9)",
                  top: 23,
                  flex: 1,
                  position: "absolute",
                  left: 0,
                  top: 0,
                  opacity: 0.5,
                },
              }}
              debounce={200}
            />
          </HStack>
          <View>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {errorMsg ? (
                <Text variant="subtitle1" style={styles.txtError}>
                  {errorMsg.charAt(0).toUpperCase() + errorMsg.slice(1)}
                </Text>
              ) : null}
              <VStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Bilang ng Pasahero:
                </Text>
                <TextInput
                  variant="outlined"
                  color="#132875"
                  onChangeText={(text) => setNumPass(text)}
                  style={{ width: 300 }}
                  keyboardType="numeric"
                ></TextInput>
              </VStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Pangalan:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {passengerData &&
                    `${passengerData.fname} ${passengerData.lname}`}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Kategorya:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {passengerData &&
                    `${JSON.parse(passengerData.details).passengerType}`}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Pangalan ng Drayber:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                ></Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {driverData && `${driverData.fname} ${driverData.lname}`}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Panggagalingan:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                    width: 250,
                  }}
                >
                  {myAddress}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Destinasyon:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                    width: 250,
                  }}
                >
                  {places}
                </Text>
              </HStack>

              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Distansya:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {`${distance} km`}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Pamasahe:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                  }}
                >
                  {`₱ ${parseFloat(fee)}`}
                </Text>
              </HStack>
              <HStack m={6} spacing={6}>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtBlue,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Discount:
                </Text>
                <Text
                  variant="subtitle1"
                  style={{
                    ...styles.txtGray,
                    textAlign: "left",
                    width: 250,
                  }}
                >
                  {`₱ ${parseFloat(discount)}`}
                </Text>
              </HStack>
              <Button
                title="MagBook"
                color="#FFFFFF"
                variant="outlined"
                style={{
                  ...styles.btnBlue,
                  width: screenWidth - 50,
                  marginTop: 10,
                }}
                loading={isLoading}
                disabled={isLoading}
                onPress={onBookDriver}
              />
              <Button
                title={booked ? "Kanselahin" : "Bumalik"}
                color="#FFFFFF"
                variant="outlined"
                onPress={onBookCancel}
                disabled={isDs}
                style={{
                  ...styles.btnGreen,
                  width: screenWidth - 50,
                  marginTop: 10,
                }}
              />
            </ScrollView>
          </View>
        </Flex>
      </VStack>
    </Stack>
  );
  return <View style={{ ...styles.textWrapper }}>{indexPage}</View>;
}
