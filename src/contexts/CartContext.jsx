import React, { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

export default function CartContextProvider(props) {
  const [uniqueItems, setUniqueItems] = useState(0);
  const [totalItems, setTotalItems] = useState([]);
  const [itemQuantity, setitemQuantity] = useState([]);
  useEffect(() => {
    let cartItems = JSON.parse(sessionStorage.getItem("cart"));
    let itemQuantity = JSON.parse(sessionStorage.getItem("cartQuantity"));
    if (
      cartItems == null ||
      typeof cartItems != "object" ||
      itemQuantity == null ||
      typeof itemQuantity != "object"
    )
      return;
    setTotalItems(cartItems);
    setitemQuantity(itemQuantity);
  }, []);
  useEffect(() => {
    setUniqueItems(totalItems.filter(onlyUnique).length);
  }, [totalItems]);
  return (
    <CartContext.Provider
      value={{ uniqueItems, totalItems, addItemToCart, itemQuantity }}
    >
      {props.children}
    </CartContext.Provider>
  );

  function addItemToCart(productid, productQuantity) {
    setTotalItems([...totalItems, productid]);
    setitemQuantity([
      ...itemQuantity,
      { id: productid, quantity: productQuantity },
    ]);
    sessionStorage.setItem("cart", JSON.stringify([...totalItems, productid]));
    sessionStorage.setItem(
      "cartQuantity",
      JSON.stringify([
        ...itemQuantity,
        { id: productid, quantity: productQuantity },
      ])
    );
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
