import React, { useState, useEffect } from "react";

export default function CartItem(props) {
  return (
    <>
      <div className="cart-item">
        <div className="cart-item-img">
          <img src={props.productImg} alt="item" />
        </div>
        <div className="cart-item-content">
          <h2 className="cart-item-name">{props.productName}</h2>
          <h2 className="cart-item-price">
            {props.itemQuantity + " x " + " $ " + props.productPrice + ".00"}
          </h2>
          <p className="productInfo">{props.productDescription}</p>
        </div>
      </div>
    </>
  );
}
