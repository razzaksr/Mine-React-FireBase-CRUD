// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json"); // Path to your service key

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   messagingSenderId: "223129812762", // Replace with your Firebase sender ID
// });

// const db = admin.firestore();
// const messaging = admin.messaging();

// module.exports = { db, messaging };
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMYje85m2sxmVjsQMK8SNOkDALpL3HNzA",
  authDomain: "react-fire-crud-81818.firebaseapp.com",
  projectId: "react-fire-crud-81818",
  storageBucket: "react-fire-crud-81818.firebasestorage.app",
  messagingSenderId: "223129812762",
  appId: "1:223129812762:web:aaa75a7752cfd29b9f76a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const messaging = getMessaging(app);

// Request Notification Permission
export const requestNotificationPermission = async () => {
  try {
    const token = await getToken(messaging, { vapidKey:"BNIZ8S4CU726pI63ft3JvcDMXnfEm4QczaEa6ak4nKVE7VRXx0FiwuqqaQV_T_gzwy6F6zGncUIX24f68kHChyo"});
    console.log("FCM Token:", token);
  } catch (error) {
    console.error("Error getting FCM token", error);
  }
};

export {db, auth, messaging, getToken, onMessage}