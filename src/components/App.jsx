import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthunticateContextProvider from "../contexts/AuthunticateContext";
import CartContextProvider from "../contexts/CartContext";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Create from "../pages/Create";
import Homepage from "../pages/Homepage";
import Loginpage from "../pages/Loginpage";
import Product from "../pages/Product";
import Signupage from "../pages/Signupage";
import Navbar from "./Navbar";

function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthunticateContextProvider>
          <CartContextProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Homepage}></Route>
              <Route exact path="/login" component={Loginpage}></Route>
              <Route exact path="/signup" component={Signupage}></Route>
              <Route exact path="/cart" component={Cart}></Route>
              <Route exact path="/account" component={Account}></Route>
              <Route exact path="/create" component={Create}></Route>
              <Route exact path="/product" component={Product}></Route>
            </Switch>
          </CartContextProvider>
        </AuthunticateContextProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
