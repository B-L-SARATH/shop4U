import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLocalStorage, removeItem } from "../utilities/authorization";

const Navbar = () => {
  const cartitems = useSelector((state) => state.cart);
  const totalqty = cartitems.reduce((acc, item) => acc + item.qty, 0);
  const [isloggedin, setisloggedin] = useState(getLocalStorage("token"));
  const navigate = useNavigate();

  const handlesearch = (value) => {
    console.log("value", value);
    if (value === "") {
      navigate("/");
    }
    navigate(`/?search=${value}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Shop4U
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-2 my-2">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            {/* User details display when user is logged in */}
            {isloggedin && (
              <div className="dropdown my-2 mx-2">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item bg-dark" to="/profile">
                      <i
                        className="fa-solid fa-user fa-1x"
                        style={{ color: "#fff" }}
                      ></i>{" "}
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item bg-dark" to="/myorders">
                      <i
                        className="fa-solid fa-box fa-1x"
                        style={{ color: "#fff" }}
                      ></i>{" "}
                      My Orders
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {/* Login and logout button display */}
            {isloggedin ? (
              <button
                className="btn btn-outline-light mx-5 my-2"
                onClick={() => {
                  removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-light mx-5">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div className="bg-dark d-flex justify-content-between p-2">
        {/* Search input */}
        <input
          className="form-control  mx-4"
          type="search"
          style={{ width: "70%", height: "40px" }}
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => {
            handlesearch(e.target.value);
          }}
        />
        {/* Cart icon */}
        <div
          style={{ width: "30%" }}
          className="d-flex justify-content-center align-items-center my-2"
        >
          <Link to="/cartitems" className="text-decoration-none mx-2">
            <span className="position-relative">
              <i className="fa-solid fa-cart-shopping fa-1x "></i>
              <span className="text-white mx-1">Cart</span>
              <span className="badge text-bg-secondary">{totalqty}</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
