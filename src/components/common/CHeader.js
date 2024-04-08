import { View, StyleSheet } from "react-native";
import React from "react";
import CText from "./CText";
import { moderateScale } from "../../common/constants";
import { styles } from "../../themes";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/colors";

const CHeader = ({ title, type, color, style, LeftIcon, onPressBack }) => {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();
  return (
    <View style={localStyles.main}>
      {!!LeftIcon ? (
        <Ionicons
          onPress={onPressBack || goBack}
          name="chevron-back"
          size={moderateScale(32)}
          style={localStyles.backicon}
        />
      ) : (
        <View style={localStyles.icon2}></View>
      )}
      <CText type={type} color={color} style={style || localStyles.ctext}>
        {title}
      </CText>
    </View>
  );
};

export default CHeader;

const localStyles = StyleSheet.create({
  main: {
    height: moderateScale(60),
    width: "100%",
    ...styles.flexcenterrow,
  },
  ctext: {
    textAlign: "center",
    flex: 1,
    marginRight: moderateScale(52),
  },
  backicon: {
    ...styles.ml20,
    color: colors.black,
  },
  icon2: {
    width: moderateScale(52),
  },
});
