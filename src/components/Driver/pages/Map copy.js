import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
// import Search from "./LocationSearch";
import axios from "../../../config/axios";

export default function Maps() {
  const [regionCoords, setRegion] = useState({
    latitude: 13.906576702674702,
    longitude: 121.50914479403703,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [marker, setMarker] = useState({
    latitude: 14.038762879501633,
    longitude: 121.58588043511148,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [places, setPlaces] = useState("");
  const getMarker = (data, details) => {
    setPlaces(data.description);
    // setRegion(details.geometry.location);
    // setMarker(details.geometry.location);
  };

  const [cars, setCars] = useState([]);
  console.log("🚀 ~ file: index.js ~ line 24 ~ Maps ~ cars", cars);
  useEffect(() => {
    setTimeout(() => {
      axios.get("/drivers").then((response) => {
        setCars(response.data.data);
      });
      Geolocation.getCurrentPosition((pos) => {
        const crd = pos.coords;
        setRegion({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
        setMarker({
          latitude: crd.latitude,
          longitude: crd.longitude,
          latitudeDelta: 0.0421,
          longitudeDelta: 0.0421,
        });
      }).catch((err) => {
        console.log(err);
      });
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={regionCoords}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={regionCoords}
          showsUserLocation={true}
          image={require("../../../img/flag.png")}
        />
      </MapView>
      {/* <Search markers={getMarker} value={places} /> */}
    </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
