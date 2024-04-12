// Library Imports
import { ActivityIndicator, View, StyleSheet } from "react-native";

// Local Imports
import { colors } from "./ComonColor";
import { styles } from "../../themes";

// Common loader component
export const CLoader = () => {
  return (
    <View style={localStyle.main}>
      <ActivityIndicator size={"large"} color={colors.button} />
    </View>
  );
};

const localStyle = StyleSheet.create({
  main: {
    position: "absolute",
    height: "100%",
    width: "100%",
    ...styles.nonFlexCenter,
  },
});
