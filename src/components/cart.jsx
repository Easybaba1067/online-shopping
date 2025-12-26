import CardItem from "./cart-items.component";
import "../css-files/cart.css";
import "../css-files/shop.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../providers/cartContext";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/userContext";

const Cart = () => {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [newCartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);

  return (
    <>
      {newCartItems.length > 0 ? (
        <div className="cart-container">
          <h1>My cart</h1>
          {newCartItems.map((item) => {
            return <CardItem key={item.id} item={item} />;
          })}
          <div className="checkout">
            <h4>Total = {totalPrice}</h4>

            <p
              onClick={() => {
                if (user) {
                  navigate("check-out", { state: { totalPrice } });
                } else {
                  navigate("/signin");
                }
              }}
            >
              Proceed to checkout
            </p>
          </div>
        </div>
      ) : (
        <div className="nothing-here">
          <h2>Add item(s) to your cart!</h2>
        </div>
      )}
    </>
  );
};
export default Cart;
