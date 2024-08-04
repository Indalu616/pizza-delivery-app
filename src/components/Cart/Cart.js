import React, { useContext, useEffect } from "react";
import "./Cart.css";
import PrivateNav from "../PrivateNavbar/PrivateNav";
import { cartContext } from "../CartContextProvider/CartContex";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { AuthContext } from "../AuthContext/Auth";
function Cart() {
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

  // !if cart is not empty store the cart in local storage

  let items = [];
  if (JSON.parse(localStorage.getItem("myCart"))) {
    items = [...items, ...JSON.parse(localStorage.getItem("myCart"))];
    items = [...items, ...cart];
    localStorage.removeItem("myCart");
    localStorage.setItem("myCart", JSON.stringify(items));
  } else {
    items = [...items, ...cart];
    localStorage.removeItem("myCart");
    localStorage.setItem("myCart", JSON.stringify(items));
  }

  // *get items back from local storage
  let orders = JSON.parse(localStorage.getItem("myCart"));
  console.log(orders);

  // !increase quantity
  function increaseAmount(id) {
    const indexFound = cart?.findIndex((p) => p.id == id);
    if (cart[indexFound].quantity < 10) {
      dispatch({ type: "increase", id: id });
      console.log("dispatched");
    }
  }
  // !decrease quantity
  function decreaseAmount(id) {
    const indexFound = cart?.findIndex((p) => p.id == id);
    if (cart[indexFound].quantity > 1) {
      dispatch({ type: "decrease", id: id });
      console.log("dispatched");
    }
  }

  // !calculte price
  let price = 0;
  function CalculatePrice() {
    for (let i = 0; i < cart?.length; i++) {
      price += cart[i].price * cart[i].quantity;
    }
    return price;
  }
  // !remove item
  function removeItem(id) {
    if (cart.length) {
      dispatch({ type: "remove", id: id });
    }
  }

  return (
    <>
      <PrivateNav />
      <div className="cart-room">
        <h3 id="cartLength">You have {cart?.length} Pizzas in your Cart</h3>
        <div className="orders">
          <div className="order-details">
            <div className="pizza-cart-container">
              {cart?.map((pizza, index) => {
                return (
                  <div className="pizza" key={index}>
                    <img src={pizza.url}></img>
                    <div className="desc">
                      <h3>{pizza.name}</h3>
                      <p>
                        Beef pepperoni, Italian sausage, Green peppers,
                        mushrooms & onions
                      </p>
                    </div>
                    <div className="buy">
                      <h3
                        onClick={() => {
                          removeItem(pizza.id);
                          // let IndexToRemove = orders.findIndex(
                          //   (p) => p.id == pizza.id
                          // );
                          orders.filter((p) => p.id != pizza.id);
                        }}
                        id="add"
                      >
                        <i class="fa-solid fa-cart-shopping"></i> -
                      </h3>
                      <p className="quantity">
                        <button onClick={() => decreaseAmount(pizza.id)}>
                          -
                        </button>
                        <span>{pizza.quantity}</span>
                        <button onClick={() => increaseAmount(pizza.id)}>
                          +
                        </button>
                      </p>
                      <h3>${pizza.price}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="sub-total">
            <button>
              <Link className="link" to="/checkout">
                Proceed to checkout
              </Link>
            </button>
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
      </div>
      <Footer />
    </>
  );
}

export default Cart;
