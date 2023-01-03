import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

module.exports = StyleSheet.create({
  //otp
  otpView: {
    width: 50,
    fontSize: 30,
    color: "#132875",
    borderColor: "#132875",
    textAlign: "center",
  },

  //primary
  container: {
    flex: 1,
    fontFamily: "Arial",
  },
  logos: {
    width: "75%",
    height: "75%",
  },

  btnGreen: {
    paddingVertical: 2,
    textTransform: "uppercase",
    color: "#000000",
    //color: "#FFFFFF",
    backgroundColor: "#8bd8bd",
    width: 300,
  },
  btnBlue: {
    paddingVertical: 2,
    textTransform: "uppercase",
    color: "#FFFFFF",
    backgroundColor: "#132875",
    width: 300,
  },
  btnWhite: {
    padding: 5,
    textTransform: "uppercase",
    backgroundColor: "#FFFFFF",
    color: "#132875",
    fontWeight: "bold",
    width: 300,
  },
  txtGreen: {
    color: "#8bd8bd",
    textAlign: "center",
  },
  txtBlue: {
    color: "#132875",
    textAlign: "center",
  },
  txtGray: {
    color: "#363636",
    textAlign: "center",
  },
  txtBlack: {
    color: "#0A0A0A",
    textAlign: "center",
  },
  txtWhite: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  txtError: {
    color: "red",
    textAlign: "center",
    margin: 10,
    fontWeight: "bold",
  },
  bgBlue: {
    backgroundColor: "#132875",
  },
  txtInput: {
    // borderRadius: 25,
    fontStyle: "italic",
    fontWeight: "bold",
    marginVertical: 15,
    color: "#132875",
    borderColor: "#132875",
    height: 35,
    width: 300,
  },
  //register as
  role: {
    width: "80%",
    height: "100%",
  },
  backgroundPanel: {
    margin: 10,
    padding: 20,
    width: 300,
    height: 250,
    borderRadius: 24,
  },
  textWrapper: {
    height: hp("100%"),
    width: wp("100%"),
  },
  logo: {
    width: 200,
    height: 200,
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
    padding: 10,
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
    marginVertical: 30,
    fontFamily: "Arial",
    color: "#132875",
    height: 35,
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    // backgroundColor: "white",
    // borderColor: "#132875",
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
  errors: {
    color: "red",
    textAlign: "center",
  },
});
