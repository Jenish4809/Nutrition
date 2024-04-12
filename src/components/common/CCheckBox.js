// Library Imports
import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

// Local Imports
import Ionicons from "react-native-vector-icons/Ionicons"; // Assuming you're using Expo icons
import { moderateScale } from "../../common/constants";
import { colors } from "../../themes/colors";
import { styles } from "../../themes";

// Common checkbox component
const CCheckbox = ({ checked, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange}>
      <View style={[localStyles.checkbox, checked && localStyles.checked]}>
        {checked && (
          <Ionicons name="checkmark" size={15} color={colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderWidth: moderateScale(2),
    borderColor: colors.gray,
    borderRadius: moderateScale(4),
    ...styles.nonFlexCenter,
  },
  checked: {
    backgroundColor: colors.green,
  },
});

export default CCheckbox;
