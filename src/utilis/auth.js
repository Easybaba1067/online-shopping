import { auth, db } from "./firbase-utils";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  EmailAuthProvider,
  linkWithCredential,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
} from "firebase/auth";

// Configure Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Detect mobile/tablet
const isMobileOrTablet = () =>
  /Mobi|Android|iPad|iPhone/i.test(navigator.userAgent);

// --- Google Sign-In ---
export const signInWithGoogle = async () => {
  try {
    if (isMobileOrTablet()) {
      // Mobile/tablet → redirect flow
      await signInWithRedirect(auth, googleProvider);
    } else {
      // Desktop → popup flow
      const result = await signInWithPopup(auth, googleProvider);
      return await handleUser(result.user);
    }
  } catch (error) {
    console.error("Google sign-in error:", error.message);
    throw error;
  }
};

// Complete redirect flow (call this on app load)
export const completeGoogleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      return await handleUser(result.user);
    }
  } catch (error) {
    console.error("Redirect completion error:", error.message);
    throw error;
  }
};

// Helper to create or fetch user doc
const handleUser = async (user) => {
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
};

// --- Email Sign-Up ---
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
      { merge: true },
    );
    return user;
  } catch (error) {
    console.error("Email sign-up error:", error.message);
    throw error;
  }
};

// --- Email Login ---
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Email login error:", error.message);
    throw error;
  }
};

// --- Logout ---
export const logout = async () => {
  try {
    await signOut(auth);
    return "User signed out";
  } catch (error) {
    throw error;
  }
};

// --- Link Email to Google Account ---
export const linkEmailToGoogleAccount = async (password) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("No user is currently signed in.");
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password,
    );
    const result = await linkWithCredential(currentUser, credential);
    return result.user;
  } catch (error) {
    console.error("Error linking account:", error.message);
    throw error;
  }
};
