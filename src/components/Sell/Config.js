
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDwEAOPfeuDR7_ZxJd5Ao8jzpKvi2RDau0",
  authDomain: "torentoimg.firebaseapp.com",
  projectId: "torentoimg",
  storageBucket: "torentoimg.appspot.com",
  messagingSenderId: "200048052360",
  appId: "1:200048052360:web:8ccf05b9c1713cd8fdf73d"
};
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)