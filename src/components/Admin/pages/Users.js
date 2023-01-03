import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Image } from "react-native";
import { DataTable } from "react-native-paper";
import { Button, Avatar, Text } from "@react-native-material/core";
import axios from "../../../config/axios";
import DriverDetails from "./DriverDetails";
import SelectDropdown from "react-native-select-dropdown";
import styles from "../../Stylesheet";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Users = (props) => {
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
      axios.get("admin/user/pending").then((response) => {
        setRows(response.data.data);
        setReject(false);
        setAccept(false);
      })
    );
  }, []);

  useEffect(() => {
    handleSort();
  }, []);

  useEffect(() => {
    axios.get(`admin/user`).then((response) => {
      const res = response.data.data;
      if (res.length > 0) {
        setRows(response.data.data);
      } else {
        setRows([]);
      }
    });
  }, []);

  async function handleAccept(e) {
    await axios.put(`/admin/user/approve/${e}`);
    setAccept(true);
    onRefresh();
  }
  async function handleReject(e) {
    await axios.put(`/admin/user/reject/${e}`);
    setReject(true);
    onRefresh();
  }
  async function handleDriver(item) {
    setdriverData(item);
    setDisplayDriver(true);
  }
  function status(data) {
    if (data === 1) {
      return "Active";
    } else if (data === 2) {
      return "Pending";
    } else {
      return "Not Active";
    }
  }

  const userTypes = [
    { id: 2, name: "Driver" },
    { id: 3, name: "Passenger" },
    { id: 4, name: "Pending" },
  ];
  async function handleSort(val) {
    if (val === "Pending") {
      axios.get(`admin/user`).then((response) => {
        console.log(
          "🚀 ~ file: Users.js ~ line 85 ~ axios.get ~ response",
          response.data.data
        );
        setRows(response.data.data);
      });
    } else {
      userTypes.find((item) => {
        if (item.name === val) {
          axios.get(`admin/user/${item.id}`).then((response) => {
            setRows(response.data.data);
          });
        }
      });
    }
  }
  return (
    <View style={{ marginTop: 20 }}>
      {displayDriver ? (
        <DriverDetails
          value={driverData}
          pageName={setDisplayDriver}
          reloads={onRefresh}
        />
      ) : (
        <View>
          <SelectDropdown
            borderColor="#132875"
            defaultButtonText={"I-sort"}
            buttonStyle={{
              ...styles.txtInput,
              backgroundColor: "white",
              height: 55,
              borderRadius: 5,
              padding: 5,
              borderWidth: 1,
              borderColor: "gray",
              margin: 10,
              width: 200,
            }}
            value={"Pending"}
            buttonTextStyle={{
              color: "gray",
              fontSize: 15,
            }}
            data={userTypes.map((item) => item.name)}
            onSelect={(selectedItem) => {
              handleSort(selectedItem);
            }}
            renderDropdownIcon={(isOpened) => {
              return (
                <Icon
                  name={isOpened ? "chevron-up" : "chevron-down"}
                  style={{ color: "#132875", borderColor: "#132875" }}
                  size={30}
                />
              );
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: -50,
                  }}
                >
                  {selectedItem ? (
                    <Icon
                      name="account-group"
                      style={{ color: "#132875" }}
                      size={32}
                    />
                  ) : (
                    <Icon
                      name="account-group"
                      style={{ color: "#132875" }}
                      size={32}
                    />
                  )}
                  <Text
                    style={{
                      textAlign: "right",
                      color: selectedItem ? "gray" : "black",
                      marginHorizontal: 10,
                    }}
                  >
                    {selectedItem ? selectedItem : "I-sort"}
                  </Text>
                </View>
              );
            }}
          />
          <ScrollView horizontal={true}>
            <DataTable style={{ paddingLeft: 5, paddingRight: 5, flex: 1 }}>
              <DataTable.Header>
                <DataTable.Title style={{ width: 100 }}>
                  Profile
                </DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Name</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Email</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Role</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>Status</DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>
                  Address
                </DataTable.Title>
                <DataTable.Title style={{ width: 200 }}>
                  Driver Details
                </DataTable.Title>
                <DataTable.Title style={{ width: 350 }}>
                  Actions
                </DataTable.Title>
              </DataTable.Header>

              {rows
                .slice(
                  page * numberOfItemsPerPage,
                  page * numberOfItemsPerPage + numberOfItemsPerPage
                )
                .map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell style={{ width: 50 }}>
                      <Avatar
                        size={32}
                        image={
                          <Image
                            source={{ uri: item.profile }}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              borderRadius: 28,
                            }}
                          />
                        }
                      />
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{ width: 150 }}
                    >{`${item.fname} ${item.lname}`}</DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>
                      {item.email}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>
                      {item.roleID === 1
                        ? "Admin"
                        : item.roleID === 2
                        ? "Driver"
                        : "Passenger"}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>
                      {status(item.status)}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>
                      {JSON.parse(item.details).address}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 150 }}>
                      {item.roleID === 2 && (
                        <Button
                          variant="text"
                          title="View Details"
                          color="#132875"
                          onPress={() => {
                            handleDriver(JSON.parse(item.details).driver);
                          }}
                        />
                      )}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ width: 300 }} center>
                      <Button
                        variant="text"
                        title="Accept"
                        color="#132875"
                        loading={isAccept}
                        onPress={() => {
                          handleAccept(item.id);
                        }}
                      />
                      <Button
                        variant="text"
                        title="Reject"
                        color="red"
                        onPress={() => {
                          handleReject(item.id);
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
      )}
    </View>
  );
};

export default Users;
