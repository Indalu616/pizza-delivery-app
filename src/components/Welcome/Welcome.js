import React from "react";
import "./Welcome.css";
import pizza_1 from "../../images/pizza-1.png";
import pizza_2 from "../../images/pizza-2.png";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <div className="welcome">
      <div className="welcome-container">
        <div className="left-welcome">
          <h1>Welcome to Pizza Hub</h1>
          <h3>Family Cafe $Pizzaire</h3>
          <p id="first">
            Our chefs are working 24/7 and are ready to accept visitors and at
            any time of the day and night
          </p>
          <p>
            We would like to take this opportunity to welcome you at our Pizza
            House. We are offering a warm, friendly atmosphere to share a meal
            with family and friends at any time of the day or evening.
          </p>
          <button><Link to="/menu" className="link">Visit Menu</Link></button>
        </div>
        <div className="right-welcome">
          <img src={pizza_1}></img>
          <img src={pizza_2}></img>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
