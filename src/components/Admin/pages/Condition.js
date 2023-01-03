import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AddTermss from "./AddTerms";
import axios from "../../../config/axios";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Terms = (props) => {
  const [rows, setRows] = useState([]);
  const [rowsData, setRowsData] = useState("");
  const [pageName, setPageName] = useState("list");

  const numberOfItemsPerPageList = [5, 10, 15];

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, rows.length);
  useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const onRefresh = useCallback(() => {
    wait(3000).then(() =>
      axios.get("admin/terms").then((response) => {
        setRows(response.data.data);
      })
    );
  }, []);

  useEffect(() => {
    axios.get("admin/terms").then((response) => {
      setRows(response.data.data);
    });
  }, []);

  async function handleReject(e) {
    setPageName("edit");
    setRowsData(e);
  }
  async function handleDelete(e) {
    await axios.delete(`/admin/terms/delete/${e}`);
    onRefresh();
  }
  async function addTerms() {
    setPageName("add");
  }
  const ListTerms = (
    <View>
      <Button
        variant="text"
        title="Bagong Terms at Kondisyon"
        leading={(props) => <Icon name="note-plus" {...props} />}
        color="#132875"
        onPress={addTerms}
      />
      <ScrollView horizontal={true}>
        <DataTable style={{ paddingHorizontal: 10, flex: 1 }}>
          <DataTable.Header>
            <DataTable.Title style={{ width: 300 }}>Pamagat</DataTable.Title>
            <DataTable.Title style={{ width: 300 }}>
              Deskripsyon
            </DataTable.Title>
            <DataTable.Title style={{ width: 300 }}>Actions</DataTable.Title>
          </DataTable.Header>

          {rows
            .slice(
              page * numberOfItemsPerPage,
              page * numberOfItemsPerPage + numberOfItemsPerPage
            )
            .map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell style={{ width: 300 }}>
                  {item.title}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 300 }}>
                  {item.description}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 300 }} center>
                  <Button
                    variant="text"
                    leading={(props) => <Icon name="note-edit" {...props} />}
                    color="green"
                    disabled={item.status === 3 || item.status === 2}
                    onPress={() => {
                      handleReject(item);
                    }}
                  />
                  <Button
                    variant="text"
                    leading={(props) => <Icon name="delete" {...props} />}
                    color="red"
                    onPress={() => {
                      handleDelete(item.id);
                    }}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(rows.length / numberOfItemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${rows.length}`}
            numberOfItemsPerPage={numberOfItemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
  const MainPage = () => {
    if (pageName !== "list") {
      return (
        <AddTermss
          pageName={setPageName}
          reloads={onRefresh}
          pages={pageName}
          rowsData={rowsData}
        />
      );
    } else {
      return ListTerms;
    }
  };
  return (
    <View style={{ marginTop: 20 }}>
      <MainPage />
    </View>
  );
};

export default Terms;
