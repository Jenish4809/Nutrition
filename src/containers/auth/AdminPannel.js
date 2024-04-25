import {
  View,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import CTextInput from "../../components/common/CTextInput";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import { CommonString } from "../../i18n/String";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import typography from "../../themes/typography";
import CText from "../../components/common/CText";
import CButton from "../../components/common/CButton";
import { FIREBASE_DB, FIREBASE_STORE } from "../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AdminPannel = () => {
  const [adminData, setAdminData] = useState({
    foodName: "",
    ingredient: "",
    desc1: "",
    desc2: "",
    image: null,
    picture: null,
    downloadUrl: "",
  });

  const storage = FIREBASE_STORE;
  const db = FIREBASE_DB;

  // useEffect(() => {
  //   const uploadImage = async () => {
  //     // convert image into blob image

  //     const blobImage = await new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = function () {
  //         reject(new TypeError("Network request failed"));
  //       };
  //       xhr.responseType = "blob";
  //       xhr.open("GET", adminData.image, true);
  //       xhr.send(null);
  //     });

  //     // set metadata of image
  //     /** @type {any} */
  //     const metadata = {
  //       contentType: "image/jpeg",
  //     };
  //     // upload image on storage
  //     // Upload file and metadata to the object 'images/mountains.jpg'
  //     const storageRef = ref(storage, "foodata/" + Date.now());
  //     const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

  //     // Listen for state changes, errors, and completion of the upload.
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //         }
  //       },
  //       (error) => {
  //         // A full list of error codes is available at
  //         // https://firebase.google.com/docs/storage/web/handle-errors
  //         switch (error.code) {
  //           case "storage/unauthorized":
  //             // User doesn't have permission to access the object
  //             break;
  //           case "storage/canceled":
  //             // User canceled the upload
  //             break;
  //           case "storage/unknown":
  //             // Unknown error occurred, inspect error.serverResponse
  //             break;
  //         }
  //       },
  //       () => {
  //         // Upload completed successfully, now we can get the download URL
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setAdminData({ ...adminData, downloadUrl: downloadURL });
  //           console.log(adminData.downloadUrl);
  //         });
  //       }
  //     );
  //   };
  //   if (adminData.image != null) {
  //     uploadImage();
  //   }
  // }, [adminData.image]);

  // useEffect(() => {
  //   const uploadImage = async () => {
  //     // convert image into blob image

  //     const blobImage = await new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = function () {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = function () {
  //         reject(new TypeError("Network request failed"));
  //       };
  //       xhr.responseType = "blob";
  //       xhr.open("GET", adminData.picture, true);
  //       xhr.send(null);
  //     });

  //     // set metadata of image
  //     /** @type {any} */
  //     const metadata = {
  //       contentType: "image/jpeg",
  //     };
  //     // upload image on storage
  //     // Upload file and metadata to the object 'images/mountains.jpg'
  //     const storageRef = ref(storage, "foodProfile/" + Date.now());
  //     const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

  //     // Listen for state changes, errors, and completion of the upload.
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //         }
  //       },
  //       (error) => {
  //         // A full list of error codes is available at
  //         // https://firebase.google.com/docs/storage/web/handle-errors
  //         switch (error.code) {
  //           case "storage/unauthorized":
  //             // User doesn't have permission to access the object
  //             break;
  //           case "storage/canceled":
  //             // User canceled the upload
  //             break;
  //           case "storage/unknown":
  //             // Unknown error occurred, inspect error.serverResponse
  //             break;
  //         }
  //       },
  //       () => {
  //         // Upload completed successfully, now we can get the download URL
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           setAdminData({ ...adminData, downloadUrl: downloadURL });
  //           console.log(adminData.downloadUrl);
  //         });
  //       }
  //     );
  //   };
  //   if (adminData.picture != null) {
  //     uploadImage();
  //   }
  // }, [adminData.picture]);

  const onChanageName = (item) => {
    setAdminData({ ...adminData, foodName: item });
  };
  const onChanageIngredient = (item) => {
    setAdminData({ ...adminData, ingredient: item });
  };
  const onChanageDesc1 = (item) => {
    setAdminData({ ...adminData, desc1: item });
  };
  const onChanageDesc2 = (item) => {
    setAdminData({ ...adminData, desc2: item });
  };

  const onPressSaveData = async () => {
    // if (
    //   !adminData.image &&
    //   !adminData.foodName &&
    //   !adminData.ingredient &&
    //   !adminData.desc1 &&
    //   !adminData.desc2
    // ) {
    //   Alert.alert("Please Feel all the Fields");
    // } else {
    //   await addDoc(collection(db, "fooddata"), {
    //     foodName: adminData.foodName,
    //     desc1: adminData.desc1,
    //     desc2: adminData.desc2,
    //     ingredient: adminData.ingredient,
    //     FoodImage: adminData.downloadUrl,
    //   });

    //}

    setAdminData("");
  };
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 3,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setAdminData({ ...adminData, image: result.assets });
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
  };

  const onPressPickFood = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setAdminData({ ...adminData, picture: result.assets[0].uri });
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <Image source={images.logotextcolor} style={localStyles.logo} />
            <TouchableOpacity onPress={onPressPickFood}>
              <Image
                source={
                  adminData.picture
                    ? { uri: adminData.picture }
                    : images.foodprofile
                }
                style={localStyles.uploadphoto}
              />
            </TouchableOpacity>
            <CTextInput
              placeholder={CommonString.foodname}
              label={CommonString.name}
              value={adminData.foodName}
              onChangeText={onChanageName}
              LeftIcon={() => (
                <Ionicons
                  name="fast-food-outline"
                  size={moderateScale(24)}
                  color={colors.gray}
                />
              )}
            />
            <CTextInput
              placeholder={CommonString.ingredient}
              label={CommonString.ingredient}
              value={adminData.ingredient}
              onChangeText={onChanageIngredient}
              LeftIcon={() => (
                <MaterialIcons
                  name="food-bank"
                  size={moderateScale(24)}
                  color={colors.gray}
                />
              )}
            />
            <View style={localStyles.inputview}>
              <CText
                type={"E15"}
                color={colors.fontbody}
                style={localStyles.label}
              >
                {CommonString.desc1}
              </CText>
              <TextInput
                value={adminData.desc1}
                onChangeText={onChanageDesc1}
                placeholder={CommonString.desc1}
                style={localStyles.inputsty}
                placeholderTextColor={colors.gray}
                multiline={true}
                textAlignVertical="top"
              />
            </View>
            <CText
              type={"E15"}
              color={colors.fontbody}
              style={localStyles.label}
            >
              {CommonString.desc2}
            </CText>
            <TextInput
              value={adminData.desc2}
              onChangeText={onChanageDesc2}
              placeholder={CommonString.desc2}
              style={localStyles.inputsty}
              placeholderTextColor={colors.gray}
              multiline={true}
              textAlignVertical="top"
            />
            {adminData.image ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {adminData.image &&
                  adminData.image.map((item, index) => {
                    return (
                      <View key={index}>
                        <Image source={item} style={localStyles.imageSty} />
                      </View>
                    );
                  })}
              </ScrollView>
            ) : (
              <TouchableOpacity
                style={localStyles.noimagesty}
                onPress={pickImage}
              >
                <Ionicons
                  name="images"
                  size={moderateScale(30)}
                  color={colors.gray}
                />
              </TouchableOpacity>
            )}

            <CButton
              name={CommonString.savedata}
              onPress={onPressSaveData}
              extraSty={localStyles.btnsty}
            />
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </View>
  );
};

export default AdminPannel;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    alignSelf: "center",
    ...styles.mv20,
  },
  innerview: {
    ...styles.mh15,
  },
  inputsty: {
    height: moderateScale(150),
    backgroundColor: colors.pwhite,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(20),
    borderColor: colors.borders,
    ...styles.p20,
    ...styles.mb20,
    ...typography.fontSizes.f17,
    ...typography.fontWeights.ExtraBold,
  },
  inputview: {
    ...styles.mt20,
  },
  label: {
    ...styles.mh10,
    ...styles.mv5,
  },
  uploadphoto: {
    height: moderateScale(100),
    width: moderateScale(100),
    resizeMode: "contain",
    ...styles.selfCenter,
    borderRadius: 50,
  },
  imageSty: {
    height: moderateScale(242),
    width: moderateScale(160),
    resizeMode: "cover",
    ...styles.m10,
    borderRadius: moderateScale(16),
    ...styles.mb20,
  },
  btnsty: {
    ...styles.mb20,
  },
  noimagesty: {
    height: moderateScale(242),
    width: moderateScale(160),
    backgroundColor: colors.pwhite,
    ...styles.mb20,
    ...styles.nonFlexCenter,
    borderRadius: moderateScale(16),
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.9,
    elevation: 5,
  },
});
