import { collection, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";

const db = FIREBASE_DB;

export const newDataHere = async (dbname) => {
  const querySnapshot = await getDocs(collection(db, dbname));
  const docs = querySnapshot.docs;
  const foods = docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return foods;
};
