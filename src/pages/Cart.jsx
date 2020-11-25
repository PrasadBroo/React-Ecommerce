import React, { useContext, useEffect, useState } from "react";
import "../css/Cart.css";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { Button } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
export default function Cart() {
  const { totalItems, itemQuantity } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    if (itemQuantity.length === 0) {
      setTotalCost(0);
    }
    let allItemCost = itemQuantity.map((item) => {
      return parseInt(item.price) * parseInt(item.quantity);
    });
    if (allItemCost.length === 0) return;
    let totalItemsCost = allItemCost.reduce((a, b) => a + b);
    setTotalCost(totalItemsCost);
  }, [itemQuantity, totalCost]);

  return (
    <div className="cartPage">
      <div className="cart-all-items">
        {itemQuantity.map((item, i) => {
          return (
            <CartItem
              itemQuantity={parseInt(item.quantity)}
              url={item.url}
              productId={item.id}
              productImg={item.img}
              productName={item.name}
              productPrice={item.price}
              productDescription={item.discription}
              key={i}
            />
          );
        })}
        <div className="cart-item-checkout">
          <div className="item-subtotal">Total = ${totalCost}</div>
          <div className="cart-item-checkout-btn">
            <Button
              variant="contained"
              color="primary"
              id="checkoutItem"
              startIcon={<ShoppingCart />}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
