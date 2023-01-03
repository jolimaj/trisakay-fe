import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet, Dimensions } from "react-native";
import { HStack } from "@react-native-material/core";

const screenWidth = Dimensions.get("window").width;

const LocationSearch = (props) => {
  const getMarker = (data, details) => {
    props.markers(data.description);
    const des = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    };
    props.destinations(des);
    props.calculateDistance();
  };
  return (
    <HStack>
      <GooglePlacesAutocomplete
        placeholder="Pupuntahan"
        onPress={getMarker}
        query={{
          key: "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8",
          language: "en",
        }}
        enablePoweredByContainer={false}
        autoFocus={true}
        returnKeyType={"search"}
        fetchDetails={true}
        GooglePlacesDetailsQuery={{
          fields: "geometry",
        }}
        GooglePlacesSearchQuery={{
          rankby: "distance",
        }}
        style={styles.searchbar}
        debounce={200}
      />
    </HStack>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    description: {
      fontWeight: "bold",
    },
    predefinedPlacesDescription: {
      color: "#FFFFF",
    },
    textInputContainer: {
      backgroundColor: "rgba(0,0,0,0)",
      top: 100,
      width: screenWidth - 50,
      borderWidth: 0,
      margin: 5,
    },
    textInput: {
      margin: 5,
      height: 38,
      color: "#5d5d5d",
      fontSize: 16,
      borderWidth: 0,
    },
    listView: {
      backgroundColor: "rgba(192,192,192,0.9)",
      top: 23,
    },
  },
});

export default LocationSearch;
