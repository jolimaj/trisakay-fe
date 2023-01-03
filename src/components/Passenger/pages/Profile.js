import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import {
  Text,
  HStack,
  TextInput,
  Flex,
  VStack,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import styles from "../../Stylesheet";
import { Avatar } from "@rneui/themed";
import UpdateProfile from "./UpdateProfile";
import axios from "../../../config/axios";
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function Profile(props) {
  const [pages, setPages] = useState("list");
  const [data, setData] = useState(null);
  const [isUpdate, setisUpdate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const userData = isUpdate ? data : props.value;
  useEffect(() => {
    axios.get(`/${props.value.id}`).then((response) => {
      setData(response.data.data);
    });
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() =>
      axios.get(`/${props.value.id}`).then((response) => {
        setData(response.data.data);
        setRefreshing(false);
      })
    );
  }, []);

  let statusAccounts;
  if (userData && userData.status === 1) {
    statusAccounts = "Active";
  } else if (userData.status === 2) {
    statusAccounts = "Pending Account";
  } else {
    statusAccounts = "Not Active";
  }

  async function editProfile() {
    setPages("edit");
  }
  const indexPage = (
    <>
      {pages === "list" ? (
        <Flex fill style={{ marginVertical: 20, marginHorizontal: 10 }}>
          {
            <ScrollView
              style={styles.scrollView}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <VStack fill mt={20}>
                <Flex fill center>
                  <Avatar
                    size={150}
                    rounded
                    source={{ uri: userData.profile }}
                    title="Bj"
                    containerStyle={{ backgroundColor: "grey" }}
                  >
                    <Avatar.Accessory size={50} onPress={editProfile} />
                  </Avatar>
                </Flex>
                <Flex fill center mt={10}>
                  <Text
                    variant="h5"
                    style={{
                      ...styles.txtBlue,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >{`${userData.fname} ${userData.lname}`}</Text>
                  <Text
                    variant="h6"
                    style={{
                      ...styles.txtGray,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Passenger
                  </Text>
                  <Text
                    variant="subtitle1"
                    style={{
                      ...styles.txtGreen,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {statusAccounts}
                  </Text>
                </Flex>
                <Flex fill mt={10}>
                  <HStack m={6} spacing={6}>
                    <Icon name="email" size={30} color="#132875" />{" "}
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtGray,
                        textAlign: "left",
                      }}
                    >
                      {userData.email}
                    </Text>
                  </HStack>
                  <HStack m={6} spacing={6}>
                    <Icon name="cellphone" size={30} color="#132875" />{" "}
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtGray,
                        textAlign: "left",
                      }}
                    >
                      {userData.mobile}
                    </Text>
                  </HStack>
                  <HStack m={6} spacing={6}>
                    <Icon name="home-city" size={30} color="#132875" />{" "}
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtGray,
                        textAlign: "left",
                      }}
                    >
                      {JSON.parse(userData.details).address}
                    </Text>
                  </HStack>
                </Flex>
              </VStack>
            </ScrollView>
          }
        </Flex>
      ) : (
        <UpdateProfile
          userData={userData}
          setPages={setPages}
          reloads={onRefresh}
          setisUpdate={setisUpdate}
        />
      )}
    </>
  );

  return <View style={{ ...styles.textWrapper }}>{indexPage}</View>;
}
