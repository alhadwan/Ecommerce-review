import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import "./Header.css";
import logo from "../assets/images/logo-white.png";
import mobileLogo from "../assets/images/mobile-logo-white.png";
import searchIcon from "../assets/images/icons/search-icon.png";
import cartIcon from "../assets/images/icons/cart-icon.png";

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");

  let cartQuantity = 0;

  cart?.forEach((cartItem) => (cartQuantity += cartItem.quantity));

  const handleSearch = () => {
    navigate(`/?search=${searchProduct}`);
  };

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={logo} />
            <img className="mobile-logo" src={mobileLogo} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchProduct}
            onChange={(e) => {
              setSearchProduct(e.target.value);
              if (e.target.value === "") {
                navigate("/");
              }
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button className="search-button" onClick={handleSearch}>
            <img className="search-icon" src={searchIcon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={cartIcon} />
            <div className="cart-quantity">{cartQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}
