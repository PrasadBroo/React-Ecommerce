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
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(totalItems));
    sessionStorage.setItem("cartQuantity", JSON.stringify(itemQuantity));
  }, [itemQuantity, totalItems]);

  return (
    <CartContext.Provider
      value={{
        uniqueItems,
        totalItems,
        addItemToCart,
        itemQuantity,
        removeItemFromCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );

  function addItemToCart(
    productid,
    productQuantity,
    productPrice,
    productUrl,
    productName,
    productImg,
    productDiscription
  ) {
    setTotalItems([...totalItems, productid]);
    setitemQuantity([
      ...itemQuantity,
      {
        id: productid,
        quantity: productQuantity,
        price: productPrice,
        discription: productDiscription,
        url: productUrl,
        name: productName,
        img: productImg,
      },
    ]);
  }
  function removeItemFromCart(productid) {
    let newCart = [...itemQuantity].filter((item) => item.id !== productid);
    setitemQuantity(newCart);
    setTotalItems([...totalItems].filter((ele) => ele !== productid));
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
