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
import TabNavigation from "./Type/TabNavigation";
import HomeTab from "../containers/Tab/HomeTab";
import LikeTab from "../containers/Tab/LikeTab";
import ProfileTab from "../containers/Tab/ProfileTab";
import SearchTab from "../containers/Tab/SearchTab";
import CameraTab from "../containers/Tab/CameraTab";

export const StackRoute = {
  Splash,
  OnBoarding,
  AuthNavigation,
  TabNavigation,
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

export const TabRoute = {
  HomeTab,
  LikeTab,
  ProfileTab,
  SearchTab,
  CameraTab,
};
