
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore"
// const firebaseConfig = {
//   apiKey: "AIzaSyDwEAOPfeuDR7_ZxJd5Ao8jzpKvi2RDau0",
//   authDomain: "torentoimg.firebaseapp.com",
//   projectId: "torentoimg",
//   storageBucket: "torentoimg.appspot.com",
//   messagingSenderId: "200048052360",
//   appId: "1:200048052360:web:8ccf05b9c1713cd8fdf73d"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBuUeQ2mMhQIg886elBNY1m-S7GWOZzz4o",
  authDomain: "chatapp-caf47.firebaseapp.com",
  projectId: "chatapp-caf47",
  storageBucket: "chatapp-caf47.appspot.com",
  messagingSenderId: "322601331836",
  appId: "1:322601331836:web:22e07d6900e04523bd6df9",
  measurementId: "G-B3XN1MSG0P"
};
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)