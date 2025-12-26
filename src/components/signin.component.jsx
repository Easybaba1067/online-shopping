import { useState } from "react";
import "../css-files/auth.css";
import { useMediaQuery } from "react-responsive";
import SocialMedia from "./platform-login.component";
import { registerWithEmail, loginWithEmail } from "../utilis/auth";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "./popupMessage";
import getAuthErrorMessage from "../utilis/error-message";

const Signin = () => {
  const [existingUser, setExistingUser] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginMessage, setloginMessage] = useState("");
  const [passwordStrength, setpasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    switch (true) {
      case password !== confirmPassword:
        setMessage("Passwords do not match!");
        return;
      case !isStrongPassword(password):
        setpasswordStrength(
          "format: 8 characters, uppercase, lowercase, number, and symbol."
        );
        return;

      default:
        try {
          setLoading(true);
          await registerWithEmail(name, email, password);

          navigate(from, { replace: true });
        } catch (error) {
          setLoading(false);
          setMessage(getAuthErrorMessage(error.code));
          setTimeout(() => setMessage(false), 2000);
        }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginWithEmail(email, password);
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      setloginMessage(getAuthErrorMessage(error.code));
      setTimeout(() => setloginMessage(false), 2000);
    }
  };

  const isStrongPassword = (pwd) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
  };

  return (
    <>
      <div className="auth-container">
        {!isMobile && (
          <div className="welcome-content">
            <h1>Easyb E-commerce</h1>
            <p>
              Welcome to Easyb, your ultimate destination for effortless online
              clothing shopping. Our app is designed to bring fashion closer to
              you, offering a wide range of trendy outfits, timeless classics,
              and everyday essential-all at your fingertips.
            </p>
            <SocialMedia />
          </div>
        )}

        <div className="welcome-form">
          <div className="form">
            {existingUser ? (
              <form action="" onSubmit={handleLogin}>
                <h1>Welcome back</h1>
                <p style={{ fontWeight: "bold" }}>please login</p>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jondoe@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </div>
                <Popup
                  message={loginMessage}
                  show={loginMessage}
                  color={"red"}
                />
                <div className="forget-me">
                  <a href="/">forget password?</a>
                </div>

                <button disabled={loading} type="submit">
                  {loading ? "loading..." : "Sign in"}
                </button>
                {isMobile && <SocialMedia />}
              </form>
            ) : (
              <form action="" onSubmit={handleRegister}>
                <h1>Please sign-up</h1>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="full name"
                    placeholder="Full name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jondoe@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div style={{ position: "relative" }}>
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </div>
                <p className="error-message">{passwordStrength}</p>
                <div>
                  <label htmlFor="confirm name">Confirm password</label>
                  <input
                    type="password"
                    name="comfirm password"
                    placeholder="confrim password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Popup message={message} show={message} color={"red"} />
                <div className="forget-me">
                  <a href="/">forget password?</a>
                </div>

                <div>
                  <button disabled={loading} type="submit">
                    {loading ? "loading" : "Sign up"}
                  </button>
                </div>
                {isMobile && <SocialMedia />}
              </form>
            )}
          </div>
          <button onClick={() => setExistingUser(!existingUser)}>
            {existingUser
              ? "New here? create an account"
              : " Already has an account? Login"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Signin;
