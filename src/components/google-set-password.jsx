import { useState } from "react";
import "../css-files/auth.css";
import { linkEmailToGoogleAccount } from "../utilis/auth";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import getAuthErrorMessage from "../utilis/error-message";
import Popup from "./popupMessage";

const SetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      await linkEmailToGoogleAccount(password);
      navigate("/");
    } catch (error) {
      setMessage(getAuthErrorMessage(error.code));
    }
  };

  return (
    <>
      <div className="welcome-form set-password">
        <div className="form">
          <form action="">
            <h1>Set password</h1>
            <div style={{ position: "relative" }}>
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "65%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeSlash /> : <Eye />}
              </span>
            </div>

            <div className="forget-me">
              <a href="/">forget password?</a>
            </div>

            <button type="submit" onClick={handleSetPassword}>
              Sign in
            </button>
          </form>
        </div>
      </div>
      <Popup message={message} show={message} color={"red"} />
    </>
  );
};
export default SetPassword;
