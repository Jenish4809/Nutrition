import "react-native-gesture-handler";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import AppNavigator from "./src/navigation";
import { styles } from "./src/themes";

export default function App() {
  const [fontsLoaded] = useFonts({
    nunitoBlack: require("./src/assets/fonts/Nunito-Black.ttf"),
    nunitoBold: require("./src/assets/fonts/Nunito-Bold.ttf"),
    nunitoBoldItalic: require("./src/assets/fonts/Nunito-BoldItalic.ttf"),
    nunitoExtraBold: require("./src/assets/fonts/Nunito-ExtraBold.ttf"),
    nunitoItalic: require("./src/assets/fonts/Nunito-Italic.ttf"),
    nunitoLight: require("./src/assets/fonts/Nunito-Light.ttf"),
    nunitoMedium: require("./src/assets/fonts/Nunito-Medium.ttf"),
    nunitoRegular: require("./src/assets/fonts/Nunito-Regular.ttf"),
    nunitoSemiBold: require("./src/assets/fonts/Nunito-SemiBold.ttf"),
    coiniRegular: require("./src/assets/fonts/Coiny-Regular.ttf"),
    workmedium: require("./src/assets/fonts/WorkSans-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return undefined;
  }
  return (
    <SafeAreaView style={styles.flex}>
      <ExpoStatusBar />
      <AppNavigator />
    </SafeAreaView>
  );
}
