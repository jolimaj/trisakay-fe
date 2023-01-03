import React, { useState, useEffect } from "react";
import { View } from "react-native";
import NavBar from "./NavBar";
import Drawers from "./Drawers";
import styles from "../Stylesheet";
const Dashboard = () => {
  const [revealed, setRevealed] = useState(false);
  const handleMenu = () => {
    setRevealed(!revealed);
  };

  return (
    <View style={styles.textWrapper}>
      <NavBar openDashboard={handleMenu} value={revealed} />
      {revealed ? <Drawers style={{ position: "absolute" }} /> : null}
    </View>
  );
};
export default Dashboard;
