// Library imports
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../../../firebaseConfig";
import { deleteDoc, doc } from "firebase/firestore";

// local imports
import { styles } from "../../../themes";
import { colors } from "../../../themes/colors";
import CText from "../../../components/common/CText";
import { newDataHere } from "../../../components/common/CDataGetFirebase";
import { moderateScale } from "../../../common/constants";
import CButton from "../../../components/common/CButton";
import { CommonString } from "../../../i18n/String";

const Query = () => {
  const [query, setQuery] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const db = FIREBASE_DB;
  useEffect(() => {
    queryDataUpload();
  }, []);

  // QueryData Upload for call the data and refresh page
  const queryDataUpload = async () => {
    setIsRefreshing(true);
    const queryData = await newDataHere("Query");
    setQuery(queryData);
    setIsRefreshing(false);
  };

  // handle the radio Button
  const handleSelect = (item) => {
    setSelectedItem(item.id);
  };

  // onPress for delete query
  const onPressDelete = async () => {
    try {
      Alert.alert("Delete", "Are you sure you want to delete Query", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const DeleteQuery = await deleteDoc(doc(db, "Query", selectedItem));
            if (DeleteQuery === undefined) {
              Alert.alert("Delete", "Query Deleted Successfully");
            }
            queryDataUpload();
            setSelectedItem(null);
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  // render for the query data
  const renderQuery = ({ item }) => {
    return (
      <View style={localStyles.querycard}>
        <TouchableOpacity
          style={localStyles.radioOuterCircle}
          onPress={() => handleSelect(item)}
        >
          {selectedItem === item.id && (
            <View style={localStyles.radioInnerCircle} />
          )}
        </TouchableOpacity>
        <View style={localStyles.dataview}>
          <CText color={colors.pwhite} type={"K15"}>
            {`Query : ${item.Query}`}
          </CText>
          <CText color={colors.pwhite} type={"K15"}>
            {`Email : ${item.UserEmail}`}
          </CText>
          <CText color={colors.pwhite} type={"K15"}>
            {`Date : ${item.CreatedAT}`}
          </CText>
        </View>
      </View>
    );
  };

  return (
    <View style={localStyles.main}>
      <ScrollView
        style={localStyles.innerview}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={queryDataUpload}
          />
        }
      >
        <FlatList data={query} renderItem={renderQuery} scrollEnabled={false} />
      </ScrollView>
      <CButton
        name={CommonString.deleteqry}
        extraSty={localStyles.btn}
        onPress={onPressDelete}
      />
    </View>
  );
};

export default Query;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh20,
  },
  querycard: {
    backgroundColor: colors.green,
    ...styles.mt20,
    ...styles.p20,
    borderRadius: moderateScale(20),
    ...styles.flexcenterrow,
  },
  dataview: {
    gap: moderateScale(10),
    ...styles.ml10,
  },
  radioOuterCircle: {
    width: moderateScale(25),
    height: moderateScale(25),
    borderRadius: moderateScale(12.5),
    borderWidth: moderateScale(2),
    borderColor: colors.pwhite,
    backgroundColor: colors.green,
  },
  radioInnerCircle: {
    ...styles.flex,
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
    margin: moderateScale(4),
  },
  btn: {
    ...styles.mb20,
  },
});
