// Library Imports
import { View, StyleSheet } from "react-native";
import React from "react";

// Local Imports
import CText from "./CText";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/colors";

const CHeader = ({
  title,
  type,
  color,
  style,
  LeftIcon,
  onPressBack,
  RighIcon,
  align,
  extraSty,
  back,
}) => {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  return (
    <View style={extraSty || localStyles.main}>
      {!!LeftIcon ? (
        <Ionicons
          onPress={onPressBack || goBack}
          name="chevron-back"
          size={moderateScale(32)}
          style={back || localStyles.backicon}
        />
      ) : (
        <View style={localStyles.icon2}></View>
      )}
      <CText
        type={type}
        color={color}
        style={style || localStyles.ctext}
        align={align}
      >
        {title}
      </CText>
      {!!RighIcon && <RighIcon />}
    </View>
  );
};

export default CHeader;

const localStyles = StyleSheet.create({
  main: {
    height: moderateScale(60),
    width: "93%",
    ...styles.flexcenterrow,
  },
  ctext: {
    textAlign: "center",
    width: "65%",
    marginRight: moderateScale(25),
    ...styles.ml20,
  },
  backicon: {
    ...styles.ml20,
    color: colors.black,
  },
  icon2: {
    width: moderateScale(52),
  },
});
