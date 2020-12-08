import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
import "../css/Navbar.css";
import Badge from "@material-ui/core/Badge";
import { CartContext } from "../contexts/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthunticateContext);
  const [burger, setBurger] = useState(false);
  const { uniqueItems, totalItems, addItemToCart } = useContext(CartContext);
  return (
    <nav>
      <h1>
        {/* <a href="/">Realtime Chat</a> */}
        <Link to="/">ReactStore</Link>
      </h1>
      <div
        onClick={() => setBurger(!burger)}
        className={burger ? "burger  burger-active" : "burger"}
      >
        <div className="done"></div>
        <div className="dtwo"></div>
        <div className="dthree"></div>
      </div>
      {handelRender()}
    </nav>
  );

  function handelRender() {
    if (user)
      return (
        <ul className={burger ? "list-active l-a-l" : "loggedinn l-a-l"}>
          <li className="createItem">
            <Link to="/create">
              <i className="fas fa-plus"></i> Create
            </Link>
          </li>
          <li className="cart">
            <Link to="/cart">
              <Badge badgeContent={uniqueItems} color="primary" showZero>
                <i className="fas fa-shopping-cart"></i>
              </Badge>
              Cart
            </Link>
          </li>
          <li className="account">
            <Link to="/account">
              <i className="fas fa-user-alt"></i> Account
            </Link>
          </li>
          <li
            className={
              burger
                ? "btn btn-danger btn-active logout"
                : "btn btn-danger logout"
            }
            onClick={logout}
          >
            <i className="fas fa-sign-out-alt"></i>Logout
          </li>
        </ul>
      );
    return (
      <ul className={burger ? "list-active l-a-l" : "noclass l-a-l"}>
        <li className="cart">
          <Link to="/cart">
            <Badge badgeContent={uniqueItems} color="primary" showZero>
              <i className="fas fa-shopping-cart"></i>
            </Badge>
            Cart
          </Link>
        </li>
        <li>
          {/* <a href="/Login">Login</a> */}
          <Link to="/login">
            <i className="fas fa-sign-in-alt"></i>Login
          </Link>
        </li>
        <li>
          {/* <a href="/Signup">Signup</a> */}
          <Link to="/signup">
            <i className="fas fa-user-plus"></i>Signup
          </Link>
        </li>
      </ul>
    );
  }
}
