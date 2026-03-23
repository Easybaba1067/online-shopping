import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Cart } from "react-bootstrap-icons";
// import { useState } from "react";
import "../css-files/nav.css";
import { useCart } from "../providers/cartContext";
import { useAuth } from "../providers/userContext";

import { Cart, Person, PersonCheck } from "react-bootstrap-icons";
const Nav = () => {
  const location = useLocation();
  const { cartItems } = useCart();
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <div className="nav-list">
        <ul>
          <li>
            <button
              onClick={() => navigate("/cart")}
              className={
                location.pathname === "/cart" ? "nav-link active" : "nav-link"
              }
            >
              <Cart
                style={{
                  color: "#2b2dff",
                }}
              />

              <span>
                <p>{cartItems.length}</p>
              </span>
            </button>
          </li>

          <li onClick={() => navigate("/profile")}>
            {user ? (
              <p>
                <PersonCheck />
              </p>
            ) : (
              <Link to={"signin"}>
                <Person style={{ marginRight: "2px" }} />
                Sign in
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};
export default Nav;
