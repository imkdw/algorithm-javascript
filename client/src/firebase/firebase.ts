import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBFvCp8H-xFu_g4nJHg25y5taH6mXtY_dI",
  authDomain: "fcm-test-a6d05.firebaseapp.com",
  projectId: "fcm-test-a6d05",
  storageBucket: "fcm-test-a6d05.appspot.com",
  messagingSenderId: "854933668946",
  appId: "1:854933668946:web:c224230886e0ba49e6cb8b",
  measurementId: "G-SCLX5M2NGS",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export default app;
