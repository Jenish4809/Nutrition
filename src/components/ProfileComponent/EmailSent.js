// Library Imports
import { View, StyleSheet, Image } from "react-native";
import React from "react";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { CommonString } from "../../i18n/String";
import CHeader from "../common/CHeader";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CText from "../common/CText";
import CButton from "../common/CButton";
import { TabNav } from "../../navigation/NavigationKeys";

// Email sent Component for query and feedback
const EmailSent = ({ navigation }) => {
  // onPress function for go to home
  const onPressHome = () => {
    navigation.navigate(TabNav.HomeTab);
  };

  return (
    <View style={localStyles.main}>
      <CHeader
        title={CommonString.chatus}
        type={"E15"}
        color={colors.fonttile}
      />
      <View style={localStyles.innerview}>
        <View>
          <Image source={images.emaillogo} style={localStyles.logo} />
          <View style={localStyles.emailview}>
            <CText type={"C22"} color={colors.fonttile} align={"center"}>
              {CommonString.messagesend}
            </CText>
            <CText type={"E17"} align={"center"} color={colors.allhere}>
              {CommonString.messagesentdesc}
            </CText>
          </View>
        </View>
        <CButton name={CommonString.backhome} onPress={onPressHome} />
      </View>
    </View>
  );
};

export default EmailSent;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh20,
    ...styles.mv30,
    ...styles.flex,
    ...styles.justifyBetween,
  },
  logo: {
    height: moderateScale(256),
    width: moderateScale(256),
    ...styles.selfCenter,
  },
  emailview: {
    gap: moderateScale(10),
    ...styles.mv20,
  },
});
