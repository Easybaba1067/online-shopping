import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "./userContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../utilis/firbase-utils";

const initialState = {
  favorites: [],
};

function favoriteReducer(state, action) {
  switch (action.type) {
    case "HYDRATE_FAVORITES":
      return { favorites: action.payload };

    case "ADD_TO_FAVORITES":
      if (state.favorites.find((i) => i.id === action.payload.id)) {
        return state; // already in favorites
      }
      return { favorites: [...state.favorites, action.payload] };

    case "REMOVE_FROM_FAVORITES":
      return {
        favorites: state.favorites.filter((i) => i.id !== action.payload.id),
      };

    default:
      return state;
  }
}

// ✅ Safe defaults
const FavoriteContext = createContext({
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
});

export function FavoriteProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const favorites = (data.wishlist || []).filter((i) => i && i.id);
        dispatch({ type: "HYDRATE_FAVORITES", payload: favorites });
      }
    });
    return unsubscribe;
  }, [user]);

  const addToFavorites = async (item) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: item });
    if (user) {
      try {
        const newFavorites = [...state.favorites, item];
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { wishlist: newFavorites });
      } catch (error) {
        console.error("Firestore update failed:", error.message);
      }
    }
  };

  const removeFromFavorites = async (item) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: item });
    if (user) {
      try {
        const newFavorites = state.favorites.filter((i) => i.id !== item.id);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { wishlist: newFavorites });
      } catch (error) {
        console.error("Firestore update failed:", error.message);
      }
    }
  };

  return (
    <FavoriteContext.Provider
      value={{ ...state, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}
