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
              <House style={{ paddingTop: "5px", fontSize: "1.2rem" }} />
            </span>
            Home
          </Link>
          {user && (
            <Link to={"/profile"}>
              <span>
                <Person style={{ paddingTop: "5px", fontSize: "1.2rem" }} />
              </span>
              Profile
            </Link>
          )}
          <Link>
            <span>
              <Wallet style={{ paddingTop: "5px", fontSize: "1.2rem" }} />
            </span>
            Payment method
          </Link>
          <Link>
            <span>
              <Lock style={{ paddingTop: "5px", fontSize: "1.2rem" }} />
            </span>
            Privacy settings
          </Link>
          <Link to={"wishlist"}>
            <span>
              <Heart style={{ paddingTop: "5px", fontSize: "1.2rem" }} />
            </span>
            Wishlist
          </Link>
          {user && (
            <Link to={"order"}>
              <span>
                <Box2 style={{ paddingTop: "5px", fontSize: "1.2rem" }} />
              </span>
              Order(s)
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default NavSettings;
