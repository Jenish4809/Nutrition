import { View, StyleSheet } from "react-native";
import React from "react";
import { moderateScale } from "../../common/constants";
import { colors } from "../../themes/colors";
import { styles } from "../../themes";

const CDivider = ({ extrasty }) => {
  return <View style={extrasty || localStyles.main}></View>;
};

export default CDivider;

const localStyles = StyleSheet.create({
  main: {
    width: "100%",
    borderBottomWidth: moderateScale(2),
    borderBottomColor: colors.borders,
    ...styles.mv5,
  },
});
