import { Trash3Fill } from "react-bootstrap-icons";
import "../css-files/cart.css";
import { useCart } from "../providers/cartContext";

const CardItem = ({ item }) => {
  const { price, name, imageUrl } = item;
  const { removeFromCart } = useCart();

  return (
    <>
      <div className="item-container">
        <div className="item-flex">
          <img src={imageUrl} alt={name} />
          <div className="details">
            <h3>{name}</h3>
            <p>${price}</p>
          </div>
          <div className="quantity">
            <h3>Quantity</h3>
            <p>{item.quantity}</p>
          </div>
          <div>
            <h4>Total</h4>
            <p>${item.price * item.quantity}</p>
          </div>
          <div
            style={{
              backgroundColor: "blue",
              padding: "10px",
              borderRadius: "50%",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Trash3Fill onClick={() => removeFromCart(item)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
