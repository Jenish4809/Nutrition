import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";

const AdminPannel = () => {
  return (
    <View style={localStyles.main}>
      <Text>AdminPannel</Text>
    </View>
  );
};

export default AdminPannel;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
});
