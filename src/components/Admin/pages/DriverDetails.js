import React, { useState } from "react";
import { StatusBar, View, ScrollView } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import {
  Text,
  HStack,
  Flex,
  VStack,
  Button,
} from "@react-native-material/core";
import styles from "../../Stylesheet";

export default function DriverDetails(props) {
  const userData = props.value;
  const [images, setImages] = useState([
    { name: "Larawan Lisensya", img: userData.licence_pic },
    { name: "franchise_pic", img: userData.franchise_pic },
    { name: "registration_pic", img: userData.registration_pic },
    { name: "tric_pic", img: userData.tric_pic },
  ]);
  async function handleCancel() {
    props.pageName(false);
    props.reloads();
  }
  return (
    <ScrollView style={styles.scrollView}>
      <VStack>
        <Flex fill center>
          <Text
            variant="h6"
            style={{
              ...styles.txtBlue,
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "left",
            }}
          >
            Driver Details
          </Text>
          <HStack m={6} spacing={6}>
            <Text
              variant="subtitle2"
              style={{
                ...styles.txtBlue,
                fontWeight: "bold",
                textTransform: "uppercase",
                textAlign: "left",
              }}
            >
              TODA:
            </Text>
            <Text
              variant="subtitle2"
              style={{
                ...styles.txtGray,
                textAlign: "left",
              }}
            >
              {userData.toda_name}
            </Text>
          </HStack>
          <HStack m={6} spacing={6}>
            <Text
              variant="subtitle2"
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
              variant="subtitle2"
              style={{
                ...styles.txtGray,
                textAlign: "left",
              }}
            >
              {userData.p_motor}
            </Text>
          </HStack>
          <HStack m={6} spacing={6} mb={20}>
            <Text
              variant="subtitle2"
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
              variant="subtitle2"
              style={{
                ...styles.txtGray,
                textAlign: "left",
              }}
            >
              {userData.tric_num}
            </Text>
          </HStack>
          <Text
            variant="h6"
            style={{
              ...styles.txtBlue,
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "left",
            }}
          >
            Mga Larawan ng Dokumento
          </Text>
          <Flex
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              flex: 1,
              marginBottom: 20,
            }}
          >
            <SliderBox
              images={images.map((item) => item.img)}
              sliderBoxHeight={300}
              dotColor="#132875"
              inactiveDotColor="#90A4AE"
              onCurrentImagePressed={(index) =>
                console.warn(`image ${index} pressed`)
              }
              paginationBoxVerticalPadding={20}
              ImageComponentStyle={{
                borderRadius: 15,
                width: "100%",
              }}
            />
            <StatusBar />
          </Flex>
          <Button
            title="BUMALIK"
            color="#FFFFFF"
            variant="outlined"
            style={{ ...styles.btnGreen }}
            onPress={handleCancel}
          />
        </Flex>
      </VStack>
    </ScrollView>
  );
}
