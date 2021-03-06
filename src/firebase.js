import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBDUEpxoBEs2TGMJoJ3dmvp7D8IMpCZNRQ",
    authDomain: "class-84dd8.firebaseapp.com",
    projectId: "class-84dd8",
    storageBucket: "class-84dd8.appspot.com",
    messagingSenderId: "859362613250",
    appId: "1:859362613250:web:26fad6aa893e3d075b6f1b",
    measurementId: "G-YDFH9T8KMH"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};

export { app, auth, db, signInWithGoogle, logout };
