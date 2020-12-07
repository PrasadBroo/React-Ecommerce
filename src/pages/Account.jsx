import React, { useState, useContext } from "react";
import Orders from "../components/subcomponents/Orders";
import Profile from "../components/subcomponents/Profile";
import Wishlist from "../components/subcomponents/Wishlist";
import styles from "../css/Account.module.css";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
import { Redirect } from "react-router-dom";

export default function Account() {
  const { user } = useContext(AuthunticateContext);
  const [currentScreen, setCurrentScreen] = useState(0);
  return user ? (
    <div className={styles.accountpage}>
      <ul className={styles.tabs}>
        <li
          onClick={() => showMe(0)}
          className={currentScreen === 0 ? styles.tabActive : null}
        >
          Profile
        </li>
        <li
          onClick={() => showMe(1)}
          className={currentScreen === 1 ? styles.tabActive : null}
        >
          My Orders
        </li>
        <li
          onClick={() => showMe(2)}
          className={currentScreen === 2 ? styles.tabActive : null}
        >
          Wishlist
        </li>
      </ul>
      {currentScreen === 0 ? (
        <Profile />
      ) : currentScreen === 1 ? (
        <Orders />
      ) : (
        <Wishlist />
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );

  function showMe(sectionNumber) {
    setCurrentScreen(sectionNumber);
  }
}
