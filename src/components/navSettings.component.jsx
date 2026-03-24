import { Link } from "react-router-dom";
import "../css-files/nav.css";
import { useAuth } from "../providers/userContext";
import {
  Box2,
  Heart,
  House,
  Lock,
  Person,
  Wallet,
} from "react-bootstrap-icons";

const NavSettings = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="nav-settings-container">
        <div className="nav-settings-flex">
          <Link to={"/"}>
            <span>
              <House style={{ marginRight: "5px", fontSize: "1.1rem" }} />
            </span>
            <span className="settings-text">Home</span>
          </Link>
          {user && (
            <Link to={"/profile"}>
              <span>
                <Person style={{ marginRight: "5px", fontSize: "1.1rem" }} />
              </span>
              <span className="settings-text">Profile</span>
            </Link>
          )}
          <Link>
            <span>
              <Wallet style={{ marginRight: "5px", fontSize: "1.1rem" }} />
            </span>
            <span className="settings-text">Payment method</span>
          </Link>
          <Link>
            <span>
              <Lock style={{ marginRight: "5px", fontSize: "1.1rem" }} />
            </span>
            <span className="settings-text">Privacy settings</span>
          </Link>
          <Link to={"wishlist"}>
            <span>
              <Heart style={{ marginRight: "5px", fontSize: "1.1rem" }} />
            </span>
            <span className="settings-text">Wishlist</span>
          </Link>
          {user && (
            <Link to={"order"}>
              <span>
                <Box2 style={{ marginRight: "5px", fontSize: "1.1rem" }} />
              </span>
              <span className="settings-text">Order(s)</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default NavSettings;
