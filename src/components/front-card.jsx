import { useState } from "react";
import "../css-files/home.css";
import { Link } from "react-router-dom";
const FrontCard = ({ logo, tag }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="front-card-container"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: hover ? "150%" : "cover",
        backgroundPosition: "center",
        transition: "background-size 1s ease-in-out",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h1> {tag.charAt(0).toUpperCase() + tag.slice(1)}</h1>
      <div className="front-card-button">
        <Link to={tag}>
          <button>Shop now</button>
        </Link>
      </div>
    </div>
  );
};

export default FrontCard;
