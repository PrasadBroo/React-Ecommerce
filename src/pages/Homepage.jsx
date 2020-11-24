import React, { useContext } from "react";
import "../css/Homepage.css";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
// import { CartContext } from "../contexts/CartContext";
import Loader from "../components/Loader";
import Items from "../components/Items";

export default function Homepage() {
  const { showloader } = useContext(AuthunticateContext);

  return (
    <>
      <Loader hide={!showloader} />
      <Items key="a2sd3a7" />
    </>
  );
}
