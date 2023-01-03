import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  Text,
  Image,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  AnimatedRegion,
  Polyline,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "../../../config/axios";
import DriverModal from "./DriverModal";
import DriverRate from "./DriverRate";
import MessageModal from "./MessageModal";
import Booking from "./Booking";
import { useNetInfo } from "@react-native-community/netinfo";
import Geolocation from "react-native-geolocation-service";
import { getDistance } from "geolib";
import Notification from "./Notification";
import NotificationDone from "./NotificationDone";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Maps = (props) => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [],
  });
  const [isEnd, setEnd] = useState(true);
  const [isEndTxt, setEndTxt] = useState("Find Driver");
  const [drivers, setDrivers] = useState([]);
  const [driversOrigin, setDriverOrigin] = useState(0);
  console.log("🚀 ~ file: Map.js:42 ~ Maps ~ driversOrigin", driversOrigin);
  const [driversDes, setDriverDes] = useState(0);
  console.log("🚀 ~ file: Map.js:44 ~ Maps ~ driversDes", driversDes);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [visible2, setVisible2] = useState(false);
  const [visibleMessage, setMessageModal] = useState(false);
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [directions, setDirections] = useState(null);
  const [booked, setBooked] = useState(false);
  const [books, setBooks] = useState(false);
  const GOOGLE_MAPS_APIKEY = "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8";
  const netInfo = useNetInfo();
  const [feesData, setFees] = useState("0");
  const [disFind, setDisFind] = useState(false);
  const [rates, setRates] = useState(false);
  const [ratesD, setRatesD] = useState("");
  const [isPick, setPick] = useState(false);
  const [isDone, setDone] = useState(false);
  const [userStatus, setUserstatus] = useState(0);
  const [markerAnimate, setMarkerAnimate] = useState({
    latitude: 0,
    longitude: 0,
  });
  const { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const onPickup = useCallback(() => {
    wait(2000).then(() =>
      axios.get(`/booking/myCurrent/${selectedDriver.id}`).then((response) => {
        const res = response.data.data;
        setUserstatus(res.status);
        setPick(true);
      })
    );
  }, []);

  const onDone = useCallback(() => {
    wait(2000).then(() =>
      axios.get(`/booking/myCurrent/${selectedDriver.id}`).then((response) => {
        const res = response.data.data;
        setUserstatus(res.status);
        setDone(true);
      })
    );
  }, []);

  // useEffect(() => {
  //   if (driversDes < 1 && userStatus === 4) {
  //     onDone();
  //   }
  // }, []);
  function getMyStatus() {
    console.log("🚀 ~ file: Map.js:104 ~ getMyStatus ~ getMyStatus");
    if (selectedDriver) {
      axios.get(`/booking/myCurrent/${selectedDriver.id}`).then((response) => {
        const res = response.data.data;
        setUserstatus(res.status);
        console.log(
          "🚀 ~ file: Map.js:114 ~ axios.get ~ driversDes !== null",
          driversDes !== null,
          driversDes < 1,
          userStatus === 5
        );
        if (driversOrigin !== null && driversOrigin < 1 && userStatus === 4) {
          setPick(true);
        } else if (driversDes !== null && userStatus === 5) {
          setDone(true);
        }
      });
    }
  }
  // useEffect(() => {
  //   if (driversOrigin < 1 && userStatus === 1) {
  //     onPickup();
  //   }
  // }, []);
  useEffect(() => {
    axios.get(`/fees`).then((response) => {
      setFees(response.data.data);
    });
  }, []);
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
        setMarkerAnimate(
          new AnimatedRegion({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          })
        );
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
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setMarkerAnimate(
          new AnimatedRegion({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          })
        );
        onUserLocationChange(pos.coords);
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

  const onUserLocationChange = async (event) => {
    const { latitude, longitude } = event;
    try {
      const input = {
        latitude,
        longitude,
      };
      setMarkerAnimate(
        new AnimatedRegion({
          latitude: input.latitude,
          longitude: input.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        })
      );
      setPosition({ latitude: input.latitude, longitude: input.longitude });
      await axios.put(`/passengers/${props.value.id}`, {
        latitude: input.latitude,
        longitude: input.longitude,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onBookDriver = (data) => {
    setVisible2(true);
    setSelectedDriver(data);
  };

  const onGetDrivers = async () => {
    if (netInfo.isConnected) {
      const value = await axios.put(`/passengers/status/${props.value.id}`);
      setEnd(value.data.data.isOnline);
      if (isEnd) {
        setEndTxt("End Now");
        axios.get("/drivers").then((response) => {
          setDrivers(response.data.data);
          if (response.data.data.length === 0) {
            setMessageModal(true);
          }
        });
      } else {
        setDrivers([]);
        setEndTxt("Find Driver");
      }
    }
  };
  const onGetCurrentPassenger = async () => {
    axios.get(`/booking/myCurrent/${selectedDriver.id}`).then((response) => {
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
      axios.get(`/drivers/${selectedDriver.id}`).then((response) => {
        const dri = response.data.data;
        const driverOrigin = getDistance(
          {
            latitude: dri.latitude,
            longitude: dri.longitude,
          },
          {
            latitude: bookedCar.originLatitude,
            longitude: bookedCar.originLongitude,
          }
        );
        setDriverOrigin(driverOrigin / 1000);
        const driverDs = getDistance(
          {
            latitude: dri.latitude,
            longitude: dri.longitude,
          },
          {
            latitude: bookedCar.destLatitude,
            longitude: bookedCar.destLongitude,
          }
        );
        setDriverDes(driverDs / 1000);
      });
    });
  };

  return (
    <View>
      {booked && true && (
        <Booking
          booksID={books}
          setBookeds={setBooked}
          setEndTxt={setEndTxt}
          setDrivers={setDrivers}
          setDisFind={setDisFind}
          onGetCurrentPassenger={onGetCurrentPassenger}
          setRates={setRates}
          setRatesD={setRatesD}
        />
      )}
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
          onDoublePress={getMyStatus}
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
          {/* {order && (
            <Polyline
              coordinates={origin}
              strokeColor="#132875"
              strokeWidth={6}
            />
          )} */}

          {order && (
            <Marker
              coordinate={directions}
              showsUserLocation={true}
              image={require("../../../img/flag.png")}
            />
          )}
          {drivers.length > 0 &&
            order === null &&
            drivers.map((item) => (
              <Marker
                key={item.id}
                coordinate={{
                  longitude: parseFloat(item.longitude),
                  latitude: parseFloat(item.latitude),
                }}
                title={`${item.fname} ${item.lname}`}
                onPress={() => {
                  onBookDriver(item);
                }}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: "contain",
                  }}
                  source={require("../../../img/marker.png")}
                />
              </Marker>
            ))}
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

        <Pressable
          onPress={onGetDrivers}
          style={disFind ? styles.goDis : styles.goButton}
          disabled={disFind}
        >
          <Text style={styles.goText}>{isEndTxt}</Text>
        </Pressable>
      </View>

      {selectedDriver !== null && (
        <DriverModal
          visibles={visible2}
          setVisible={setVisible2}
          driverDetail={selectedDriver}
          passengerID={props.value.id}
          setBookeds={setBooked}
          setBookss={setBooks}
        />
      )}
      <DriverRate
        rates={rates}
        setRates={setRates}
        id={ratesD}
        setOrder={setOrder}
      />
      <MessageModal visibles={visibleMessage} setVisible={setMessageModal} />
      <Notification
        isPick={isPick}
        setPicks={setPick}
        setDriverOrigin={setDriverOrigin}
      />
      {userStatus === 5 && (
        <NotificationDone
          isDone={isDone}
          setDone={setDone}
          setDriverDes={setDriverDes}
          setDrivers={setDrivers}
          setEndTxt={setEndTxt}
          setRates={setRates}
          setDisFind={setDisFind}
          setBookeds={setBooked}
        />
      )}
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
    width: 75,
    height: 75,
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
