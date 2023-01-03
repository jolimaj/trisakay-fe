import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Image } from "react-native";
import { DataTable } from "react-native-paper";
import { Button, Avatar } from "@react-native-material/core";
import axios from "../../../config/axios";
import DriverDetails from "./DriverDetails";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Rates = (props) => {
  const [rows, setRows] = useState([]);
  const [isAccept, setAccept] = useState(false);
  const [isReject, setReject] = useState(false);
  const [displayDriver, setDisplayDriver] = useState(false);
  const [driverData, setdriverData] = useState(false);

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
    wait(2000).then(() =>
      axios.get("admin/user").then((response) => {
        setRows(response.data.data);
        setReject(false);
        setAccept(false);
      })
    );
  }, []);

  useEffect(() => {
    axios.get("admin/rating").then((response) => {
      setRows(response.data.data);
    });
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <ScrollView horizontal={true}>
        <DataTable style={{ paddingLeft: 5, paddingRight: 5, flex: 1 }}>
          <DataTable.Header>
            <DataTable.Title style={{ width: 100 }}>User ID</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Name</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>TODA</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Ratings</DataTable.Title>
            <DataTable.Title style={{ width: 100 }}>Comment</DataTable.Title>
          </DataTable.Header>

          {rows
            .slice(
              page * numberOfItemsPerPage,
              page * numberOfItemsPerPage + numberOfItemsPerPage
            )
            .map((item) => (
              <DataTable.Row key={item.id}>
                <DataTable.Cell style={{ width: 200 }}>
                  {item.id}
                </DataTable.Cell>
                <DataTable.Cell
                  style={{ width: 200 }}
                >{`${item.fname} ${item.lname}`}</DataTable.Cell>
                <DataTable.Cell style={{ width: 200 }}>
                  {JSON.parse(item.details).driver.toda_name}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 200 }}>
                  {item.rate}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 200 }}>
                  {item.comment}
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
};

export default Rates;
