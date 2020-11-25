import { Link } from "@material-ui/core";
import React, { useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { CartContext } from "../contexts/CartContext";
export default function CartItem(props) {
  const { removeItemFromCart } = useContext(CartContext);
  function handelDeleteItem() {
    removeItemFromCart(props.productId);
  }
  return (
    <>
      <div className="cart-item">
        <div className="cart-item-img">
          <img src={props.productImg} alt="item" />
        </div>
        <div className="cart-item-content">
          <div className="deleteItem">
            <h2 className="cart-item-name">
              <Link href={props.url}>{props.productName}</Link>
            </h2>
            <DeleteIcon
              style={{ cursor: "pointer" }}
              onClick={handelDeleteItem}
            />
          </div>

          <h2 className="cart-item-price">
            {props.itemQuantity} x $ {props.productPrice} .00
          </h2>
        </div>
      </div>
    </>
  );
}
