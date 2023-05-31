import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDKgptBFErbrG5wfEi9_9iqqvVq7S4pYtg",
  authDomain: "otfts-5926e.firebaseapp.com",
  projectId: "otfts-5926e",
  storageBucket: "otfts-5926e.appspot.com",
  messagingSenderId: "132229772583",
  appId: "1:132229772583:web:a7064c5e49f2c5868f6502",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
export { app, database, storage };
