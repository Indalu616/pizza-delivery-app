import React, { useContext } from "react";
import "./PrivateNav.css";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../CartContextProvider/CartContex";
import { signOut } from "firebase/auth";
import { auth } from "../../FireBaseConfig/firebase";
import { AuthContext } from "../AuthContext/Auth";
function PrivateNav() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart } = useContext(cartContext);
  async function logout() {
    try {
      await signOut(auth);
      console.log("logged out successfully");
      navigate("/sign");
      setCurrentUser(false);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <h1>PIZZA HUB</h1>
        </div>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link onClick={logout}>Logout</Link>
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

export default PrivateNav;
