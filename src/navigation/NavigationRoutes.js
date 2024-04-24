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
import EditProfile from "../components/ProfileComponent/EditProfile";
import HelpCenter from "../components/ProfileComponent/HelpCenter";
import Settings from "../components/ProfileComponent/Settings";
import Subscription from "../components/ProfileComponent/Subscription";
import FaqsHelp from "../components/ProfileComponent/FaqsHelp";
import ChatWithUs from "../components/ProfileComponent/ChatWithUs";
import EmailSent from "../components/ProfileComponent/EmailSent";
import BuyPremium from "../components/ProfileComponent/BuyPremium";
import SubscribeDone from "../components/ProfileComponent/SubscribeDone";
import LikedFoodDesc from "../components/LikeCompomnent/LikedFoodDesc";
import LikedRecepieDesc from "../components/LikeCompomnent/LikedRecepieDesc";
import SearchAllRecepie from "../components/SearchComponent/SearchAllRecepie.js";
import Searchfood from "../components/SearchComponent/Searchfood.js";
import CameraScan from "../components/CameraScan/CameraScan.js";
import AdminPannel from "../containers/auth/AdminPannel.js";

export const StackRoute = {
  Splash,
  OnBoarding,
  AuthNavigation,
  TabNavigation,
  EditProfile,
  HelpCenter,
  Settings,
  Subscription,
  FaqsHelp,
  ChatWithUs,
  EmailSent,
  BuyPremium,
  SubscribeDone,
  LikedFoodDesc,
  LikedRecepieDesc,
  SearchAllRecepie,
  Searchfood,
  CameraScan,
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
  AdminPannel,
};

export const TabRoute = {
  HomeTab,
  LikeTab,
  ProfileTab,
  SearchTab,
  CameraTab,
};
