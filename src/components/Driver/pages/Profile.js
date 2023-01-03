import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Image } from "react-native";
import {
  Text,
  HStack,
  Flex,
  VStack,
  // Avatar,
} from "@react-native-material/core";
import styles from "../../Stylesheet";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Avatar } from "@rneui/themed";
import axios from "../../../config/axios";
import UpdateProfile from "./UpdateProfile";
import { Tab, Tile } from "@rneui/themed";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function Profile(props) {
  const [pages, setPages] = useState("list");
  const [data, setData] = useState(null);
  const [isUpdate, setisUpdate] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);

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

  async function editProfile() {
    setPages("edit");
  }
  let statusAccount;
  if (userData.status === 1) {
    statusAccount = "Active";
  } else if (userData.status === 2) {
    statusAccount = "Pending Account";
  } else {
    statusAccount = "Not Active";
  }
  const indexPage = (
    <>
      {pages === "list" ? (
        <Flex fill style={{ marginVertical: 20, marginHorizontal: 10 }}>
          <ScrollView style={styles.scrollView}>
            <View style={{ paddingBottom: 150 }}>
              <VStack fill marginVertical={20}>
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
                    Drayber
                  </Text>
                  <Text
                    variant="subtitle1"
                    style={{
                      ...styles.txtGreen,
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {statusAccount}
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
                  <HStack m={6} spacing={6}>
                    <Icon name="account-details" size={30} color="#132875" />{" "}
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtGray,
                        textAlign: "left",
                      }}
                    >
                      {JSON.parse(userData.details).driver.toda_name}
                    </Text>
                  </HStack>
                  <HStack m={6} spacing={6}>
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtBlue,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        textAlign: "left",
                      }}
                    >
                      No. ng Plaka:
                    </Text>
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtGray,
                        textAlign: "left",
                      }}
                    >
                      {JSON.parse(userData.details).driver.p_motor}
                    </Text>
                  </HStack>
                  <HStack m={6} spacing={6}>
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtBlue,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        textAlign: "left",
                      }}
                    >
                      No. ng Traysikel:
                    </Text>
                    <Text
                      variant="h6"
                      style={{
                        ...styles.txtGray,
                        textAlign: "left",
                      }}
                    >
                      {JSON.parse(userData.details).driver.tric_num}
                    </Text>
                  </HStack>
                </Flex>
                <View style={{ alignItems: "center" }}>
                  <ScrollView style={{ paddingVertical: 10 }}>
                    <Tile
                      imageSrc={{
                        uri: JSON.parse(userData.details).driver.licence_pic,
                      }}
                      title="Larawan ng Lisensya"
                      titleStyle={{
                        ...styles.txtBlue,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                      featured
                      activeOpacity={1}
                      width={310}
                    />
                  </ScrollView>
                </View>
                <View style={{ alignItems: "center" }}>
                  <ScrollView style={{ paddingVertical: 10 }}>
                    <Tile
                      imageSrc={{
                        uri: JSON.parse(userData.details).driver.franchise_pic,
                      }}
                      title="Larawan ng Prangkisa"
                      titleStyle={{
                        ...styles.txtBlue,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                      featured
                      activeOpacity={1}
                      width={310}
                    />
                  </ScrollView>
                </View>
                <View style={{ alignItems: "center" }}>
                  <ScrollView style={{ paddingVertical: 10 }}>
                    <Tile
                      imageSrc={{
                        uri: JSON.parse(userData.details).driver
                          .registration_pic,
                      }}
                      title="Larawan ng Rehistro ng Motor"
                      titleStyle={{
                        ...styles.txtBlue,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                      featured
                      activeOpacity={1}
                      width={310}
                    />
                  </ScrollView>
                </View>
                <View style={{ alignItems: "center" }}>
                  <ScrollView style={{ paddingVertical: 10 }}>
                    <Tile
                      imageSrc={{
                        uri: JSON.parse(userData.details).driver.tric_pic,
                      }}
                      title="Larawan ng Traysikel"
                      titleStyle={{
                        ...styles.txtBlue,
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                      featured
                      activeOpacity={1}
                      width={310}
                    />
                  </ScrollView>
                </View>
              </VStack>
            </View>
          </ScrollView>
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
