import images from "../assets/images";
import {
  EditProfile,
  Help,
  LogOut,
  Setting,
  Subscription,
} from "../assets/svg";
import { CommonString } from "../i18n/String";
import { StackNav } from "../navigation/NavigationKeys";

export const OnBoardingData = [
  {
    id: 1,
    colorLogo: images.logotextcolor,
    onBoardingImg: images.onBoarding1,
    title: "Eat Healthy",
    description:
      "Maintaining good health should be the primary focus of everyone.",
  },
  {
    id: 2,
    colorLogo: images.logotextcolor,
    onBoardingImg: images.onBoarding2,
    title: "Healthy Recipes",
    description: "Browse thousands of healthy recipes from all over the world.",
  },
  {
    id: 3,
    colorLogo: images.logotextcolor,
    onBoardingImg: images.onBoarding3,
    title: "Track Your Health",
    description: "With amazing inbuilt tools you can track your progress.",
  },
];

export const PizzaCard = [
  {
    id: 1,
    title: "RECIPE",
    description: "Tasty Pizza with Tastier Toppings",
    pizza: images.pizzaslice,
  },
  {
    id: 2,
    title: "RECIPE",
    description: "Tasty Pizza with  Tastier Toppings",
    pizza: images.pizzaslice,
  },
  {
    id: 3,
    title: "RECIPE",
    description: "Tasty Pizza with Tastier Toppings",
    pizza: images.pizzaslice,
  },
];

export const All = [
  {
    id: 1,
    name: "Burger",
    image: images.burger,
  },
  {
    id: 2,
    name: "Cake",
    image: images.cake,
  },
  {
    id: 3,
    name: "Donut",
    image: images.donut,
  },
  {
    id: 4,
    name: "Hot Dog",
    image: images.hotdog,
  },
  {
    id: 5,
    name: "Fries",
    image: images.fries,
  },
  {
    id: 6,
    name: "Veggy",
    image: images.veggy,
  },
];

export const Favourite = [
  {
    id: 1,
    name: "Donut",
    image: images.donut,
  },
  {
    id: 2,
    name: "Hot Dog",
    image: images.hotdog,
  },
  {
    id: 3,
    name: "Burger",
    image: images.burger,
  },
  {
    id: 4,
    name: "Cake",
    image: images.cake,
  },
];

export const Treding = [
  {
    id: 1,
    name: "Fries",
    image: images.fries,
  },
  {
    id: 2,
    name: "Hot Dog",
    image: images.hotdog,
  },
  {
    id: 3,
    name: "Donut",
    image: images.donut,
  },
];

export const PosterAll = [
  {
    id: 1,
    name: "Chicken Burger & Nuggets",
    description: "Mouth watering burger with hottest french side toppings.",
    image: images.burgerposter,
    serve: "1 serve",
    minutes: "15 min",
  },
  {
    id: 2,
    name: "Mutton Kebab Nuggets",
    description: "Crunchy Mutton Kebabs with hot chilly toppings and sauce.",
    image: images.paneertikkaposter,
    serve: "5 serve",
    minutes: "45 min",
  },
];

export const PosterFavourite = [
  {
    id: 1,
    name: "Mutton Kebab Nuggets",
    description: "Crunchy Mutton Kebabs with hot chilly toppings and sauce.",
    image: images.paneertikkaposter,
    serve: "5 serve",
    minutes: "45 min",
  },
  {
    id: 2,
    name: "Chicken Burger & Nuggets",
    description: "Mouth watering burger with hottest french side toppings.",
    image: images.burgerposter,
    serve: "1 serve",
    minutes: "15 min",
  },
];

export const PosterTrending = [
  {
    id: 1,
    name: "Chicken Burger & Nuggets",
    description: "Mouth watering burger with hottest french side toppings.",
    image: images.burgerposter,
    serve: "1 serve",
    minutes: "15 min",
  },
];

export const ProfileData = [
  {
    id: 1,
    title: CommonString.editProf,
    svg: <EditProfile />,
    route: StackNav.EditProfile,
  },
  {
    id: 2,
    title: CommonString.subscription,
    svg: <Subscription />,
    route: StackNav.Subscription,
  },
  {
    id: 3,
    title: CommonString.setting,
    svg: <Setting />,
    route: StackNav.Settings,
  },
  {
    id: 4,
    title: CommonString.HelpCenter,
    svg: <Help />,
    route: StackNav.HelpCenter,
  },
  {
    id: 5,
    title: CommonString.logout,
    svg: <LogOut />,
    route: StackNav.LogOut,
  },
];

export const FAQs = [
  {
    id: 1,
    title: CommonString.kcal,
    desc: CommonString.kcaldesc,
    img1: images.arrowup,
    img2: images.arrowdown,
  },
  {
    id: 2,
    title: CommonString.needsubscription,
    desc: CommonString.kcaldesc,
    img1: images.arrowup,
    img2: images.arrowdown,
  },
  {
    id: 3,
    title: CommonString.wantdelete,
    desc: CommonString.kcaldesc,
    img1: images.arrowup,
    img2: images.arrowdown,
  },
  {
    id: 4,
    title: CommonString.scanavailable,
    desc: CommonString.kcaldesc,
    img1: images.arrowup,
    img2: images.arrowdown,
  },
];
