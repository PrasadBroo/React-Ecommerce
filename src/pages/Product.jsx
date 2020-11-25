import React, { useEffect, useState, useContext } from "react";
import { firestore } from "../services/firebase";
import Loader from "../components/Loader";
import "../css/Product.css";
import { Button, TextField } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import cogoToast from "cogo-toast";
import { CartContext } from "../contexts/CartContext";
import { Redirect } from "react-router-dom";
function useQuery() {
  return new URLSearchParams(window.location.search);
}

export default function Product() {
  let query = useQuery().get("id");
  const [currentItem, setCurrentItem] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [value, setValue] = useState(3);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemId, setItemId] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { totalItems, addItemToCart } = useContext(CartContext);

  useEffect(() => {
    setShowLoader(true);
    async function gettingData() {
      let item = (
        await firestore().collection("items").where("id", "==", query).get()
      ).docs.map((item) => item.data());
      setCurrentItem(item[0]);
      setShowLoader(false);
    }
    gettingData();
  }, [query]);

  useEffect(() => {
    if (totalItems.includes(currentItem.id)) {
      setBtnDisabled(true);
    }
  }, [currentItem, totalItems]);

  if (redirect) {
    return <Redirect to="cart" />;
  }
  return !showLoader ? (
    <>
      <Loader hide={!showLoader} />
      <div className="productpage">
        <div className="container">
          <div className="img">
            <img src={currentItem.productImg} alt="item" />
            <div className="rating">
              <Rating
                name="simple-controlled"
                value={value}
                className="user-rating"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
          </div>
          <div className="content">
            <p className="productName">{currentItem.productName}</p>
            <p className="productPrice">
              {"$" + currentItem.productPrice + ".00"}
            </p>
            <form action="/" onSubmit={handelSubmit}>
              <TextField
                id="quantity"
                label="Quantity"
                type="number"
                disabled={btnDisabled}
                onChange={handelItemQuantityChange}
                defaultValue={1}
                InputProps={{ inputProps: { min: 1, max: 5 } }}
                variant="filled"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                id="addItem"
                disabled={btnDisabled}
              >
                {btnDisabled ? "Already Added" : "Add Item"}
              </Button>
            </form>
            <div className="description">
              <h2 className="title">About Product</h2>
              {currentItem.productDescription}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader hide={!showLoader} />
  );

  function handelSubmit(e) {
    e.preventDefault();
    setItemId(currentItem.id);
    addItemToCart(
      currentItem.id,
      itemQuantity,
      currentItem.productPrice,
      currentItem.productUrl,
      currentItem.productName,
      currentItem.productImg,
      currentItem.productDiscription
    );
    cogoToast.success("Item Added To Cart");
    setShowLoader(true);
    setTimeout(() => setRedirect(true), 1000);
  }
  function handelItemQuantityChange(e) {
    setItemQuantity(e.target.value);
  }
}
