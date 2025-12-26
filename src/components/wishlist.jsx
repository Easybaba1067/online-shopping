import { useEffect, useState } from "react";
import "../css-files/shop.css";
import { useFavorites } from "../providers/favoriteContext";
import Card from "./card";

const Wishlist = () => {
  const { favorites } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    setFavoriteProducts(favorites);
  }, [favorites]);

  return (
    <>
      {favoriteProducts.length > 0 ? (
        <div className="category-container">
          <h1 style={{ fontFamily: " Courier New, Courier, monospace " }}>
            My Wishlist
          </h1>
          <div className="category-flex">
            {favoriteProducts.map((product) => {
              return <Card key={product.id} product={product} />;
            })}
          </div>
        </div>
      ) : (
        <div className="nothing-here">
          <h2>Add your Wishlist!</h2>
        </div>
      )}
    </>
  );
};
export default Wishlist;
