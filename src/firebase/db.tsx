
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCNc7L5sZCQfWrIVshg6u1sd7rQW3wKPPY",
//   authDomain: "student-assistance-52d14.firebaseapp.com",
//   projectId: "student-assistance-52d14",
//   storageBucket: "student-assistance-52d14.firebasestorage.app",
//   messagingSenderId: "693492777546",
//   appId: "1:693492777546:web:d77c6425bfbe2edb45dcb3"
// };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);


// export const db = getFirestore(app);
// export {app, auth};





 import { initializeApp } from "firebase/app";
 import { getAuth } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};



 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);


 export const db = getFirestore(app);
 export {app, auth};