import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../common/CText";
import { FAQs } from "../../api/constant";

const FaqsHelp = () => {
  const [Show, setShow] = useState(false);

  const openShow = (item) => {
    setShow(item.id);
  };

  const renderDataQue = ({ item }) => {
    return (
      <View style={localStyles.renderview}>
        <TouchableOpacity
          style={localStyles.btnview}
          onPress={() => openShow(item)}
        >
          <CText type={"E17"} color={colors.fonttile}>
            {item.title}
          </CText>
          <Image
            source={!Show ? item.img1 : item.img2}
            style={localStyles.downicon}
          />
        </TouchableOpacity>
        {Show === item.id ? (
          <CText type={"E17"} color={colors.fonttile}>
            {item.desc}
          </CText>
        ) : null}
        <View style={localStyles.divider}></View>
      </View>
    );
  };
  return (
    <View style={localStyles.main}>
      <CHeader title={CommonString.faqs} LeftIcon={true} type={"E15"} />
      <Image source={images.faqs} style={localStyles.logo} />
      <View style={localStyles.innerview}>
        <FlatList data={FAQs} renderItem={renderDataQue} />
      </View>
    </View>
  );
};

export default FaqsHelp;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh25,
  },
  logo: {
    height: moderateScale(160),
    width: moderateScale(160),
    ...styles.selfCenter,
    ...styles.mv20,
  },
  downicon: {
    height: moderateScale(16),
    width: moderateScale(16),
  },
  btnview: {
    ...styles.flexcenterrow,
    height: moderateScale(22),
    width: "100%",
    ...styles.selfCenter,
    ...styles.justifyBetween,
    ...styles.mb10,
  },
  divider: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: colors.borders,
    width: "100%",
    ...styles.selfCenter,
    ...styles.mv20,
  },
  renderview: {
    ...styles.mt20,
  },
});
