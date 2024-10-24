import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeBm4wnSY4sa3Ne7McH1riUDNfvu7Kv8c",
  authDomain: "complexivo2-613a5.firebaseapp.com",
  projectId: "complexivo2-613a5",
  storageBucket: "complexivo2-613a5.appspot.com",
  messagingSenderId: "621159916238",
  appId: "1:621159916238:web:4fb189978b4f84b5cf669f"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };
