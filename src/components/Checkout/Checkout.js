import React, { useContext, useEffect } from "react";
import "./Checkout.css";
import Footer from "../Footer/Footer";
import { cartContext } from "../CartContextProvider/CartContex";
import PrivateNav from "../PrivateNavbar/PrivateNav";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/Auth";
function Checkout() {
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  useEffect(() => {
    if (!currentUser) {
      navigate("/sign");
    }
  });
  let shipfee = 5;
  let discount = 3;
  const { cart, dispatch } = useContext(cartContext);
  let price = 0;
  function CalculatePrice() {
    for (let i = 0; i < cart.length; i++) {
      price += cart[i].price * cart[i].quantity;
    }
    return price;
  }
  return (
    <>
      <PrivateNav />
      <div className="checkout">
        <div className="user-info">
          <form>
            <div className="input-group">
              <label htmlFor="fname">First Name</label>
              <input type="text" id="fname" placeholder="First name"></input>
            </div>

            <div className="input-group">
              <label htmlFor="lname">Last Name</label>
              <input type="text" id="lname" placeholder="Last name"></input>
            </div>

            <div className="input-group">
              <label htmlFor="eamil">Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@example.com"
              ></input>
            </div>

            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" placeholder="city"></input>
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" placeholder="Phone number"></input>
            </div>

            <div className="input-group">
              <label htmlFor="street">Street</label>
              <input type="text" id="street" placeholder="Street"></input>
            </div>
          </form>
          <button>Confirm Order</button>
        </div>
        <div className="sub-total">
          <div className="total">
            <h3 id="summary">Cart summary</h3>
            <div className="total-price">
              <h3>Total</h3>
              <h3>${CalculatePrice()}</h3>
            </div>
            <div className="total-price">
              <h3>Coupun Discount</h3>
              <h3>${cart.length ? discount : 0}</h3>
            </div>
            <div className="total-price">
              <h3>Shipping Fees</h3>
              <h3>${cart.length ? shipfee : 0}</h3>
            </div>
            <div className="ground-total">
              <h3>Ground Total</h3>
              <h3>
                $
                {cart.length
                  ? CalculatePrice() / 2 + (discount + shipfee)
                  : "0"}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
