import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-uPNB9K-yF7di4OzKalFYcZmmyfL87mI",
  authDomain: "uploadingfileproject.firebaseapp.com",
  projectId: "uploadingfileproject",
  storageBucket: "uploadingfileproject.appspot.com",
  messagingSenderId: "392258069975",
  appId: "1:392258069975:web:cbffa3a2f3a0571d779792",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
