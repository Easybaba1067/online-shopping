import ProfileTiles from "./profile-settings";
import { Cart, GearFill } from "react-bootstrap-icons";
import "../css-files/profile.css";
import { useAuth } from "../providers/userContext";

const ProfileHead = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="profile-container">
        <div className="profile-head">
          <h1>{user?.name}</h1>

          <p>{user?.email}</p>
        </div>
        <div className="divider"></div>

        <ProfileTiles Leading={GearFill} title="Edit details" />
        <ProfileTiles Leading={Cart} title="History" />
        <ProfileTiles Leading={Cart} title="Advance settings" />
        <ProfileTiles Leading={Cart} title="Payment method" />
        <ProfileTiles Leading={Cart} title="Order(s)" />
      </div>
    </>
  );
};
export default ProfileHead;
