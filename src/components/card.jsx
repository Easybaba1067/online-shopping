import "../css-files/home.css";
import { useState } from "react";
import { useCart } from "../providers/cartContext";
import Popup from "./popupMessage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/userContext";

const Card = ({ product }) => {
  const { name, price, imageUrl, type } = product;
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } else {
      navigate("signin");
    }
  };

  return (
    <>
      <div className="card-container">
        <div
          className="liks"
          onClick={() => {
            navigate(`/product/${name}`, { state: { product } });
          }}
        >
          <img src={imageUrl} alt={name} />
          <div className="card-description">
            <h3>{name}</h3>
            <h3>${price}</h3>
          </div>
          {type && <p>{type}</p>}
        </div>
        <button onClick={handleAddToCart}>Add to cart</button>
        <Popup message="Added to cart!" show={showPopup} color={"green"} />
      </div>
    </>
  );
};

export default Card;
