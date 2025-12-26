import { useLocation } from "react-router-dom";
import "../css-files/shop.css";

const CheckOut = () => {
  const { state } = useLocation();
  const price = state?.totalPrice;

  return (
    <>
      <div className="nothing-here">
        <h2> Total price = {`$${price}`}</h2>
        <button>Select payment method</button>
      </div>
    </>
  );
};
export default CheckOut;
