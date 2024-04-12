import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
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

const QuestionItem = ({ title, desc, onPress, img1, img2 }) => {
  const [Show, setShow] = useState(false);
  const toggleAnswer = () => {
    setShow(!Show);
  };

  return (
    <View style={localStyles.renderview}>
      <TouchableOpacity
        style={localStyles.btnview}
        onPress={() => {
          onPress();
          toggleAnswer();
        }}
      >
        <CText type={"E17"} color={colors.fonttile}>
          {title}
        </CText>
        <Image source={Show ? img1 : img2} style={localStyles.downicon} />
      </TouchableOpacity>
      {Show && (
        <CText type={"E17"} color={colors.fonttile}>
          {desc}
        </CText>
      )}
      <View style={localStyles.divider}></View>
    </View>
  );
};
const FaqsHelp = () => {
  const renderDataQue = ({ item }) => {
    return (
      <QuestionItem
        title={item.title}
        desc={item.desc}
        img1={item.img1}
        img2={item.img2}
        onPress={() => {}}
      />
    );
  };
  return (
    <View style={localStyles.main}>
      <CHeader title={CommonString.faqs} LeftIcon={true} type={"E15"} />
      <ScrollView>
        <Image source={images.faqs} style={localStyles.logo} />
        <View style={localStyles.innerview}>
          <FlatList
            data={FAQs}
            renderItem={renderDataQue}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
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
