// Library Imports
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

// Local Imports
import { styles } from "../../themes";
import { moderateScale } from "../../common/constants";
import { colors } from "../../themes/colors";
import typography from "../../themes/typography";

// Common Button component
const CButton = ({ name, extraSty, extratext, onPress, LeftIcon }) => {
  return (
    <TouchableOpacity style={[localStyles.main, extraSty]} onPress={onPress}>
      {!!LeftIcon && <LeftIcon />}
      <Text style={[localStyles.btntitle, extratext]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default CButton;

const localStyles = StyleSheet.create({
  main: {
    height: moderateScale(72),
    width: moderateScale(295),
    backgroundColor: colors.green,
    borderRadius: moderateScale(20),
    ...styles.selfCenter,
    ...styles.center,
  },
  btntitle: {
    ...typography.fontSizes.f22,
    color: colors.btncolor,
    ...typography.fontWeights.NunitoBlack,
  },
});
