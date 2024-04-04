import Splash from "../containers/splash";
import OnBoarding from "../containers/OnBoarding";
import SignUpScreen from "../containers/auth/SignUpScreen";
import AuthNavigation from "./Type/AuthNavigation";
import OtpVerificationScreen from "../containers/auth/OtpVerificationScreen";
import UploadPhoto from "../containers/auth/UploadPhoto";
import AllowNotification from "../containers/auth/AllowNotification";
import TermsCondition from "../containers/auth/TermsCondition";
import AllDone from "../containers/auth/AllDone";
import Login from "../containers/auth/Login";
import ForgotPassword from "../containers/auth/ForgotPassword";
import EmailSend from "../containers/auth/EmailSend";
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
  Login,
  ForgotPassword,
  EmailSend,
};
