import "../css-files/home.css";
import { useState, useEffect, useRef } from "react";
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

  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 },
    );

    const currentRef = cardRef.current; // 👈 capture the ref value once

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef); // 👈 use captured value
    };
  }, []);

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
      <div
        ref={cardRef}
        className={`card-container ${isVisible ? "slide-in" : ""}`}
      >
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
