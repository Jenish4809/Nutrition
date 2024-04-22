import images from "../assets/images";
import { CommonString } from "../i18n/String";

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

export const PremiumData = [
  {
    id: 1,
    title: "Monthly -  $7.99/month",
    offer: "Try Free For 7 Days Only",
  },
  {
    id: 2,
    title: "Annual -  $49.99/year",
    offer: "Try Free For 1 Month",
    save: "Save 25%",
  },
];

export const FavouriteCategory = [
  { id: 1, title: "Food" },
  { id: 2, title: "Recepies" },
];

export const FavouriteFood = [
  {
    id: 1,
    name: "Burger",
    image: images.burger,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 2,
    name: "Cake",
    image: images.cake,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 3,
    name: "Donut",
    image: images.donut,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 4,
    name: "Pizza",
    image: images.pizzaslice,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 5,
    name: "Fries",
    image: images.fries,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 6,
    name: "Muffin",
    image: images.cupcake,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 7,
    name: "Hot Dog",
    image: images.hotdog,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 8,
    name: "Roller",
    image: images.rollercake,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
  {
    id: 9,
    name: "Tacco",
    image: images.tacco,
    title: "Onion Fries",
    ingridient: "Creamy, tasty, no healthy",
    desc1:
      "French fries are a popular snack made from potatoes cut into thin strips and fried until crispy. They are often served as a side dish or on their own with a variety of dipping sauces.",
    desc2:
      "Despite their name, French fries are believed to have originated in Belgium and gained popularity in France. Today, they are a beloved and ubiquitous food item around the world, with many variations and styles available.",
    Foodimage: [
      { id: 1, img1: images.fires1 },
      { id: 2, img1: images.fires2 },
      { id: 3, img1: images.fries3 },
    ],
  },
];

export const FavouriteRecepie = [
  {
    id: 1,
    name: "Chicken Burger & Nuggets",
    description: "Mouth watering burger with hottest french side toppings.",
    image: images.burgerposter,
    regular: images.commonPoster,
    serve: "1 serve",
    minutes: "15 min",
    desc: "Grilled Fish Steak is a delicious Mediterranean recipe made by marinating fish fillets in garlic, green chilies and a blend of spices.Tender fish fillets smeared in a simple marinade of lime juice and salt, seared golden. Delicious, isn't it?",
    strstep1: "Step 1",
    strstep2: "Step 2",
    strstep3: "Step 3",

    step1:
      "To prepare this amazing non-vegetarian recipe, take the fish fillets and massage it gently with oil, keep aside in a plate.",
    step2:
      "Grind together the garlic, turmeric powder, red chilli powder, green chillies, dill leaves, coriander powder, and salt. Add oil to it and grind to form a paste. Rub this all over the fish fillets and keep aside to marinate for 15 to 30 minutes.",
    step3:
      "Grill the marinated fish on a preheated grill or oven till golden and crisp on both sides or for 5 minutes. Transfer to a plate.",
    FoodRecepie: [
      { id: 1, img1: images.meat, name: "Fish", piece: "5 Slices" },
      { id: 2, img1: images.brocoli, name: "Brocoli", piece: "2 Pcs" },
      { id: 3, img1: images.tomato, name: "Tomato", piece: "2 Pcs" },
      { id: 4, img1: images.corn, name: "Corn", piece: "1 Pcs" },
    ],
  },
  {
    id: 2,
    name: "Crispy Indian Breads",
    description:
      "Crispy breads and your favourite sauce to eat with veg toppings.",
    image: images.breadposter,
    regular: images.commonPoster,

    serve: "1 serve",
    minutes: "10 min",
    desc: "Grilled Fish Steak is a delicious Mediterranean recipe made by marinating fish fillets in garlic, green chilies and a blend of spices.Tender fish fillets smeared in a simple marinade of lime juice and salt, seared golden. Delicious, isn't it?",
    strstep1: "Step 1",
    strstep2: "Step 2",
    strstep3: "Step 3",
    step1:
      "To prepare this amazing non-vegetarian recipe, take the fish fillets and massage it gently with oil, keep aside in a plate.",
    step2:
      "Grind together the garlic, turmeric powder, red chilli powder, green chillies, dill leaves, coriander powder, and salt. Add oil to it and grind to form a paste. Rub this all over the fish fillets and keep aside to marinate for 15 to 30 minutes.",
    step3:
      "Grill the marinated fish on a preheated grill or oven till golden and crisp on both sides or for 5 minutes. Transfer to a plate.",
    FoodRecepie: [
      { id: 1, img1: images.meat, name: "Fish", piece: "5 Slices" },
      { id: 2, img1: images.brocoli, name: "Brocoli", piece: "2 Pcs" },
      { id: 3, img1: images.tomato, name: "Tomato", piece: "2 Pcs" },
      { id: 4, img1: images.corn, name: "Corn", piece: "1 Pcs" },
    ],
  },
  {
    id: 3,
    name: "Spicy Veg Salad",
    description:
      "Healthy bowl of veg salad mixed with Indian spices and hot chillies.",
    image: images.saladposter,
    regular: images.commonPoster,

    serve: "1 serve",
    minutes: "20 min",
    desc: "Grilled Fish Steak is a delicious Mediterranean recipe made by marinating fish fillets in garlic, green chilies and a blend of spices.Tender fish fillets smeared in a simple marinade of lime juice and salt, seared golden. Delicious, isn't it?",
    strstep1: "Step 1",
    strstep2: "Step 2",
    strstep3: "Step 3",
    step1:
      "To prepare this amazing non-vegetarian recipe, take the fish fillets and massage it gently with oil, keep aside in a plate.",
    step2:
      "Grind together the garlic, turmeric powder, red chilli powder, green chillies, dill leaves, coriander powder, and salt. Add oil to it and grind to form a paste. Rub this all over the fish fillets and keep aside to marinate for 15 to 30 minutes.",
    step3:
      "Grill the marinated fish on a preheated grill or oven till golden and crisp on both sides or for 5 minutes. Transfer to a plate.",
    FoodRecepie: [
      { id: 1, img1: images.meat, name: "Fish", piece: "5 Slices" },
      { id: 2, img1: images.brocoli, name: "Brocoli", piece: "2 Pcs" },
      { id: 3, img1: images.tomato, name: "Tomato", piece: "2 Pcs" },
      { id: 4, img1: images.corn, name: "Corn", piece: "1 Pcs" },
    ],
  },
  {
    id: 4,
    name: "Fruity Nuggets",
    description:
      "Healthy and fruity nuggets with lemon and blue berry toppings.",
    image: images.nugetposter,
    regular: images.commonPoster,

    serve: "5 serve",
    minutes: "45 min",
    desc: "Grilled Fish Steak is a delicious Mediterranean recipe made by marinating fish fillets in garlic, green chilies and a blend of spices.Tender fish fillets smeared in a simple marinade of lime juice and salt, seared golden. Delicious, isn't it?",
    strstep1: "Step 1",
    strstep2: "Step 2",
    strstep3: "Step 3",
    step1:
      "To prepare this amazing non-vegetarian recipe, take the fish fillets and massage it gently with oil, keep aside in a plate.",
    step2:
      "Grind together the garlic, turmeric powder, red chilli powder, green chillies, dill leaves, coriander powder, and salt. Add oil to it and grind to form a paste. Rub this all over the fish fillets and keep aside to marinate for 15 to 30 minutes.",
    step3:
      "Grill the marinated fish on a preheated grill or oven till golden and crisp on both sides or for 5 minutes. Transfer to a plate.",
    FoodRecepie: [
      { id: 1, img1: images.meat, name: "Fish", piece: "5 Slices" },
      { id: 2, img1: images.brocoli, name: "Brocoli", piece: "2 Pcs" },
      { id: 3, img1: images.tomato, name: "Tomato", piece: "2 Pcs" },
      { id: 4, img1: images.corn, name: "Corn", piece: "1 Pcs" },
    ],
  },
  {
    id: 5,
    name: "Egg Omelet Curry",
    description:
      "Egg omelet curry mixed with Milky Paneer and Indian spicy vegetables.",
    image: images.omletposter,
    regular: images.commonPoster,

    serve: "2 serve",
    minutes: "35 min",
    desc: "Grilled Fish Steak is a delicious Mediterranean recipe made by marinating fish fillets in garlic, green chilies and a blend of spices.Tender fish fillets smeared in a simple marinade of lime juice and salt, seared golden. Delicious, isn't it?",
    strstep1: "Step 1",
    strstep2: "Step 2",
    strstep3: "Step 3",
    step1:
      "To prepare this amazing non-vegetarian recipe, take the fish fillets and massage it gently with oil, keep aside in a plate.",
    step2:
      "Grind together the garlic, turmeric powder, red chilli powder, green chillies, dill leaves, coriander powder, and salt. Add oil to it and grind to form a paste. Rub this all over the fish fillets and keep aside to marinate for 15 to 30 minutes.",
    step3:
      "Grill the marinated fish on a preheated grill or oven till golden and crisp on both sides or for 5 minutes. Transfer to a plate.",
    FoodRecepie: [
      { id: 1, img1: images.meat, name: "Fish", piece: "5 Slices" },
      { id: 2, img1: images.brocoli, name: "Brocoli", piece: "2 Pcs" },
      { id: 3, img1: images.tomato, name: "Tomato", piece: "2 Pcs" },
      { id: 4, img1: images.corn, name: "Corn", piece: "1 Pcs" },
    ],
  },
  {
    id: 6,
    name: "Mutton Kebab Nuggets",
    description: "Crunchy Mutton Kebabs with hot chilly toppings and sauce.",
    image: images.paneertikkaposter,
    regular: images.commonPoster,
    serve: "5 serve",
    minutes: "45 min",
    desc: "Grilled Fish Steak is a delicious Mediterranean recipe made by marinating fish fillets in garlic, green chilies and a blend of spices.Tender fish fillets smeared in a simple marinade of lime juice and salt, seared golden. Delicious, isn't it?",
    strstep1: "Step 1",
    strstep2: "Step 2",
    strstep3: "Step 3",
    step1:
      "To prepare this amazing non-vegetarian recipe, take the fish fillets and massage it gently with oil, keep aside in a plate.",
    step2:
      "Grind together the garlic, turmeric powder, red chilli powder, green chillies, dill leaves, coriander powder, and salt. Add oil to it and grind to form a paste. Rub this all over the fish fillets and keep aside to marinate for 15 to 30 minutes.",
    step3:
      "Grill the marinated fish on a preheated grill or oven till golden and crisp on both sides or for 5 minutes. Transfer to a plate.",
    FoodRecepie: [
      { id: 1, img1: images.meat, name: "Fish", piece: "5 Slices" },
      { id: 2, img1: images.brocoli, name: "Brocoli", piece: "2 Pcs" },
      { id: 3, img1: images.tomato, name: "Tomato", piece: "2 Pcs" },
      { id: 4, img1: images.corn, name: "Corn", piece: "1 Pcs" },
    ],
  },
];

export const SearchData = [
  {
    id: 1,
    name: "Food Spinners",
    desc: "Best spinner recipe.",
    image: images.search1,
  },
  {
    id: 2,
    name: "Color of Orange",
    desc: "Do you like oranges?",
    image: images.search2,
  },
  {
    id: 3,
    name: "Food Spinners",
    desc: "Best spinner recipe.",
    image: images.search1,
  },
];

export const TimerData = [
  {
    id: 1,
    time: "15m",
  },
  {
    id: 2,
    time: "30m",
  },
  {
    id: 3,
    time: "45m",
  },
  {
    id: 4,
    time: "60m",
  },
];

export const FoodCategory = [
  {
    id: 1,
    food: "Indian",
  },
  {
    id: 2,
    food: "Chinese",
  },
  {
    id: 3,
    food: "Italian",
  },
];

export const FoodProtein = [
  { id: 1, title: "Protein", gram: "45g" },
  { id: 2, title: "Calories", gram: "220g" },
  { id: 3, title: "Fat", gram: "46g" },
  { id: 4, title: "Carb", gram: "105g" },
];

export const FoodIngridient = [
  {
    id: 1,
    title: "Bread",
    slices: "2 slices",
    image: images.ingredient1,
  },
  {
    id: 2,
    title: "Spinach",
    slices: "5 gm",
    image: images.ingredient2,
  },
  {
    id: 3,
    title: "Meat",
    slices: "1 patty",
    image: images.ingredient3,
  },
  {
    id: 4,
    title: "Cheese",
    slices: "2 pieces",
    image: images.ingredient4,
  },
];
