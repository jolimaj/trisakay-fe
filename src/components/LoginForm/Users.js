import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "../Stylesheet";
import Passenger from "../Passenger";
import Driver from "../Driver";
import Admin from "../Admin";
import TermsCondition from "../TermsCondition";
import axios from "../../config/axios";

export default function Users(props) {
  const usersData = props.isLog
    ? JSON.parse(props.value.value).data
    : props.value.data;
  const [termsAccept, setTermsAccept] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    axios.get(`/admin/terms/accepted/${usersData.id}`).then((response) => {
      setTermsAccept(response.data.data);
    });
  }, []);
  const MainPage = () => {
    if (termsAccept && termsAccept.accepted === false && visible === true) {
      return <TermsCondition value={usersData} setVisible={setVisible} />;
    } else {
      if (usersData.roleID === 1) {
        return <Admin value={usersData} />;
      } else if (usersData.roleID === 2) {
        return <Driver value={usersData} />;
      } else {
        return <Passenger value={usersData} />;
      }
    }
  };
  return (
    <View style={{ ...styles.textWrapper }}>
      <MainPage />
    </View>
  );
}
