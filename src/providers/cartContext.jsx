import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./userContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../utilis/firbase-utils";
const initialState = {
  cartItems: [],
  totalPrice: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i.id === item.id);

      let updatedCart;
      if (existingItem) {
        updatedCart = state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedCart = [...state.cartItems, { ...item, quantity: 1 }];
      }

      const newTotal = updatedCart.reduce(
        (sum, i) => sum + Number(i.price) * i.quantity,
        0
      );
      return { cartItems: updatedCart, totalPrice: newTotal };
    }

    case "REMOVE_FROM_CART": {
      const filteredCart = state.cartItems.filter(
        (i) => i.id !== action.payload.id
      );
      const updatedTotal = filteredCart.reduce(
        (sum, i) => sum + Number(i.price) * i.quantity,
        0
      );
      return { cartItems: filteredCart, totalPrice: updatedTotal };
    }

    case "HYDRATE_CART":
      return {
        cartItems: action.payload.cartItems,
        totalPrice: action.payload.totalPrice,
      };

    default:
      return state;
  }
}

const CartContext = createContext({
  cartItems: [],
  totalPrice: 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const cartItems = (data.cartItems || []).map((i) => ({
          ...i,
          price: Number(i.price) || 0,
          quantity: Number(i.quantity) || 1,
        }));
        const totalPrice = cartItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
        dispatch({ type: "HYDRATE_CART", payload: { cartItems, totalPrice } });
      }
    });
    return unsubscribe;
  }, [user]);

  const addToCart = async (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const newCart = state.cartItems.find((i) => i.id === item.id)
          ? state.cartItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...state.cartItems, { ...item, quantity: 1 }];
        await updateDoc(userRef, { cartItems: newCart });
      } catch (error) {
        console.error("Firestore update failed:", error.message);
      }
    }
  };

  const removeFromCart = async (item) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
    if (user) {
      try {
        const newCart = state.cartItems.filter((i) => i.id !== item.id);
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { cartItems: newCart });
      } catch (error) {
        console.error("Firestore update failed:", error.message);
      }
    }
  };

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// --- Hook ---
export function useCart() {
  return useContext(CartContext);
}
