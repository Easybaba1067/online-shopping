import ProfileTiles from "./profile-settings";
import {
  Box,
  Clock,
  CreditCard,
  Gear,
  PencilFill,
} from "react-bootstrap-icons";
import "../css-files/profile.css";
import { useAuth } from "../providers/userContext";
import { logout } from "../utilis/auth";
import getAuthErrorMessage from "../utilis/error-message";
import Popup from "./popupMessage";
import { useState } from "react";

const ProfileHead = () => {
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
      <div className="profile-container">
        <div className="profile-head">
          <h1>{user?.name}</h1>

          <p>{user?.email}</p>
        </div>
        <div className="divider"></div>

        <ProfileTiles Leading={PencilFill} title="Edit details" />
        <ProfileTiles Leading={Clock} title="History" />
        <ProfileTiles Leading={Gear} title="Advance settings" />
        <ProfileTiles Leading={CreditCard} title="Payment method" />
        <ProfileTiles Leading={Box} title="Order(s)" />
        <div onClick={() => handleLogout()} className="tiles-container">
          <h3>Sign out</h3>
        </div>
      </div>
      <Popup message={message} show={message} color={"red"} />
    </>
  );
};
export default ProfileHead;
