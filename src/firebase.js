import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyB5J2XGkD62LQmHsddQGKMO8QA0ry4oX1o",
  authDomain: "dad1234-1d3d9.firebaseapp.com",
  projectId: "dad1234-1d3d9",
  storageBucket: "dad1234-1d3d9.appspot.com",
  messagingSenderId: "939033873736",
  appId: "1:939033873736:web:18eb26d2c4aa593bfff77d",
  measurementId: "G-VQJLRCGY8P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const analytics = getAnalytics(app);
const storage=getStorage(app);
export { app, auth, db,storage ,analytics};


