import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TopTabNav } from "../NavigationKeys";
import { TopTabRoute } from "../NavigationRoutes";
import { colors } from "../../themes/colors";
import { moderateScale } from "../../common/constants";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: moderateScale(15),
          color: colors.fontbody,
          fontWeight: "500",
          textTransform: "none",
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          elevation: 5,
          shadowOpacity: 5,
          borderBottomWidth: 0,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.green,
        },
      }}
    >
      <Tab.Screen name={TopTabNav.Query} component={TopTabRoute.Query} />
      <Tab.Screen name={TopTabNav.Feedback} component={TopTabRoute.Feedback} />
    </Tab.Navigator>
  );
};

export default TopTabNavigation;
