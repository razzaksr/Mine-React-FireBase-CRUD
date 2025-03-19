import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import { auth, onMessage, requestNotificationPermission } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import App from "./App";

const Main = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Listen for authentication state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     requestNotificationPermission(); // Request FCM permission

//     return () => unsubscribe(); // Cleanup on unmount
//   }, []);

//   return (
//     <div>
//       <h1>Firebase CRUD App</h1>
//       <Auth setUser={setUser} />
//       {user ? <App /> : <p>Please log in to access data.</p>}
//     </div>
//   );
    const [user, setUser] = useState(null);

    useEffect(() => {
    requestNotificationPermission();
    onMessage((payload) => {
        console.log("Message received:", payload);
    });
    }, []);

    return (
    <div>
        <h1>Firebase CRUD App</h1>
        <Auth setUser={setUser} />
        {user && <App />}
    </div>
    );
};

export default Main;
