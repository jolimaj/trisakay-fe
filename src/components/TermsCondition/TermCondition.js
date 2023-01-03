import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { Text, Stack, Flex, VStack, Button } from "@react-native-material/core";
import { CheckBox } from "@rneui/themed";
import styles from "../Stylesheet";
import Logo from "../../components/primary/Logo";
import axios from "../../config/axios";

export default function Terms(props) {
  const [rows, setRows] = useState([]);
  const [agree, setAgree] = useState(false);
  console.log("🚀 ~ file: TermCondition.js ~ line 12 ~ Terms ~ agree", agree);
  const [disAgree, setDisagree] = useState(false);

  useEffect(() => {
    axios.get("admin/terms").then((response) => {
      setRows(response.data.data);
    });
  }, []);

  async function submit() {
    try {
      if (agree === true) {
        await axios.put(`admin/terms/accepted/${props.usersData.value.id}`);
        props.usersData.setVisible(false);
      } else if (disAgree === true) {
        props.usersData.setVisible(false);
      }
    } catch (error) {
      if (error) {
        console.log(
          "🚀 ~ file: TermCondition.js ~ line 23 ~ submit ~ error",
          error
        );
      }
    }
  }

  const layout = (
    <Flex fill center mb={20}>
      <ScrollView style={styles.scrollView}>
        <VStack fill center>
          <Flex fill center style={{ width: 300, height: 200 }}>
            <Logo />
            <Text
              variant="h6"
              style={{ ...styles.txtBlue, fontWeight: "bold" }}
            >
              Terms & Conditions
            </Text>
          </Flex>
          <Flex fill center style={{ padding: 20 }}>
            {rows.map((data, i) => (
              <Stack key={i}>
                <Text variant="subtitle1">
                  <Text style={styles.subnumber}>{`${data.id}. `}</Text>
                </Text>
                <Text variant="body1" style={styles.description}>
                  {data.description}
                </Text>
              </Stack>
            ))}
          </Flex>
          <VStack>
            <CheckBox
              checked={agree}
              checkedColor="#132875"
              containerStyle={{ width: "90%" }}
              onIconPress={() => setAgree(!agree)}
              size={30}
              textStyle={{}}
              title="Agree with Terms and Condition"
              titleProps={{}}
              uncheckedColor="#132875"
            />
            {/* <CheckBox
              checked={disAgree}
              checkedColor="#F00"
              containerStyle={{ width: "90%" }}
              onIconPress={() => setDisagree(!disAgree)}
              size={30}
              textStyle={{}}
              title="Disgree with Terms and Condition"
              titleProps={{}}
              uncheckedColor="#F00"
            /> */}
            <Button
              title="ISUBMIT"
              color="#FFFFFF"
              variant="outlined"
              style={{ ...styles.btnBlue }}
              onPress={submit}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </Flex>
  );

  return <View style={styles.textWrapper}>{layout}</View>;
}
