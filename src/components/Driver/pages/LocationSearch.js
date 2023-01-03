import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

const LocationSearch = (props) => {
  console.log(
    "🚀 ~ file: LocationSearch.js ~ line 7 ~ LocationSearch ~ props",
    props
  );
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={props.markers}
      query={{
        key: "AIzaSyBQ9MqRclkSV6qQ-yUXZC4qwElQJO5ovu8",
        language: "en",
        types: "geocode",
      }}
      enablePoweredByContainer={false}
      fetchDetails={true}
      GooglePlacesDetailsQuery={{
        fields: "geometry",
      }}
      GooglePlacesSearchQuery={{
        rankby: "distance",
        types: "tricycle",
      }}
      style={styles.searchbar}
    />
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
