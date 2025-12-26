import { useEffect, useState } from "react";
import Card from "./card";
import "../css-files/shop.css";
import { useLocation } from "react-router-dom";
import useProducts from "../providers/productlist-provider";
import Spinner from "./spinner.component";

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("q");
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (search) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : filteredProducts.length > 0 ? (
        <div className="category-container">
          <div className="category-flex">
            {filteredProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="nothing-here">
          <h2>Product not found</h2>
        </div>
      )}
    </>
  );
};

export default Search;
