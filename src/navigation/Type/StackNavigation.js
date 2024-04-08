import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackRoute } from "../NavigationRoutes";
import { StackNav } from "../NavigationKeys";
import React from "react";

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName={StackNav.Splah}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={StackNav.Splah} component={StackRoute.Splash} />
      <Stack.Screen
        name={StackNav.OnBoarding}
        component={StackRoute.OnBoarding}
      />
      <Stack.Screen
        name={StackNav.AuthNavigation}
        component={StackRoute.AuthNavigation}
      />
      <Stack.Screen
        name={StackNav.TabNavigation}
        component={StackRoute.TabNavigation}
      />
      <Stack.Screen
        name={StackNav.EditProfile}
        component={StackRoute.EditProfile}
      />
      <Stack.Screen
        name={StackNav.Subscription}
        component={StackRoute.Subscription}
      />
      <Stack.Screen name={StackNav.Settings} component={StackRoute.Settings} />
      <Stack.Screen
        name={StackNav.HelpCenter}
        component={StackRoute.HelpCenter}
      />
      <Stack.Screen name={StackNav.LogOut} component={StackRoute.LogOut} />
      <Stack.Screen name={StackNav.FaqsHelp} component={StackRoute.FaqsHelp} />
    </Stack.Navigator>
  );
}
