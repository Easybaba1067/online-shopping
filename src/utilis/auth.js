import { auth, db } from "./firbase-utils";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists()) {
      return { user, isNew: false };
    } else {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
        cartItems: [],
        wishlist: [],
      });
      return { user, isNew: true };
    }
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    throw error;
  }
};

export const registerWithEmail = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await setDoc(
      doc(db, "users", user.uid),
      {
        name,
        email,
        createdAt: new Date(),
        cartItems: [],
        wishlist: [],
      },
      { merge: true }
    );
    return user;
  } catch (error) {
    console.error("Email sign-up error:", error.message);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Email login error:", error.message);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return "User signed out";
  } catch (error) {
    throw error;
  }
};

export const linkEmailToGoogleAccount = async (password) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No user is currently signed in.");
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    const result = await linkWithCredential(currentUser, credential);
    return result.user;
  } catch (error) {
    console.error("Error linking account:", error.message);
    throw error;
  }
};
