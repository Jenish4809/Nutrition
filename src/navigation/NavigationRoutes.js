import Splash from "../containers/splash";
import OnBoarding from "../containers/OnBoarding";
import SignUpScreen from "../containers/auth/SignUpScreen";
import AuthNavigation from "./Type/AuthNavigation";
import OtpVerificationScreen from "../containers/auth/OtpVerificationScreen";
import UploadPhoto from "../containers/auth/UploadPhoto";
import AllowNotification from "../containers/auth/AllowNotification";
import TermsCondition from "../containers/auth/TermsCondition";
import AllDone from "../containers/auth/AllDone";
export const StackRoute = {
  Splash,
  OnBoarding,
  AuthNavigation,
};

export const AuthRoute = {
  SignUpScreen,
  OtpVerificationScreen,
  UploadPhoto,
  AllowNotification,
  TermsCondition,
  AllDone,
};
