import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import CText from "../common/CText";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images/index";
import { moderateScale } from "../../common/constants";
import CButton from "../common/CButton";
import { TabNav } from "../../navigation/NavigationKeys";
import { CommonFeature } from "./Subscription";

const SubscribeDone = ({ navigation }) => {
  const onPressCancel = () => {
    navigation.navigate(TabNav.ProfileTab);
  };

  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.subscription}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <View style={localStyles.innerview}>
        <View>
          <Image source={images.profileimg} style={localStyles.imagesty} />
          <CText type={"C28"} color={colors.fonttile} align={"center"}>
            {CommonString.username}
          </CText>
          <CText type={"E17"} color={colors.fonttile} align={"center"}>
            {CommonString.subscribed}
          </CText>
        </View>
        <View style={localStyles.btnview}>
          <CommonFeature extraview1={localStyles.extraview1} />
          <CText type={"K17"} color={colors.shareoff} align={"center"}>
            {CommonString.shareoffer}
          </CText>
        </View>
        <View style={localStyles.btnview}>
          <CButton name={CommonString.share} />
          <TouchableOpacity onPress={onPressCancel}>
            <CText type={"K17"} color={colors.green} align={"center"}>
              {CommonString.cancelsub}
            </CText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SubscribeDone;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh15,
    ...styles.justifyEvenly,
    ...styles.flex,
  },
  imagesty: {
    height: moderateScale(144),
    width: moderateScale(144),
    resizeMode: "contain",
    ...styles.selfCenter,
  },
  featureview: {
    backgroundColor: colors.btncolor,
    gap: moderateScale(10),
    padding: moderateScale(50),
    borderRadius: moderateScale(20),
  },
  features: {
    ...styles.flexcenterrow,
    gap: moderateScale(7),
  },
  mainfeatureview: {
    ...styles.selfCenter,
  },
  btnview: {
    gap: moderateScale(20),
  },
  extraview1: {
    width: "90%",
  },
});
