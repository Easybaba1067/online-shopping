import { useState, useEffect, useRef } from "react";
import "../css-files/home.css";
import { Link } from "react-router-dom";

const FrontCard = ({ logo, tag }) => {
  const [hover, setHover] = useState(false);

  // 👇 Animation state + ref
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

    const currentRef = cardRef.current; // capture ref value once

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`front-card-container ${isVisible ? "slide-in" : ""}`}
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: hover ? "150%" : "cover",
        backgroundPosition: "center",
        transition: "background-size 1s ease-in-out",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h1>{tag.charAt(0).toUpperCase() + tag.slice(1)}</h1>
      <div className="front-card-button">
        <Link to={tag}>
          <button>Shop now</button>
        </Link>
      </div>
    </div>
  );
};

export default FrontCard;
