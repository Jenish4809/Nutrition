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
        name={StackNav.DrawerNavigation}
        component={StackRoute.DrawerNavigation}
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

      <Stack.Screen name={StackNav.FaqsHelp} component={StackRoute.FaqsHelp} />
      <Stack.Screen
        name={StackNav.ChatWithUs}
        component={StackRoute.ChatWithUs}
      />
      <Stack.Screen
        name={StackNav.EmailSent}
        component={StackRoute.EmailSent}
      />
      <Stack.Screen
        name={StackNav.BuyPremium}
        component={StackRoute.BuyPremium}
      />
      <Stack.Screen
        name={StackNav.SubscribeDone}
        component={StackRoute.SubscribeDone}
      />
      <Stack.Screen
        name={StackNav.LikedFoodDesc}
        component={StackRoute.LikedFoodDesc}
      />
      <Stack.Screen
        name={StackNav.LikedRecepieDesc}
        component={StackRoute.LikedRecepieDesc}
      />
      <Stack.Screen
        name={StackNav.Searchfood}
        component={StackRoute.Searchfood}
      />
      <Stack.Screen
        name={StackNav.SearchAllRecepie}
        component={StackRoute.SearchAllRecepie}
      />
      <Stack.Screen
        name={StackNav.CameraScan}
        component={StackRoute.CameraScan}
      />
    </Stack.Navigator>
  );
}
