import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import { DataTable as PaperDataTable } from "react-native-paper";

const DataTable = (props) => {
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const HeaderSection = () => {
    console.log(props.items);
    if (props.items.length === 0) {
      return;
    }
    return (
      <PaperDataTable.Header>
        {Object.keys(props.items[0]).map(function (key) {
          if (key !== "Id") {
            return (
              <PaperDataTable.Title style={styles.allCell}>
                {key}
              </PaperDataTable.Title>
            );
          }
        })}
      </PaperDataTable.Header>
    );
  };

  const BodySection = () => {
    return props.items.map(function (item) {
      return (
        <PaperDataTable.Row>
          {Object.keys(item).map(function (key) {
            if (key === "Id") return null;

            return (
              <PaperDataTable.Cell style={styles.allCell}>
                {item[key]}
              </PaperDataTable.Cell>
            );
          })}
        </PaperDataTable.Row>
      );
    });
  };

  return (
    <ScrollView style={styles.tableHolder}>
      <ScrollView horizontal={true}>
        <View style={{ alignItems: "center" }}>
          <PaperDataTable style={styles.table}>
            <HeaderSection />
            <BodySection />
            {/*<PaperDataTable.Header>
              <PaperDataTable.Title>Name</PaperDataTable.Title>
              <PaperDataTable.Title>Email</PaperDataTable.Title>              
            </PaperDataTable.Header>

            <PaperDataTable.Row>
              <PaperDataTable.Cell>John</PaperDataTable.Cell>
              <PaperDataTable.Cell>john@gmail.com</PaperDataTable.Cell>
            </PaperDataTable.Row>

            <PaperDataTable.Row>
              <PaperDataTable.Cell>Harry</PaperDataTable.Cell>
              <PaperDataTable.Cell>harr@gmail.com</PaperDataTable.Cell>              
            </PaperDataTable.Row>

            <PaperDataTable.Row>
              <PaperDataTable.Cell>Jessica</PaperDataTable.Cell>
              <PaperDataTable.Cell>jessica@gmail.com</PaperDataTable.Cell>              
            </PaperDataTable.Row>*/}
            <PaperDataTable.Pagination
              page={page}
              numberOfPages={1}
              onPageChange={(p) => setPage(p)}
              optionsPerPage={optionsPerPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              showFastPagination
              optionsLabel={"Rows per page"}
            />
          </PaperDataTable>
        </View>
      </ScrollView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  tableHolder: {},
  table: {
    paddingLeft: 50,
    paddingRight: 50,
    flex: 1,
  },
  allCell: {
    marginRight: 20,
  },
});

export { DataTable };
