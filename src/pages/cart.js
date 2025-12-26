import { Routes, Route } from "react-router-dom";
import Cart from "../components/cart";
import CheckOut from "../components/checkout-page";

const CartPage = () => {
  return (
    <>
      <Routes>
        <Route index element={<Cart />} />
        <Route path="check-out" element={<CheckOut />} />
      </Routes>
    </>
  );
};
export default CartPage;
