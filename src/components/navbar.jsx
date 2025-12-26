import { Outlet } from "react-router-dom";
import "../css-files/home.css";
import "../css-files/nav.css";
import { useMediaQuery } from "react-responsive";
import Logo from "./logo.component";
import Nav from "./nav.component";
import NavSettings from "./navSettings.component";
import MobileNav from "./mobile-nav";
import SearchBar from "./searchbar.component";

const NavBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      {isMobile ? (
        <MobileNav />
      ) : (
        <div className="nav-container">
          <Logo /> <SearchBar /> <NavSettings /> <Nav />
        </div>
      )}
      <Outlet />
    </>
  );
};
export default NavBar;
