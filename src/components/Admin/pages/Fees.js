import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AddFees from "./AddFees";
import axios from "../../../config/axios";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Fees = (props) => {
  const [rows, setRows] = useState([]);
  const [rowsData, setRowsData] = useState("");
  const [pageName, setPageName] = useState("list");

  const onRefresh = useCallback(() => {
    wait(3000).then(() =>
      axios.get("/admin/fees").then((response) => {
        setRows(response.data.data);
      })
    );
  }, []);

  useEffect(() => {
    axios.get("/admin/fees").then((response) => {
      setRows(response.data.data);
    });
  }, []);

  async function handleReject(e) {
    setPageName("edit");
    setRowsData(e);
  }
  const ListTODA = (
    <View>
      <ScrollView horizontal={true}>
        <DataTable style={{ paddingHorizontal: 10, flex: 1 }}>
          <DataTable.Header>
            <DataTable.Title style={{ width: 100 }}>Fee</DataTable.Title>
            <DataTable.Title style={{ width: 300 }}>Actions</DataTable.Title>
          </DataTable.Header>

          {rows.map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell style={{ width: 100 }}>
                {item.name}
              </DataTable.Cell>

              <DataTable.Cell style={{ width: 300 }} center>
                <Button
                  variant="text"
                  leading={(props) => <Icon name="note-edit" {...props} />}
                  color="green"
                  onPress={() => {
                    handleReject(item);
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>
    </View>
  );
  const MainPage = () => {
    if (pageName !== "list") {
      return (
        <AddFees
          pageName={setPageName}
          reloads={onRefresh}
          pages={pageName}
          rowsData={rowsData}
        />
      );
    } else {
      return ListTODA;
    }
  };
  return (
    <View style={{ marginTop: 20 }}>
      <MainPage />
    </View>
  );
};

export default Fees;
