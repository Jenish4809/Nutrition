// Library Imports
import { ActivityIndicator, View, StyleSheet } from "react-native";

// Local Imports

import { styles } from "../../themes";
import { colors } from "../../themes/colors";

// Common loader component
export const CLoader = () => {
  return (
    <View style={localStyle.main}>
      <ActivityIndicator size={"large"} color={colors.green} />
    </View>
  );
};

const localStyle = StyleSheet.create({
  main: {
    backgroundColor: colors.white,
    position: "absolute",
    height: "100%",
    width: "100%",
    ...styles.nonFlexCenter,
  },
});
