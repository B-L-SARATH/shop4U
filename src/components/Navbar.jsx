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
      <nav
        class="navbar navbar-expand-lg bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Shop4U
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <input
              class="form-control me-2 "
              type="search"
              style={{ width: "200px" }}
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                handlesearch(e.target.value);
              }}
            />
            {/* user details display when user is logged in */}
            {isloggedin && (
              <div class="dropdown">
                <button
                  class="btn btn-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My Account
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item bg-dark" to="/profile">
                      <i
                        class="fa-solid fa-user fa-1x"
                        style={{ color: "#fff" }}
                      ></i>{" "}
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item bg-dark" to="/myorders">
                      <i
                        class="fa-solid fa-box fa-1x"
                        style={{ color: "#fff" }}
                      >
                        {" "}
                      </i>{" "}
                      My Orders
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {/* card display block  when user logged in  */}
            {isloggedin && (
              <Link to="/cartitems" className="text-decoration-none">
                {" "}
                <span className="mx-4 position-relative">
                  <i class="fa-solid fa-cart-shopping fa-1x "></i>
                  <span className="text-white mx-1 ">Cart</span>
                  <span class="badge text-bg-secondary">{totalqty}</span>
                </span>
              </Link>
            )}

            {/* login and logout button display */}

            {isloggedin ? (
              <button
                class="btn btn-outline-light mx-2"
                onClick={() => {
                  removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            ) : (
              <Link to="/login" class="btn btn-outline-light mx-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
