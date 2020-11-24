import React, { useEffect, useState,useContext } from "react";
import Item from "./Item";
import "../css/Items.css";
import { firestore } from "../services/firebase";
import { CartContext } from "../contexts/CartContext";
export default function Items() {
  const { totalItems } = useContext(CartContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getItems() {
      let itemsRef = firestore().collection("items");
      let items = (await itemsRef.get()).docs.map((data) => data.data());
      setItems(items);
    }
    getItems();
  }, []);
  return (
    <div className="items">
      {items.map((item) => (
        <Item
        id={item.id}
        disabled={totalItems.includes(item.id)}
          name={item.productName}
          price={item.productPrice}
          url={item.productUrl}
          img={item.productImg}
          description={item.productDescription}
          key={item.id}
        />
      ))}
    </div>
  );
}
