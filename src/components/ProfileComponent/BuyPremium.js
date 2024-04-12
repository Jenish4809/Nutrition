// Library imports
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";

// Local imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../common/CText";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import { CommonFeature } from "./Subscription";
import { moderateScale } from "../../common/constants";
import { PremiumData } from "../../api/constant";
import CButton from "../common/CButton";
import { StackNav } from "../../navigation/NavigationKeys";

// BuyPremium Component
const BuyPremium = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState(1);

  // handleselect for the radio Button fot premium
  const handleSelect = (item) => {
    setSelectedItem(item.id);
  };

  // onpress for go to the next Scereen
  const onPressSubscribe = () => {
    navigation.navigate(StackNav.SubscribeDone);
  };

  // render function for premium package from data
  const renderPremium = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.offerview}
        onPress={() => handleSelect(item)}
      >
        <View style={localStyles.radioOuterCircle}>
          {selectedItem === item.id && (
            <View style={localStyles.radioInnerCircle} />
          )}
        </View>
        <View>
          <CText type={"E17"} color={colors.premium}>
            {item.title}
          </CText>

          <CText type={"E15"} color={colors.offer}>
            {item.offer}
          </CText>
        </View>
        {item.save && (
          <View style={localStyles.saveview}>
            <CText type={"E13"} color={colors.fonttile}>
              {item.save}
            </CText>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.buypremium}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <CommonFeature extraview1={localStyles.extraview1} premmium={true} />
      <View style={localStyles.divider}></View>
      <View style={localStyles.innerview}>
        <View>
          <CText type={"C22"} align={"center"}>
            {CommonString.chooseplan}
          </CText>
          <FlatList
            data={PremiumData}
            renderItem={renderPremium}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={localStyles.btnview}>
          <CButton name={CommonString.subscribe} onPress={onPressSubscribe} />
          <CText type={"E13"} color={colors.subscribedisc} align={"center"}>
            {CommonString.subscribedisc}
          </CText>
        </View>
      </View>
    </View>
  );
};

export default BuyPremium;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh15,
    ...styles.justifyBetween,
    ...styles.flex,
    ...styles.mv10,
  },
  divider: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: colors.borders,
    width: "50%",
    ...styles.selfCenter,
    ...styles.mv20,
  },
  offerview: {
    ...styles.mh30,
    width: "55%",
    gap: moderateScale(20),
    ...styles.mt30,
    ...styles.flexcenterrow,
  },
  extraview1: {
    width: "85%",
    ...styles.mt30,
  },
  saveview: {
    height: moderateScale(34),
    width: moderateScale(82),
    backgroundColor: colors.querybtn,
    ...styles.nonFlexCenter,
    borderRadius: moderateScale(10),
  },
  radioOuterCircle: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    borderWidth: moderateScale(1),
    borderColor: colors.gray,
    backgroundColor: colors.green,
  },
  radioInnerCircle: {
    ...styles.flex,
    borderRadius: moderateScale(8),
    backgroundColor: colors.white,
    margin: moderateScale(4),
  },
  btnview: {
    gap: moderateScale(20),
    ...styles.mb40,
  },
});
