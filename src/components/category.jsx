import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./card";
import "../css-files/shop.css";
import useProducts from "../providers/productlist-provider";
import Spinner from "./spinner.component";

const Category = () => {
  const { category } = useParams();
  const [newProducts, setNewProducts] = useState([]);
  const { products, loading } = useProducts();
  useEffect(() => {
    setNewProducts(
      products.filter(
        (product) =>
          product.sex === category ||
          product.type === category ||
          product.category === category
      )
    );
  }, [category, products]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : newProducts.length > 0 ? (
        <div className="category-container">
          <h1>{category[0].toUpperCase() + category.slice(1) + " store"}</h1>
          <div className="category-flex">
            {newProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="nothing-here">
          <h2>Nothing here!</h2>
        </div>
      )}
    </>
  );
};

export default Category;
