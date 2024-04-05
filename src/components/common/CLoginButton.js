import { TouchableOpacity } from "react-native";
import React from "react";
import CText from "./CText";
import { CommonString } from "../../i18n/String";
import { colors } from "../../themes/colors";

export const LoginButton = ({ onPress, extratext, type, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CText type={type || "K17"} color={color || colors.green}>
        {extratext || CommonString.login}
      </CText>
    </TouchableOpacity>
  );
};
