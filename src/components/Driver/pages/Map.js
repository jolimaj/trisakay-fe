import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Dimensions, Pressable, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "../../../config/axios";
import PassengerModal from "./PassengerModal";
import MessageModal from "./MessageModal";
import Notification from "./Notification";
import DOneNotif from "./Done";
import { useNetInfo } from "@react-native-community/netinfo";
import Geolocation from "react-native-geolocation-service";
import { getDistance } from "geolib";
import { FAB } from "@rneui/themed";
import ChatModal from "./Chat";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Maps = (props) => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });
  const [passenger, setPassenger] = useState(null);
  const [isEnd, setEnd] = useState(null);
  const [isEndTxt, setEndTxt] = useState("Find Passenger");
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [directions, setDirections] = useState(null);
  const [curr, setCurr] = useState(null);
  const [disFind, setDisFind] = useState(false);
  const GOOGLE_MAPS_APIKEY = "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8";
  const [visible2, setVisible2] = useState(false);
  const [dones, setDone] = useState(false);
  const [pick, setPick] = useState(false);
  const [visibleMessage, setMessageModal] = useState(false);
  const [feesData, setFees] = useState("0");
  const [disOrg, setDisorg] = useState(1);
  const [disDes, setDes] = useState(1);
  const [userStatus, setUserstatus] = useState(0);
  const netInfo = useNetInfo();
  const [mess, setMess] = useState(true);
  const [openChat, setOpenChat] = useState(false);

  useEffect(() => {
    getNetworkStatus();
  }, []);
  useEffect(() => {
    axios.get(`/fees`).then((response) => {
      setFees(response.data.data);
    });
  }, []);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          coordinates: position.coordinates.concat({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        });
      },
      (error) => {
        console.log("🚀 ~ file: Map.js ~ line 81 ~ useEffect ~ error", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }, []);
  const chatMe = () => {
    setOpenChat(true);
  };
  useEffect(() => {
    Geolocation.watchPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          coordinates: position.coordinates.concat({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }),
        });
      },
      (error) => {
        console.log("🚀 ~ file: Map.js ~ line 81 ~ useEffect ~ error", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      }
    );
  }, []);
  const getNetworkStatus = async () => {
    if (netInfo.isConnected) {
      axios.put(`/drivers/status/${props.value.id}`).then((response) => {
        setEnd(response.data.data.isOnline);
      });

      axios.get(`/booking/currentDriver/${props.value.id}`).then((response) => {
        if (response.data.data === null) {
          setMessageModal(true);
        } else {
          setPassenger(response.data.data);
          setVisible2(true);
        }
      });
    }
  };

  const onPickup = useCallback(() => {
    wait(2000).then(() =>
      axios.get(`/booking/myCurrent/${props.value.id}`).then((response) => {
        const res = response.data.data;
        setUserstatus(res.status);
        setPick(true);
        setCurr(res);
      })
    );
  }, []);
  const onDone = useCallback(() => {
    wait(2000).then(() =>
      axios.get(`/booking/myCurrent/${props.value.id}`).then((response) => {
        const res = response.data.data;
        setUserstatus(res.status);
        setDone(true);
        setCurr(res);
      })
    );
  }, []);
  const onUserLocationChange = async (event) => {
    const { latitude, longitude, heading } = event.nativeEvent.coordinate;

    const input = {
      latitude,
      longitude,
    };
    onStartRide(input);
    try {
      await axios.put(`/drivers/${props.value.id}`, {
        latitude: input.latitude,
        longitude: input.longitude,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onGetCurrentPassenger = async () => {
    axios.get(`/booking/myCurrent/${props.value.id}`).then((response) => {
      const result = response.data.data;
      setUserstatus(result.status);
      const bookedCar = {
        destLatitude: JSON.parse(result.booking_details).destination.lat,
        destLongitude: JSON.parse(result.booking_details).destination.long,
        originLatitude: JSON.parse(result.booking_details).origin.lat,
        originLongitude: JSON.parse(result.booking_details).origin.long,
      };
      setDirections({
        latitude: bookedCar.destLatitude,
        longitude: bookedCar.destLongitude,
      });
      setOrigin({
        latitude: parseFloat(bookedCar.originLatitude),
        longitude: parseFloat(bookedCar.originLongitude),
      });
      setOrder(bookedCar);
      setDisFind(true);
    });
  };

  const onStartRide = (crd) => {
    if (order) {
      const dis1 = getDistance(
        {
          latitude: crd.latitude,
          longitude: crd.longitude,
        },
        {
          latitude: order.originLatitude,
          longitude: order.originLongitude,
        }
      );

      setDisorg(dis1 / 1000);

      if (disOrg < 1 && userStatus === 1) {
        onPickup();
      }
      const dis2 = getDistance(
        {
          latitude: crd.latitude,
          longitude: crd.longitude,
        },
        {
          latitude: order.destLatitude,
          longitude: order.destLongitude,
        }
      );
      setDes(dis2 / 1000);
      if (disDes < 1 && userStatus === 4) {
        onDone();
      }
    }
  };

  return (
    <View>
      <MapView
        style={{ width: "100%", height: Dimensions.get("window").height }}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        apikey={GOOGLE_MAPS_APIKEY}
        onDoublePress={getNetworkStatus}
        onUserLocationChange={onUserLocationChange}
      >
        {order && (
          <MapViewDirections
            origin={origin}
            destination={directions}
            strokeWidth={5}
            strokeColor="#132875"
            apikey={GOOGLE_MAPS_APIKEY}
          />
        )}
        {order && (
          <Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            image={require("../../../img/marker.png")}
          />
        )}
        {order && (
          <Marker
            coordinate={directions}
            showsUserLocation={true}
            image={require("../../../img/flag.png")}
          />
        )}
      </MapView>
      <Pressable
        onPress={() => console.warn("Balance")}
        style={styles.balanceButton}
      >
        <Text style={styles.balanceText}>
          <Text style={styles.balanceText}>₱</Text>{" "}
          {`${parseFloat(feesData[0].name).toFixed(2)} per 4 km`}
        </Text>
      </Pressable>

      {/* <Pressable
        onPress={onGetPassenger}
        style={disFind ? styles.goDis : styles.goButton}
        disabled={disFind}
      >
        <Text style={styles.goText}>{isEndTxt}</Text>
      </Pressable> */}

      {passenger !== null && (
        <PassengerModal
          visibles={visible2}
          setVisible={setVisible2}
          passengerDetail={passenger}
          setPassenger={setPassenger}
          setEnd={setEnd}
          setEndTxt={setEndTxt}
          onGetCurrentPassenger={onGetCurrentPassenger}
        />
      )}
      {order === null && (
        <MessageModal visibles={visibleMessage} setVisible={setMessageModal} />
      )}
      {disOrg !== null && userStatus === 1 && (
        <Notification
          pick={pick}
          setPick={setPick}
          passenger={curr}
          passengerDetail={passenger}
          setDisorg={setDisorg}
        />
      )}
      {userStatus > 0 && disDes !== null && (
        <DOneNotif
          dones={dones}
          setDone={setDone}
          passenger={curr}
          setDisFind={setDisFind}
          setOrder={setOrder}
          setUserstatus={setUserstatus}
          setDes={setDes}
          passengerDetail={passenger}
        />
      )}
      <FAB
        visible={mess}
        upperCase
        icon={{ name: "email", color: "white" }}
        style={{
          position: "absolute",
          bottom: 110,
          left: Dimensions.get("window").width / 50,
          width: 650,
          height: 20,
        }}
        onPress={chatMe}
      />
      <ChatModal
        openChat={openChat}
        setOpenChat={setOpenChat}
        data={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomText: {
    fontSize: 22,
    color: "#4a4a4a",
  },
  roundButton: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
  },
  goButton: {
    position: "absolute",
    backgroundColor: "#132875",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 110,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goDis: {
    position: "absolute",
    backgroundColor: "gray",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    bottom: 110,
    left: Dimensions.get("window").width / 2 - 37,
  },
  goText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  balanceButton: {
    position: "absolute",
    backgroundColor: "#1c1c1c",
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    top: 10,
    left: Dimensions.get("window").width / 2 - 100,
  },
  balanceText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default Maps;
