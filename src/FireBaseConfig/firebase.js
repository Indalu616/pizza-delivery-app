import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import { getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "../Secret";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth=new GoogleAuthProvider()
export const db = getFirestore(app);
export const storage=getStorage(app)
