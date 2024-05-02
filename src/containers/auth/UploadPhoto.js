// Library Imports
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Alert,
} from "react-native";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORE,
} from "../../../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

// Local Imports
import { styles } from "../../themes";
import { colors } from "../../themes/colors";
import { moderateScale } from "../../common/constants";
import images from "../../assets/images";
import CText from "../../components/common/CText";
import { CommonString } from "../../i18n/String";
import CButton from "../../components/common/CButton";
import typography from "../../themes/typography";
import { AuthNav } from "../../navigation/NavigationKeys";
import { LoginButton } from "../../components/common/CLoginButton";

// Upload Photo component
const UploadPhoto = ({ navigation }) => {
  // All state for the change value
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState(null);
  const [url, setUrl] = useState("");

  const storage = FIREBASE_STORE;
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;

  // add the profile picture  in firestore data
  const setUserProfile = async () => {
    const user = auth.currentUser.uid;
    const userRef = query(collection(db, "users"), where("uid", "==", user));
    const findUsers = await getDocs(userRef);
    findUsers.forEach(async (user) => {
      const getUser = doc(db, "users", user.id);
      await updateDoc(getUser, {
        image: url,
      });
    });
  };

  // upload image on firebase storage
  const onPressUploadImage = async () => {
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
      xhr.open("GET", picture, true);
      xhr.send(null);
    });
    // set metadata of image
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };
    // upload image on storage
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "Categories/" + Date.now());
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
          setUrl(downloadURL);
        });
      }
    );
  };

  // onPress Button for Upload image
  const ProfileUpload = async () => {
    if (picture) {
      await onPressUploadImage();
      Alert.alert("Image Uploaded Don't Upload Twice");
    } else {
      Alert.alert(CommonString.erruploadimg);
    }
  };

  // After image set the navigation to the next page
  const imageOpen = () => {
    !picture ? setOpen(true) : ImageSave();
  };

  // To save the image In Firebase Storage
  const ImageSave = async () => {
    if (url) {
      await setUserProfile();
      setPicture(null);
      setUrl(null);
      navigation.navigate(AuthNav.AllowNotification);
    } else {
      alert(CommonString.wait);
    }
  };

  // onPress for the next page
  const onSkip = () => {
    navigation.navigate(AuthNav.AllowNotification);
  };

  // onPress function for the Pick image from gallery
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setPicture(result.assets[0].uri);
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
    setOpen(false);
  };

  // onPress function for the open camera
  const uploadImage = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setPicture(result.assets[0].uri);
      }
    } catch (err) {
      alert(CommonString.erruploadimg + err);
    }
    setOpen(false);
  };
  return (
    <View style={localStyles.main}>
      <View style={localStyles.innerview}>
        <Image source={images.logotextcolor} style={localStyles.logo} />
        <CText type={"C22"} color={colors.fonttile}>
          {!picture ? CommonString.photoupload : CommonString.uploaded}
        </CText>
        <CText type={"E17"} color={colors.fontbody}>
          {!picture ? CommonString.uploaddesc : CommonString.uploadeddesc}
        </CText>
        <View style={localStyles.pageview}>
          <Image
            source={!picture ? images.uploadphoto : { uri: picture }}
            style={localStyles.uploadphoto}
          />
        </View>
        <Modal visible={open} transparent={true} animationType="fade">
          <View style={localStyles.centerview}>
            <View style={localStyles.innerview1}>
              <Text style={localStyles.choose}>Choose Photo</Text>
              <View style={localStyles.photos}>
                <Entypo
                  name="camera"
                  style={localStyles.galleryicon}
                  onPress={uploadImage}
                />
                <MaterialIcons
                  name="add-to-photos"
                  style={localStyles.galleryicon}
                  onPress={pickImage}
                />
              </View>
              <CButton
                name={"Close"}
                extraSty={localStyles.closebtn}
                onPress={() => setOpen(false)}
              />
            </View>
          </View>
        </Modal>
        <View style={localStyles.btnview}>
          <LoginButton
            extratext={CommonString.upload}
            extrasty={styles.center}
            onPress={ProfileUpload}
          />
          <CButton
            name={!picture ? CommonString.photoupload : CommonString.continue}
            onPress={imageOpen}
          />
          <TouchableOpacity onPress={onSkip}>
            {!picture ? (
              <CText type={"K17"} color={colors.green} align={"center"}>
                {CommonString.skip}
              </CText>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const localStyles = StyleSheet.create({
  main: {
    ...styles.flex,
    backgroundColor: colors.white,
  },
  innerview: {
    ...styles.flex,
    ...styles.mh15,
  },
  logo: {
    height: moderateScale(24),
    width: moderateScale(60),
    ...styles.mv40,
  },
  uploadphoto: {
    height: moderateScale(280),
    width: moderateScale(280),
    resizeMode: "contain",
    ...styles.selfCenter,
  },

  pageview: {
    ...styles.flexCenter,
  },
  btnview: {
    gap: moderateScale(20),
    ...styles.mv30,
  },
  centerview: {
    ...styles.flexCenter,
    ...styles.mt15,
  },
  innerview1: {
    backgroundColor: colors.btncolor,
    ...styles.p30,
    borderRadius: moderateScale(20),
    elevation: moderateScale(10),
  },
  photos: {
    ...styles.flexRow,
  },
  galleryicon: {
    ...typography.fontSizes.f35,
    margin: moderateScale(35),
  },
  choose: {
    ...typography.fontSizes.f20,
    ...styles.selfCenter,
    ...typography.fontWeights.CoiniRegular,
  },
  closebtn: {
    width: moderateScale(200),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
});
