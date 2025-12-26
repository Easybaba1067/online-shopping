import { useEffect, useState } from "react";
import "../css-files/nav.css";

const MainView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      title: "The best ",
      image: "/—Pngtree—happy man holding shopping bags_21724227.png",
      text: "“bringing shopping to you covinently at home,  \nEverything you love, at prices you'll adore.”",
    },
    {
      title: "Latest fashion",
      image: "/—Pngtree—family shopping fun a joyful_20509273.png",
      text: "“Shop smart, Live stylish.”",
    },
    {
      title: "Quick delivery ",
      image: "/pngtree-happy-woman-holding-shopping-bags.png",
      text: " “Your favorites, delivered faster.”",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const image = images[currentIndex];
  return (
    <>
      <div className="main-container">
        <div className="view-paragraph">
          <h1>{image.title}</h1>
          <p
            style={{
              whiteSpace: "pre-line",
              boxShadow: "2px 2px 5px rgba(31, 32, 34, 0.8)",
            }}
          >
            {image.text}
          </p>
        </div>
        <div className="view-image">
          <img src={image.image} alt="shopping" style={{ width: "300px" }} />
        </div>
      </div>
    </>
  );
};
export default MainView;
