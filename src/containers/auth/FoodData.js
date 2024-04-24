import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";

export default function FoodData() {
  return (
    <View style={localStyle.main}>
      <Text>FoodData</Text>
    </View>
  );
}

const localStyle = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
    ...styles.center,
  },
});
