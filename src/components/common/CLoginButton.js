import { TouchableOpacity } from "react-native";
import React from "react";
import CText from "./CText";
import { CommonString } from "../../i18n/String";
import { colors } from "../../themes/colors";

export const LoginButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CText type={"K17"} color={colors.green}>
        {CommonString.login}
      </CText>
    </TouchableOpacity>
  );
};
