import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import axios from "../../../config/axios";
import { Button, Text } from "@react-native-material/core";
const Maps = (props) => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setPosition({
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0421,
        longitudeDelta: 0.0421,
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    // <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={position}
      showsUserLocation={true}
      showsMyLocationButton={false}
      followsUserLocation={true}
      showsCompass={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
    >
      <Marker
        title="I'm Here"
        image={require("../../../img/marker.png")}
        coordinate={position}
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    //...StyleSheet.absoluteFillObject,
    //flex: 1,
    // justifyContent: "flex-end",
    // alignItems: "center",
  },
});

export default Maps;
