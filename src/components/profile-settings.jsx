import { ArrowRight } from "react-bootstrap-icons";
import "../css-files/profile.css";
import { Link } from "react-router-dom";
const ProfileTiles = ({ Leading, title, link }) => {
  return (
    <>
      <div className="tiles-container">
        <Link to={link}>
          <div className="tiles-flex">
            <Leading />
            <h2>{title}</h2>
            <ArrowRight />
          </div>
        </Link>
      </div>
    </>
  );
};
export default ProfileTiles;
