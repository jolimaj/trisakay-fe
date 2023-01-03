import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Arial",
  },
  textWrapper: {
    height: hp("100%"),
    width: wp("100%"),
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#132875",
  },
  btnTxt: {
    color: "#132875",
    fontWeight: "bold",
  },
  linkTxt: {
    paddingTop: 20,
  },
  btnForm: {
    color: "#132875",
    fontWeight: "bold",
    backgroundColor: "white",
    textTransform: "uppercase",
    margin: 10,
    padding: 2,
  },
  button: {
    backgroundColor: "#132875",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  bg: {
    backgroundColor: "#132875",
  },
  icon: {
    color: "white",
  },
  inputs: {
    fontStyle: "italic",
    margin: 10,
    fontFamily: "Arial",
    color: "#132875",
  },
  scrollView: {
    marginHorizontal: 5,
    fontFamily: "Arial",
  },
  //Terms
  titleh5: {
    fontWeight: "bold",
    color: "#132875",
    lineHeight: 30,
  },
  subnumber: {
    fontWeight: "bold",
    color: "#132875",
    lineHeight: 30,
  },
  description: {
    textAlign: "justify",
  },
});
