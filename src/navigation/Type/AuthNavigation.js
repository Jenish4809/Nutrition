import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNav } from "../NavigationKeys";
import { AuthRoute } from "../NavigationRoutes";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={AuthNav.SignUpScreen}
    >
      <Stack.Screen
        name={AuthNav.SignUpScreen}
        component={AuthRoute.SignUpScreen}
      />
      <Stack.Screen
        name={AuthNav.OtpVerificationScreen}
        component={AuthRoute.OtpVerificationScreen}
      />
      <Stack.Screen
        name={AuthNav.UploadPhoto}
        component={AuthRoute.UploadPhoto}
      />
      <Stack.Screen
        name={AuthNav.AllowNotification}
        component={AuthRoute.AllowNotification}
      />
      <Stack.Screen
        name={AuthNav.TermsCondition}
        component={AuthRoute.TermsCondition}
      />
      <Stack.Screen name={AuthNav.AllDone} component={AuthRoute.AllDone} />
      <Stack.Screen name={AuthNav.Login} component={AuthRoute.Login} />
      <Stack.Screen
        name={AuthNav.AdminPannel}
        component={AuthRoute.AdminPannel}
      />

      <Stack.Screen
        name={AuthNav.ForgotPassword}
        component={AuthRoute.ForgotPassword}
      />
      <Stack.Screen name={AuthNav.EmailSend} component={AuthRoute.EmailSend} />
    </Stack.Navigator>
  );
}
