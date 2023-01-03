import React, { useEffect, useState } from "react";
import { Avatar } from "@rneui/base";
import { View, ScrollView } from "react-native";
import axios from "../../../config/axios";
import { ListItem, Flex, VStack, Text } from "@react-native-material/core";
import styles from "../../Stylesheet";

export default (props) => {
  const [historys, setHistorys] = useState([]);
  useEffect(() => {
    axios
      .get(`/booking/history/passenger/${props.value.id}`)
      .then((response) => {
        setHistorys(response.data.data);
      });
  }, []);
  const getStatus = (status) => {
    let res;
    switch (status) {
      case 0:
        res = "Nabooked";
        break;
      case 1:
        res = "Tinanggap";
        break;
      case 2:
        res = "Nireject";
        break;
      case 3:
        res = "Kanselado";
        break;
      case 4:
        res = "Pinickup";
        break;
      case 5:
        res = "Nahatid";
        break;
      default:
        break;
    }
    return res;
  };
  return (
    <Flex fill style={{ marginVertical: 20, marginHorizontal: 10 }}>
      <ScrollView style={styles.scrollView}>
        <VStack fill>
          <Text
            variant="h5"
            style={{
              ...styles.txtBlue,
              fontWeight: "bold",
              textTransform: "uppercase",
              paddingVertical: 10,
            }}
          >
            History
          </Text>
          {historys.length > 0 &&
            historys.map((item) => (
              <View key={item.id}>
                <ListItem
                  title={`${item.fname} ${item.lname}`}
                  secondaryText={`${new Date(item.date).getMonth()}-${new Date(
                    item.date
                  ).getDay()}-${new Date(
                    item.date
                  ).getFullYear()} | ${getStatus(item.status)}`}
                  leadingMode="avatar"
                  leading={
                    <Avatar
                      source={{
                        uri: item.profile,
                      }}
                    />
                  }
                />
              </View>
            ))}
        </VStack>
      </ScrollView>
    </Flex>
  );
};
