import { useState } from "react";
import "../css-files/auth.css";
import { signInWithGoogle } from "../utilis/auth";

import getAuthErrorMessage from "../utilis/error-message";
import Popup from "./popupMessage";
import { useNavigate } from "react-router-dom";

const SocialMedia = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { isNew } = await signInWithGoogle();
      if (isNew) {
        navigate("/signin/setpassword");
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setMessage(getAuthErrorMessage(error.code));
      setTimeout(() => setMessage(false), 2000);
    }
  };

  return (
    <>
      <div className="platform-login">
        <button disabled={loading} onClick={handleGoogleLogin}>
          <img
            alt="google"
            style={{ height: "20px", width: "20px" }}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
          />
        </button>
        <button>
          <img
            alt="facebook"
            style={{ height: "20px", width: "20px" }}
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/facebook/facebook-original.svg"
          />
        </button>
      </div>
      <Popup message={message} color={"red"} show={message} />
    </>
  );
};
export default SocialMedia;
