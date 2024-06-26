// Library Imports
import { View, StyleSheet } from "react-native";
import React from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../common/CText";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import { moderateScale } from "../../common/constants";
import { Image } from "react-native";

// Liked Food description Component
const LikedFoodDesc = ({ route }) => {
  // Get the item from above page for render
  const { item } = route.params;

  return (
    <View style={localStyles.main} key={(item) => item.id}>
      <CHeader
        title={CommonString.food}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <View style={localStyles.innerView}>
        <View style={localStyles.detailsview}>
          <Image
            source={{ uri: item.profileImage }}
            style={localStyles.foodicon}
          />
          <View>
            <CText type={"C22"} color={colors.fonttile}>
              {item.foodName}
            </CText>
            <CText type={"E15"} color={colors.fontbody}>
              {item.ingredient}
            </CText>
          </View>
        </View>
        <CText
          type={"E15"}
          color={colors.fontbody}
          style={localStyles.desctext}
        >
          {item.desc1}
        </CText>
        <CText
          type={"E15"}
          color={colors.fontbody}
          style={localStyles.desctext}
        >
          {item.desc2}
        </CText>
        <CText
          type={"C17"}
          color={colors.premium}
          style={localStyles.gallerytext}
        >
          {CommonString.gallery}
        </CText>
        <Image source={{ uri: item.dataImage }} style={localStyles.imagesty} />
      </View>
    </View>
  );
};

export default LikedFoodDesc;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerView: {
    ...styles.mh20,
    ...styles.mt20,
  },
  detailsview: {
    backgroundColor: colors.recepiecard,
    ...styles.flexcenterrow,
    borderRadius: moderateScale(20),
    ...styles.p20,
    ...styles.justifyStart,
    ...styles.pl25,
    gap: moderateScale(30),
  },
  foodicon: {
    height: moderateScale(56),
    width: moderateScale(56),
    resizeMode: "contain",
  },
  desctext: {
    ...styles.mh15,
    ...styles.mt25,
  },
  gallerytext: {
    ...styles.mh15,
    ...styles.mt20,
  },
  imagesty: {
    height: moderateScale(242),
    width: moderateScale(160),
    resizeMode: "contain",
    ...styles.m10,
    ...styles.mt35,
    ...styles.ml20,
  },
});
