// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.9.4/firebase-firestore.js"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD_HY9T7dwzj97BnWxLdyJiuLzryX4HyA",
  authDomain: "cwc-app-224f8.firebaseapp.com",
  databaseURL: "https://cwc-app-224f8-default-rtdb.firebaseio.com",
  projectId: "cwc-app-224f8",
  storageBucket: "cwc-app-224f8.appspot.com",
  messagingSenderId: "599712931011",
  appId: "1:599712931011:web:3ec75ff8781b9a553c9676",
  measurementId: "G-NH8LQT0KCE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docData = {
  stringExample: "Hello world!",
  booleanExample: true,
  numberExample: 3.14159265,
  arrayExample: [5, true, "hello"],
  nullExample: null,
  objectExample: {
    a: 5,
    b: {
      nested: "foo",
    },
  },
};
await fetch("https://ipapi.co/json/").then((res) => {
  res.json().then((val) => {
    const ip = val["ip"];
    const docRef = doc(db, `figma-visitors/${ip}`);
    // console.log(country);
    // console.log(city);
    // console.log(region);
    getDoc(docRef).then((res) => {
      if (res.data() != null) {
        updateDoc(docRef, {
          visits: res.data()["visits"] + 1,
          lastVisitUTC: new Date().toUTCString(),
          ...val,
        })
          .then(
            (res) => {
              //   console.log(res.data());
            }
            // alert(`success and visits are ${res.data()["visits"] + 1}`)
          )
          .catch(
            (err) => {}
            //   console.log(err)
          );
      } else {
        setDoc(docRef, {
          visits: 1,
          lastVisitUTC: new Date().toUTCString(),
          ...val,
          //   lastVisit: new Date().toUTCString(),
        })
          .then(
            () => {
              //   console.log(res.data());
            }
            // alert(`success and visits are ${1}`)
          )
          .catch((err) => {});
      }
    });
  });
});
