import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { styles } from "../../themes";
import { moderateScale } from "../../common/constants";
import { colors } from "../../themes/colors";
import typography from "../../themes/typography";

const CButton = ({
  name,
  extraSty,
  extratext,
  onPress,
  LeftIcon,
  viewstyle,
}) => {
  return (
    <View style={viewstyle}>
      {!!LeftIcon && <LeftIcon />}
      <TouchableOpacity style={[localStyles.main, extraSty]} onPress={onPress}>
        <Text style={[localStyles.btntitle, extratext]}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CButton;

const localStyles = StyleSheet.create({
  main: {
    height: moderateScale(72),
    width: moderateScale(295),
    backgroundColor: colors.green,
    borderRadius: 25,
    ...styles.selfCenter,
    ...styles.center,
  },
  btntitle: {
    ...typography.fontSizes.f22,
    color: colors.btncolor,
    ...typography.fontWeights.NunitoBlack,
  },
});
