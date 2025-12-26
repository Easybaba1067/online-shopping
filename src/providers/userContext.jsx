import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../utilis/firbase-utils";
import "../css-files/shop.css";
import {
  loginWithEmail,
  registerWithEmail,
  signInWithGoogle,
  logout,
} from "../utilis/auth";
import Spinner from "../components/spinner.component";

const AuthContext = createContext({
  user: null,
  loading: true,
  loginWithEmail: async () => {},
  registerWithEmail: async () => {},
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const userDocSnap = await getDoc(doc(db, "users", currentUser.uid));
          if (userDocSnap.exists()) {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              ...userDocSnap.data(),
            });
          } else {
            setUser({
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || "Anonymous",
            });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Auth context error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Spinner /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
