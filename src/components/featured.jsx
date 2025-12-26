import Card from "./card";
import "../css-files/home.css";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";
import useProducts from "../providers/productlist-provider";
import SmallSpinner from "./small-component-loader";

const FeaturedProduct = ({ type }) => {
  const { products, loading } = useProducts();

  const featured = products
    .filter((product) => product.type === type)
    .slice(0, 4);

  if (loading) {
    return <SmallSpinner />;
  }

  return (
    <div className="featured-container">
      <Link to={type}>
        <h1>
          {type} products
          <ArrowRight
            style={{
              fontSize: "2rem",
              color: "#2b2dff",
              margin: "5px 10px",
            }}
          />
        </h1>
      </Link>
      <div className="featured-flex">
        {featured.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
