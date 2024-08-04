import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="left-footer">
          <h3>Pizza Hub</h3>
          <p>Delicious Pizza, Great Hospitality ... That's Our Moto</p>
        </div>
        <div className="right-footer">
          <a href="#">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa-brands fa-telegram"></i>
          </a>
          <a href="#">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
