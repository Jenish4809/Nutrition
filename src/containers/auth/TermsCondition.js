// Library Imports
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import images from "../../assets/images";
import ActionSheet from "react-native-actions-sheet";

// Local Imports
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import CButton from "../../components/common/CButton";
import React, { useRef } from "react";
import { AuthNav } from "../../navigation/NavigationKeys";

// Terms and Condition Component
const TermsCondition = ({ navigation }) => {
  let ref = useRef(null);

  // OnPress for the show Actionsheet
  const onPress = () => {
    ref.current.show();
  };

  // OnPress for the hide Actionsheet
  const onPressclose = () => {
    ref.current.hide();
  };

  // OnPress for the go to the next screen
  const onPressNext = () => {
    navigation.navigate(AuthNav.AllDone);
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <Image source={images.logotextcolor} style={localStyles.logo} />
        <CText type={"C22"} color={colors.fonttile}>
          {CommonString.terms}
        </CText>
        <CText type={"E17"} color={colors.fontbody}>
          {CommonString.termsdesc}
        </CText>
        <View style={localStyles.pageview}>
          <Image source={images.terms} style={localStyles.termslogo} />
        </View>
        <ActionSheet ref={ref} containerStyle={localStyles.action}>
          <View style={localStyles.actionview}>
            <View style={localStyles.actiontitle}>
              <CText type={"C22"} color={colors.fonttile}>
                {CommonString.termsservice}
              </CText>
              <TouchableOpacity onPress={onPressclose}>
                <Image source={images.close} style={localStyles.closeicon} />
              </TouchableOpacity>
            </View>
            <CText
              type={"K17"}
              color={colors.fontbody}
              style={localStyles.termstext}
            >
              {CommonString.actionterms}
            </CText>
          </View>
        </ActionSheet>
        <View style={localStyles.btnview}>
          <CButton name={CommonString.Accept} onPress={onPressNext} />
          <TouchableOpacity onPress={onPress}>
            <CText type={"K17"} color={colors.green} align={"center"}>
              {CommonString.termsservice}
            </CText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TermsCondition;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.flex,
    ...styles.mh15,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.mv40,
  },
  termslogo: {
    height: moderateScale(282),
    width: moderateScale(282),
    ...styles.selfCenter,
  },
  pageview: {
    ...styles.flexCenter,
  },
  btnview: {
    gap: moderateScale(20),
    ...styles.mv30,
  },
  action: {
    borderTopLeftRadius: moderateScale(40),
    borderTopRightRadius: moderateScale(40),
    ...styles.p30,
  },
  actionview: {
    gap: moderateScale(20),
  },
  actiontitle: {
    ...styles.flexRow,
    ...styles.justifyBetween,
  },
  closeicon: {
    height: moderateScale(32),
    width: moderateScale(32),
  },
  termstext: {
    lineHeight: 22,
  },
});
