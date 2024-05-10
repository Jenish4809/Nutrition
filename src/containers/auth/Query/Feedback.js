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

// Local imports
import { styles } from "../../../themes";
import { colors } from "../../../themes/colors";
import CText from "../../../components/common/CText";
import { newDataHere } from "../../../components/common/CDataGetFirebase";
import { moderateScale } from "../../../common/constants";
import CButton from "../../../components/common/CButton";
import { CommonString } from "../../../i18n/String";

const Feedback = () => {
  const [query, setQuery] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const db = FIREBASE_DB;

  useEffect(() => {
    feedbackDataUpload();
  }, []);

  // FeedbackData Upload for call the data and refresh page
  const feedbackDataUpload = async () => {
    setIsRefreshing(true);
    const queryData = await newDataHere("Feedback");
    setQuery(queryData);
    setIsRefreshing(false);
  };

  // handle the radio Button
  const handleSelect = (item) => {
    setSelectedItem(item.id);
  };

  // onPress for delete Feedback
  const onPressDelete = async () => {
    try {
      Alert.alert("Delete", "Are you sure you want to delete Feedback", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            const DeleteQuery = await deleteDoc(
              doc(db, "Feedback", selectedItem)
            );
            if (DeleteQuery === undefined) {
              Alert.alert("Delete", "Feedback Deleted Successfully");
            }
            feedbackDataUpload();
            setSelectedItem(null);
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  // render for the Feedback data
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
          <CText color={colors.white} type={"K14"}>
            {`Feedback : ${item.Query}`}
          </CText>
          <CText color={colors.pwhite} type={"K14"}>
            {`Email : ${item.UserEmail}`}
          </CText>
          <CText color={colors.pwhite} type={"K14"}>
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
            onRefresh={feedbackDataUpload}
          />
        }
      >
        <FlatList data={query} renderItem={renderQuery} scrollEnabled={false} />
      </ScrollView>
      <CButton
        name={CommonString.deletefeed}
        extraSty={localStyles.btn}
        onPress={onPressDelete}
      />
    </View>
  );
};

export default Feedback;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh20,
  },
  querycard: {
    backgroundColor: colors.recepie,
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
    borderColor: colors.black,
    backgroundColor: colors.recepie,
  },
  radioInnerCircle: {
    ...styles.flex,
    borderRadius: moderateScale(8),
    backgroundColor: colors.black,
    margin: moderateScale(4),
  },
  btn: {
    ...styles.mb20,
    backgroundColor: colors.recepie,
  },
});
