import { Link } from "react-router-dom";
import "../css-files/nav.css";
import LogoImage from "../easybaba icon.png";
const Logo = () => {
  return (
    <>
      <div className="nav-logo">
        <Link to="/">
          <img src={LogoImage} alt="brand" style={{ width: "30px" }} />
          <h4>Easyb</h4>
        </Link>
      </div>
    </>
  );
};
export default Logo;
