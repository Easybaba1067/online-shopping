import { Routes, Route } from "react-router-dom";
import ProfileHead from "../components/profile";
import "../css-files/profile.css";
import Cart from "../components/cart";

const Profile = () => {
  return (
    <Routes>
      <Route index element={<ProfileHead />} />
      <Route path="profile-cart" element={<Cart />} />
    </Routes>
  );
};
export default Profile;
