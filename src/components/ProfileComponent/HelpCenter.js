import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CHeader from "../common/CHeader";
import { CommonString } from "../../i18n/String";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../common/CText";
import { CommonSettings } from "./Settings";
import { Help } from "../../assets/svg";
import { StackNav } from "../../navigation/NavigationKeys";

const HelpCenter = ({ navigation }) => {
  const onPressFaqs = () => {
    navigation.navigate(StackNav.FaqsHelp);
  };
  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.HelpCenter}
        LeftIcon={true}
        color={colors.fonttile}
        type={"E15"}
      />
      <Image source={images.helpcneter} style={localStyles.logo} />
      <CText type={"C22"} align={"center"}>
        {CommonString.help}
      </CText>
      <CText
        type={"E17"}
        align={"center"}
        color={colors.allhere}
        style={localStyles.helpdesc}
      >
        {CommonString.allhere}
      </CText>
      <View style={localStyles.divider}></View>
      <CommonSettings
        Svg={() => <Help />}
        Icon={true}
        title={CommonString.chatus}
      />
      <CommonSettings
        Svg={() => <Help />}
        Icon={true}
        title={CommonString.faqs}
        onPress={onPressFaqs}
      />
    </View>
  );
};

export default HelpCenter;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  logo: {
    height: moderateScale(260),
    width: moderateScale(260),
    ...styles.selfCenter,
    ...styles.mv20,
  },
  helpdesc: {
    width: moderateScale(300),
    ...styles.selfCenter,
    ...styles.mt10,
  },
  divider: {
    borderBottomWidth: moderateScale(2),
    borderBottomColor: colors.borders,
    width: moderateScale(350),
    ...styles.selfCenter,
    ...styles.mv20,
  },
});
