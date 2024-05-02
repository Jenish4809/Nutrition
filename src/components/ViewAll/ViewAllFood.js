// Library Imports
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CText from "../common/CText";
import { CommonString } from "../../i18n/String";
import { moderateScale } from "../../common/constants";
import { Image } from "react-native";
import { StackNav } from "../../navigation/NavigationKeys";

const ViewAllFood = ({ navigation }) => {
  const [allFood, setAllFood] = useState();

  const db = FIREBASE_DB;

  // useeffct for get the food data from firebase
  useEffect(() => {
    const foodRef1 = collection(db, "fooddata");
    const food1 = onSnapshot(foodRef1, {
      next: (snapshot) => {
        const foods = [];
        snapshot.docs.forEach((doc) => {
          foods.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setAllFood(foods);
      },
    });
    return () => food1();
  }, []);

  // onPress for go to the detail of food
  const handleOnpress12 = (item) => {
    navigation.navigate(StackNav.LikedFoodDesc, { item });
  };

  // render food items on ui
  const renderFood = ({ item }) => {
    return (
      <TouchableOpacity
        style={localStyles.allrenderview}
        onPress={() => handleOnpress12(item)}
      >
        <Image
          source={{ uri: item.profileImage }}
          style={localStyles.burgerimage}
        />
        <CText type={"C20"} color={colors.fontbody}>
          {item.foodName}
        </CText>
      </TouchableOpacity>
    );
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <CText align={"center"} type={"C30"} color={colors.green}>
          {CommonString.allfood}
        </CText>
        <FlatList
          data={allFood}
          renderItem={renderFood}
          numColumns={2}
          contentContainerStyle={localStyles.renderdatasty}
          columnWrapperStyle={localStyles.rendercolumndata}
        />
      </View>
    </View>
  );
};

export default ViewAllFood;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mt20,
  },
  allrenderview: {
    ...styles.flexcenterrow,
    height: moderateScale(72),
    width: moderateScale(160),
    backgroundColor: colors.recepiecard,
    borderRadius: moderateScale(16),
    ...styles.justifyEvenly,
    ...styles.mt20,
    borderWidth: moderateScale(1),
    borderColor: colors.posterborder,
  },
  burgerimage: {
    height: moderateScale(36),
    width: moderateScale(36),
    resizeMode: "contain",
  },
  renderdatasty: {
    ...styles.ph20,
  },
  rendercolumndata: {
    ...styles.justifyBetween,
  },
});
