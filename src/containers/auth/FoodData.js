import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import images from "../../assets/images";
import { moderateScale } from "../../common/constants";
import CTextInput from "../../components/common/CTextInput";
import { CommonString } from "../../i18n/String";
import typography from "../../themes/typography";
import CText from "../../components/common/CText";
import CButton from "../../components/common/CButton";
import * as ImagePicker from "expo-image-picker";
import { FIREBASE_DB, FIREBASE_STORE } from "../../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CommonInput = ({
  placeholder,
  label,
  value,
  onChangeText,
  keyboardType,
}) => {
  return (
    <View style={localStyles.inputview}>
      <CText type={"E15"} color={colors.fontbody} style={localStyles.label}>
        {label}
      </CText>
      <TextInput
        placeholder={placeholder}
        style={localStyles.inputsty}
        textAlignVertical={"top"}
        multiline
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default function FoodData() {
  const [adminData, setAdminData] = useState({
    name: "",
    subtitle: "",
    description: "",
    image: null,
    step1: "",
    step2: "",
    step3: "",
    minutes: "",
    serve: "",
    url: "",
  });

  const storage = FIREBASE_STORE;
  const db = FIREBASE_DB;

  const uploadImage = async () => {
    // convert image into blob image

    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", adminData.image, true);
      xhr.send(null);
    });

    // set metadata of image
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };
    // upload image on storage
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "RecepieImg/" + Date.now());
    const uploadTask = uploadBytesResumable(storageRef, blobImage, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAdminData({ ...adminData, url: downloadURL });
        });
      }
    );
  };

  const onPressImageUpload = async () => {
    if (adminData.image) {
      await uploadImage();
      Alert.alert("Image Uploaded Don't Upload Twice");
    } else {
      alert(CommonString.erruploadimg);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setAdminData({ ...adminData, image: result.assets[0].uri });
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
  };
  const onChanageRecepie = (item) => {
    setAdminData({ ...adminData, name: item });
  };
  const onChanageSubtitle = (item) => {
    setAdminData({ ...adminData, subtitle: item });
  };
  const onChanageDescription = (item) => {
    setAdminData({ ...adminData, description: item });
  };
  const onChanageStep1 = (item) => {
    setAdminData({ ...adminData, step1: item });
  };
  const onChanageStep2 = (item) => {
    setAdminData({ ...adminData, step2: item });
  };
  const onChanageStep3 = (item) => {
    setAdminData({ ...adminData, step3: item });
  };
  const onChanageMinutes = (item) => {
    setAdminData({ ...adminData, minutes: item });
  };
  const onChanageServe = (item) => {
    setAdminData({ ...adminData, serve: item });
  };

  const onPressSendData = async () => {
    if (
      !adminData.name &&
      !adminData.subtitle &&
      !adminData.description &&
      !adminData.step1 &&
      !adminData.step2 &&
      !adminData.step3 &&
      !adminData.minutes &&
      !adminData.serve &&
      !adminData.url
    ) {
      Alert.alert("Please Fill all Data");
    } else {
      await addDoc(collection(db, "RecepieData"), {
        name: adminData.name,
        subtitle: adminData.subtitle,
        desc: adminData.description,
        step1: adminData.step1,
        step2: adminData.step2,
        step3: adminData.step3,
        minutes: adminData.minutes,
        serve: adminData.serve,
        url: adminData.url,
      });
      Alert.alert("Data Added Successfully");
    }
    setAdminData("");
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image source={images.logotextcolor} style={localStyles.logo} />
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                adminData.image
                  ? { uri: adminData.image }
                  : images.recepieprofile
              }
              style={localStyles.uploadphoto}
            />
          </TouchableOpacity>
          <CButton
            name={CommonString.uploadImg}
            extraSty={localStyles.uploadsty}
            onPress={onPressImageUpload}
          />
          <CTextInput
            value={adminData.name}
            onChangeText={onChanageRecepie}
            label={CommonString.recepiename}
            placeholder={CommonString.enterrecepie}
          />
          <CTextInput
            value={adminData.subtitle}
            onChangeText={onChanageSubtitle}
            label={CommonString.subtitle}
            placeholder={CommonString.entersubtitle}
          />
          <View style={localStyles.minuteview}>
            <View>
              <CText
                type={"E15"}
                color={colors.fontbody}
                style={localStyles.label}
              >
                {CommonString.minutes}
              </CText>
              <TextInput
                placeholder={CommonString.minutes}
                style={localStyles.input}
                value={adminData.minutes}
                onChangeText={onChanageMinutes}
              />
            </View>
            <View>
              <CText
                type={"E15"}
                color={colors.fontbody}
                style={localStyles.label}
              >
                {CommonString.serve}
              </CText>
              <TextInput
                placeholder={CommonString.servings}
                style={localStyles.input}
                keyboardType={"number-pad"}
                value={adminData.serve}
                onChangeText={onChanageServe}
              />
            </View>
          </View>
          <CommonInput
            placeholder={CommonString.desc}
            label={CommonString.desc}
            value={adminData.description}
            onChangeText={onChanageDescription}
          />
          <CommonInput
            placeholder={CommonString.step1}
            label={CommonString.step1}
            value={adminData.step1}
            onChangeText={onChanageStep1}
          />
          <CommonInput
            placeholder={CommonString.step2}
            label={CommonString.step2}
            value={adminData.step2}
            onChangeText={onChanageStep2}
          />
          <CommonInput
            placeholder={CommonString.step3}
            label={CommonString.step3}
            value={adminData.step3}
            onChangeText={onChanageStep3}
          />
          <CButton
            name={CommonString.addrecepie}
            extraSty={localStyles.btnsty}
            onPress={onPressSendData}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.mh15,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    alignSelf: "center",
    ...styles.mv20,
  },
  uploadphoto: {
    height: moderateScale(100),
    width: moderateScale(100),
    resizeMode: "contain",
    ...styles.selfCenter,
    borderRadius: 50,
  },
  inputsty: {
    height: moderateScale(150),
    backgroundColor: colors.pwhite,
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(20),
    borderColor: colors.borders,
    ...styles.p20,
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
  btnsty: {
    ...styles.mv20,
  },
  minuteview: {
    ...styles.flexcenterrow,
    ...styles.justifyBetween,
    ...styles.mt20,
  },

  input: {
    width: moderateScale(170),
    backgroundColor: colors.pwhite,
    borderWidth: moderateScale(3),
    borderRadius: moderateScale(20),
    borderColor: colors.borders,
    ...styles.p20,
    ...typography.fontSizes.f14,
    ...typography.fontWeights.ExtraBold,
  },
  uploadsty: {
    width: moderateScale(115),
    height: moderateScale(35),
    ...styles.mt10,
  },
});
