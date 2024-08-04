import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { cartContext } from "../CartContextProvider/CartContex";
function Navbar() {
  const { cart, dispatch } = useContext(cartContext);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <h1>PIZZA HUB</h1>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/sign">Sign in</Link>
          <Link to="/addpro">Admin</Link>
          <div className="cart">
            <Link to="/cart">
              <i class="fa-solid fa-cart-shopping"></i>
            </Link>
            <span className="cart-length">{cart?.length}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
