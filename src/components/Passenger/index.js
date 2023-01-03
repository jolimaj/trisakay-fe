import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, LogBox } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, Flex, Button } from "@react-native-material/core";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Maps from "./pages/Map";
import Profiles from "./pages/Profile";
import Home from "../index";
import History from "./pages/History";
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
function HomeMap({ navigation, route }) {
  return <Maps value={route.params.value} />;
}
function Profile({ navigation, route }) {
  return <Profiles value={route.params.value} />;
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}
function Historys({ navigation, route }) {
  return <History value={route.params.value} />;
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
      <Flex center p={30}>
        <Avatar image={{ uri: props.value.value.profile }} />
      </Flex>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          onPress={() => {
            props.propss.navigation.navigate("Home");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="home" />
          )}
        />
        <DrawerItem
          label="Aking Profile"
          onPress={() => {
            props.propss.navigation.navigate("Aking Profile");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="account" />
          )}
        />
        <DrawerItem
          label="History"
          onPress={() => {
            props.propss.navigation.navigate("History");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="history" />
          )}
        />
        {/* <DrawerItem
          label="Mga Mensahe"
          onPress={() => {
            props.propss.navigation.navigate("Notipikasyon");
          }}
          icon={({ focused, color, size }) => (
            <Icon color="#132875" size={size} name="chat" />
          )}
        /> */}
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

function MyDrawer(prop) {
  return (
    <Drawer.Navigator
      screenOptions={{ headerTintColor: "#132875" }}
      useLegacyImplementation
      drawerContent={(props) => (
        <CustomDrawerContent propss={props} value={prop} />
      )}
    >
      <Drawer.Screen
        name="Home"
        component={HomeMap}
        initialParams={prop}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Aking Profile"
        component={Profile}
        initialParams={prop}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="History"
        component={Historys}
        initialParams={prop}
        options={{
          headerTitle: "",
        }}
      />
      <Drawer.Screen
        name="Notipikasyon"
        component={Notifications}
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

export default function Passengers(props) {
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
