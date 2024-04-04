import { StyleSheet } from "react-native";
import padding from "./padding";
import margin from "./margin";
import flex from "./flex";
import commonstyle from "./commonstyle";

export const styles = StyleSheet.create({
  ...flex,
  ...margin,
  ...padding,
  ...commonstyle,
});
