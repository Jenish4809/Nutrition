// Library Imports
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

// Local Imports
import { moderateScale } from "../../common/constants";
import { colors } from "../../themes/colors";
import { styles } from "../../themes";
import CText from "./CText";
import typography from "../../themes/typography";
import Ionicons from "react-native-vector-icons/Ionicons";

// Common Textinput component
const CTextInput = ({
  placeholder,
  value,
  LeftIcon,
  label,
  labelstyle,
  RightIcon,
  multiline,
  keyboardType,
  secureTextEntry,
  onChangeText,
  maxLength,
  isSecure,
  errorStyle,
  errorText,
  inputview,
  textAlignVertical,
}) => {
  const [isSecurePass, setIsSecurePass] = useState(isSecure);

  // To show or hide password function
  const onPressSecureIcon = () => {
    setIsSecurePass(!isSecurePass);
  };

  return (
    <View style={styles.mt10}>
      {!!label && (
        <View style={[localStyles.labelcontainer, labelstyle]}>
          <CText type={"E15"} color={colors.fontbody}>
            {label}
          </CText>
        </View>
      )}
      <View style={[localStyles.textview, inputview]}>
        {!!LeftIcon && <LeftIcon />}
        <TextInput
          textAlignVertical={textAlignVertical}
          maxLength={maxLength}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          value={value}
          keyboardType={keyboardType}
          secureTextEntry={!!isSecurePass ? secureTextEntry : false}
          style={[
            localStyles.textinput,
            {
              height: !!multiline ? moderateScale(70) : moderateScale(60),
            },
          ]}
        />
        {!!RightIcon && <RightIcon />}
        {!!isSecure && (
          <TouchableOpacity onPress={onPressSecureIcon}>
            <Ionicons
              name={!isSecurePass ? "eye-outline" : "eye-off-outline"}
              size={moderateScale(24)}
              color={colors.gray}
              style={styles.mr10}
            />
          </TouchableOpacity>
        )}
      </View>
      {errorText && errorText != "" ? (
        <CText
          style={[localStyles.errorText, errorStyle, { color: colors.red }]}
        >
          {errorText}
        </CText>
      ) : null}
    </View>
  );
};

export default CTextInput;

const localStyles = StyleSheet.create({
  labelcontainer: {
    ...styles.mt10,
    ...styles.mb5,
    ...styles.mh10,
  },
  textview: {
    ...styles.flexRow,
    backgroundColor: colors.pwhite,
    paddingHorizontal: 10,
    gap: moderateScale(10),
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(12),
    borderColor: colors.borders,
    ...styles.itemsCenter,
    gap: moderateScale(15),
  },
  textinput: {
    ...typography.fontSizes.f16,
    ...typography.fontWeights.ExtraBold,
    ...styles.flex,
  },
  errorText: {
    textAlign: "center",
    ...typography.fontSizes.f12,
    ...styles.mt5,
    ...styles.ml10,
  },
});
