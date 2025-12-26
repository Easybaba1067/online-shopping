import { List, X } from "react-bootstrap-icons";
import Logo from "./logo.component";
import "../css-files/nav.css";
import NavSettings from "./navSettings.component";
import Nav from "./nav.component";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./searchbar.component";

const MobileNav = () => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isActive]);

  useEffect(() => {
    setIsActive(false);
  }, [location]);

  return (
    <>
      <div className="mobile-nav">
        <Logo />
        <SearchBar />
        <div className={`hambuger ${isActive ? "active" : ""}`}>
          <X
            className="x"
            onClick={() => setIsActive(!isActive)}
            style={{ fontSize: "2rem", color: "#2b2fffff" }}
          />

          <List
            className="list"
            onClick={() => setIsActive(!isActive)}
            style={{
              fontSize: "1.8rem",
              color: "#2b2fffff",
            }}
          />
        </div>
      </div>

      <div
        className={isActive ? "mobile-navigation active" : "mobile-navigation"}
      >
        <NavSettings />
        <Nav />
      </div>

      <div
        onClick={() => setIsActive(false)}
        className={isActive ? "overlay active" : "overlay"}
      ></div>
    </>
  );
};
export default MobileNav;
