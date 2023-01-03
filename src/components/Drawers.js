// import React, { useState, useEffect } from "react";
// // import { Drawer } from "react-native-paper";

// const Drawers = () => {
//   const [active, setActive] = useState("");
//   const navs = [
//     { name: "Dashboard", icon: "monitor-dashboard" },
//     { name: "Users", icon: "account" },
//     { name: "TODA", icon: "format-list-group" },
//     { name: "Terms & Condition", icon: "file-sign" },
//   ];
//   return (
//     <Drawer.Section
//       title="John Doe"
//       style={{
//         width: "60%",
//         color: "white",
//         borderColor: "#132875",
//       }}
//     >
//       {navs.map((data, i) => (
//         <Drawer.Item
//           label={data.name}
//           icon={data.icon}
//           key={i}
//           active={active === i}
//           onPress={() => setActive(i)}
//         />
//       ))}
//     </Drawer.Section>
//   );
// };
// export default Drawers;

// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React
import React from "react";

// Import Navigators from React Navigation
// import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Import Screens
// import HomeScreen from "./DrawerScreens/HomeScreen";
import SettingsScreen from "./Login";
import CustomSidebarMenu from "./CustomSidebarMenu";
import NavigationDrawerHeader from "./NavBar";
import Login from "./Login";

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: "#cee1f2",
        color: "#cee1f2",
        itemStyle: { marginVertical: 5, color: "white" },
        labelStyle: {
          color: "#d8d8d8",
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={<CustomSidebarMenu />}
    >
      {/* <Drawer.Screen
        name="homeScreenStack"
        options={{ drawerLabel: "Home Screen" }}
        component={<Login />}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{ drawerLabel: "Setting Screen" }}
        component={<Login />}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
