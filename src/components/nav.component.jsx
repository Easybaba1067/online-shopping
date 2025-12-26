import { Link, useLocation } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
// import { useState } from "react";
import "../css-files/nav.css";
import { useCart } from "../providers/cartContext";
import { useAuth } from "../providers/userContext";
import { logout } from "../utilis/auth";
import { useState } from "react";
import Popup from "./popupMessage";
import getAuthErrorMessage from "../utilis/error-message";
const Nav = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const { user } = useAuth();
  const [message, setMessage] = useState("");

  const handleLogout = async () => {
    try {
      const result = await logout();
      setMessage(result);
      setTimeout(() => setMessage(false), 2000);
    } catch (error) {
      setMessage(getAuthErrorMessage(error));
      setTimeout(() => setMessage(false), 2000);
    }
  };
  return (
    <>
      <div className="nav-list">
        <ul>
          <li>
            <Link
              to="cart"
              className={
                location.pathname === "/cart" ? "nav-link active" : "nav-link"
              }
            >
              <p>{cartItems.length}</p>
              <Cart
                style={{
                  color: "#2b2dff",
                }}
              />
            </Link>
          </li>

          <li>
            {user ? (
              <p onClick={handleLogout}>Sign out</p>
            ) : (
              <Link
                to={"signin"}
                className={
                  location.pathname === "/signin"
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>
      <Popup message={message} show={message} color={"red"} />
    </>
  );
};
export default Nav;
