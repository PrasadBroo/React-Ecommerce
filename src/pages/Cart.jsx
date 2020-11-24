import React, { useContext, useEffect, useState } from "react";
import "../css/Cart.css";
import { firestore } from "../services/firebase";
import { CartContext } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { Button } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
export default function Cart() {
  const { totalItems, itemQuantity } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    async function getData() {
      let allitems = await Promise.all(
        totalItems.map(async (item) => {
          let allData = await (
            await firestore().collection("items").where("id", "==", item).get()
          ).docs.map((data) => data.data());
          return allData[0];
        })
      );
      setCartItems(allitems);
    }
    getData();
  }, [totalItems]);
  useEffect(() => {
    let allItemCost = cartItems.map((item) => {
      return parseInt(item.productPrice);
    });
    if (allItemCost.length === 0) return;
    let totalItemsCost = allItemCost.reduce((a, b) => a + b);
    setTotalCost(totalItemsCost);
  }, [cartItems, totalCost]);
  useEffect(() => {
    console.log(itemQuantity);
  }, [itemQuantity]);
  return (
    <div className="cartPage">
      <div className="cart-all-items">
        {cartItems.map((item, i) => {
          
          return (
            <CartItem
              itemQuantity={
                itemQuantity.find((ele) => ele.id === item.id).quantity
              }
              productId={item.id}
              productImg={item.productImg}
              productName={item.productName}
              productPrice={item.productPrice}
              productDescription={item.productDescription}
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
