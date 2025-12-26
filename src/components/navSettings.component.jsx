import { Link } from "react-router-dom";
import "../css-files/nav.css";
import { useAuth } from "../providers/userContext";

const NavSettings = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="nav-settings-container">
        <div className="nav-settings-flex">
          <Link to={"/"}>Home</Link>
          {user && <Link to={"/profile"}>Profile</Link>}
          <Link>Payment method</Link>
          <Link>Privacy settings</Link>
          <Link to={"wishlist"}>Wishlist</Link>
          {user && <Link to={"order"}>Order(s)</Link>}
        </div>
      </div>
    </>
  );
};
export default NavSettings;
