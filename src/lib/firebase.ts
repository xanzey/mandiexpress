
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7-zoVT79X82jDwzEW0N5IBlfV0-fqHgo",
  authDomain: "mandiexpress-40url.firebaseapp.com",
  projectId: "mandiexpress-40url",
  storageBucket: "mandiexpress-40url.firebasestorage.app",
  messagingSenderId: "74214106113",
  appId: "1:74214106113:web:6f72472662b4e284618c00"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);

export { app, auth };
