import * as React from "react";
import { Image, View, SafeAreaView, LogBox } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";
import { Flex, Button } from "@react-native-material/core";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Users from "./pages/Users";
import TODA from "./pages/TODA";
import Terms from "./pages/Condition";
import Home from "../index";
import Fees from "./pages/Fees";
import RatesList from "./pages/RatesList";
import { useState } from "react";
import axios from "../../config/axios";
import LogoutModal from "./pages/LogoutModal";
import Supp from "./pages/Support";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#132875",
  },
};

function UsersList({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Users">
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          title: "Mga User", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function TODAList({ props }) {
  return (
    <Stack.Navigator initialRouteName="TODA">
      <Stack.Screen
        name="TODA"
        component={TODA}
        options={{
          title: "Mga TODA", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function Kondisyon() {
  return (
    <Stack.Navigator initialRouteName="TODA">
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          title: "Mga Kondisyon", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function Rate() {
  return (
    <Stack.Navigator initialRouteName="Rating">
      <Stack.Screen
        name="Ratings"
        component={RatesList}
        options={{
          title: "MGA RATINGS AT KOMENTO", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function Fee() {
  return (
    <Stack.Navigator initialRouteName="Fees">
      <Stack.Screen
        name="Fees"
        component={Fees}
        options={{
          title: "Pamasahe", //Set Header Title
          headerTintColor: "#132875", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
            textTransform: "uppercase",
          },
        }}
      />
    </Stack.Navigator>
  );
}
function Supports() {
  return <Supp />;
}
function Logout({ navigation, route }) {
  const [isLogout, setLogout] = useState(true);
  return (
    <LogoutModal
      value={route.params.value}
      setPages={route.params.setPages}
      setLogout={setLogout}
      isLogout={isLogout}
      navigation={navigation}
    />
  );
}
function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Flex center>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../../img/logo.png")}
        />
      </Flex>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Mga User"
          onPress={() => {
            props.propss.navigation.navigate("Mga User");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="account-group" />
          )}
        />
        <DrawerItem
          label="Listahan ng TODA"
          onPress={() => {
            props.propss.navigation.navigate("Listahan ng TODA");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="format-list-bulleted" />
          )}
        />
        <DrawerItem
          label="Mga Kondisyon"
          onPress={() => {
            props.propss.navigation.navigate("Mga Kondisyon");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="format-list-checks" />
          )}
        />
        <DrawerItem
          label="Pamasahe"
          onPress={() => {
            props.propss.navigation.navigate("Pamasahe");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="hand-coin" />
          )}
        />
        <DrawerItem
          label="Mga Rating"
          onPress={() => {
            props.propss.navigation.navigate("Rating");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="account-star" />
          )}
        />
        <DrawerItem
          label="Support"
          onPress={() => {
            props.propss.navigation.navigate("Support");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="comment-question" />
          )}
        />
        <DrawerItem
          label="MagLogout"
          onPress={() => {
            props.propss.navigation.navigate("Maglogout");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="logout" />
          )}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function MyDrawer(prop) {
  return (
    <Drawer.Navigator
      screenOptions={{ headerTintColor: "#132875" }}
      useLegacyImplementation
      drawerContent={(props) => (
        <CustomDrawerContent propss={props} arrowBack={prop.arrowBack} />
      )}
    >
      <Drawer.Screen
        name="Mga User"
        component={UsersList}
        options={{
          headerTitle: "",
        }}
        initialParams={{ itemId: 42 }}
      />
      <Drawer.Screen
        name="Listahan ng TODA"
        component={TODAList}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Mga Kondisyon"
        component={Kondisyon}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Pamasahe"
        component={Fee}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Rating"
        component={Rate}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Support"
        initialParams={prop}
        component={Supports}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Maglogout"
        component={Logout}
        initialParams={prop}
        options={{
          headerTitle: "",
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App(props) {
  const [pages, setPages] = useState("User");
  const data = props.value;
  return (
    <>
      {pages === "User" ? (
        <NavigationContainer theme={MyTheme} independent={true}>
          <MyDrawer
            value={data}
            arrowBack={props.arrowBack}
            setPages={setPages}
          />
        </NavigationContainer>
      ) : (
        <Home />
      )}
    </>
  );
}
