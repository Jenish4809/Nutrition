import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import CText from "../common/CText";
import { moderateScale } from "../../common/constants";
import typography from "../../themes/typography";
import CButton from "../../components/common/CButton";
import { StackNav } from "../../navigation/NavigationKeys";

const ChatWithUs = ({ navigation }) => {
  const CommonQueryBtn = ({ extrasty, title, extracolor }) => {
    return (
      <TouchableOpacity style={[localStyles.feedbackbtn, extrasty]}>
        <CText type={"E17"} color={extracolor || colors.fonttile}>
          {title || CommonString.feedback}
        </CText>
      </TouchableOpacity>
    );
  };

  const onPressSent = () => {
    navigation.navigate(StackNav.EmailSent);
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.chatus}
        LeftIcon={true}
        type={"E15"}
        color={colors.fonttile}
      />
      <View style={localStyles.innerview}>
        <View>
          <CText type={"C22"} color={colors.fonttile}>
            {CommonString.shootus}
          </CText>
          <CText type={"E17"} color={colors.fontbody}>
            {CommonString.writemail}
          </CText>
          <TextInput
            placeholder={CommonString.mailtext}
            style={localStyles.inputsty}
            placeholderTextColor={colors.fontbody}
            multiline={true}
            textAlignVertical="top"
          />
          <View style={localStyles.querybtnview}>
            <CommonQueryBtn />
            <CommonQueryBtn
              title={CommonString.query}
              extrasty={localStyles.querybtn}
              extracolor={colors.fontbody}
            />
          </View>
        </View>
      </View>
      <CButton
        name={CommonString.send}
        extraSty={localStyles.sendbtn}
        onPress={onPressSent}
      />
    </View>
  );
};

export default ChatWithUs;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh20,
    ...styles.mt20,
    ...styles.flex,
    ...styles.justifyBetween,
  },
  inputsty: {
    height: moderateScale(316),
    backgroundColor: colors.pwhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(20),
    borderColor: colors.borders,
    ...styles.p20,
    ...styles.mv20,
    ...typography.fontSizes.f17,
    ...typography.fontWeights.ExtraBold,
  },
  feedbackbtn: {
    height: moderateScale(44),
    width: moderateScale(108),
    backgroundColor: colors.querybtn,
    borderRadius: moderateScale(12),
    ...styles.nonFlexCenter,
  },
  querybtn: {
    backgroundColor: colors.textbg,
    borderColor: colors.borders,
    borderWidth: moderateScale(2),
  },
  querybtnview: {
    ...styles.flexcenterrow,
    gap: moderateScale(10),
    ...styles.selfCenter,
  },
  sendbtn: {
    ...styles.mv25,
  },
});
