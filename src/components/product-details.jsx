import { Heart, HeartFill } from "react-bootstrap-icons";
import { useFavorites } from "../providers/favoriteContext";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css-files/shop.css";
import Popup from "./popupMessage";
import { useCart } from "../providers/cartContext";
import { useAuth } from "../providers/userContext";

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const { addToCart } = useCart();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    const exists = favorites.some((fav) => fav.id === product.id);
    setIsFavorite(exists);
  }, [favorites, product.id]);

  return (
    <>
      <div className="product-details">
        <img
          src={product.imageUrl}
          alt="product"
          style={{
            height: "400px",
            width: "400px",
          }}
        />
        <div className="details-flex">
          <h2>{product.name}</h2>
          <h3>${product.price}</h3>
          {isFavorite ? (
            <HeartFill
              style={{
                color: "red",
                background: "#ffff",
                padding: "5px",
                fontSize: "2rem",
                borderRadius: "10px",
              }}
              onClick={() => removeFromFavorites(product)}
            />
          ) : (
            <Heart
              style={{
                color: "#2b2dff",
                background: "#fff",
                padding: "5px",
                fontSize: "2rem",
                borderRadius: "10px",
              }}
              onClick={() => addToFavorites(product)}
            />
          )}
        </div>
        <div className="product-description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic dolores
          eligendi explicabo sunt atque eaque consequuntur amet facere,
          excepturi consequatur nulla provident repellendus perspiciatis
          accusamus illo, aliquid natus. Fugit aliquid eligendi voluptate
          doloremque dolorem fuga rem tenetur tempore quisquam quos, expedita
          qui illo nihil! Soluta, similique iure? Quasi, itaque ea?
        </div>
        <button onClick={handleAddToCart}>Add to cart</button>
        <Popup message="Added to cart!" show={showPopup} />
      </div>
    </>
  );
};

export default Details;
