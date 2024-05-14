import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addshippingaddress } from "../slices/Orderdetails";
import { addshippingaddress } from "../slices/ShippingAddress";
import { getLocalStorage } from "../utilities/authorization";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = getLocalStorage("email");
  const [address, setAddress] = useState(
    getLocalStorage(`shippingaddress_${email}`)
      ? JSON.parse(getLocalStorage(`shippingaddress_${email}`)).address
      : ""
  );

  const [postalCode, setPostalCode] = useState(
    getLocalStorage(`shippingaddress_${email}`)
      ? JSON.parse(getLocalStorage(`shippingaddress_${email}`)).postalCode
      : ""
  );

  const [city, setCity] = useState(
    getLocalStorage(`shippingaddress_${email}`)
      ? JSON.parse(getLocalStorage(`shippingaddress_${email}`)).city
      : ""
  );

  const [country, setCountry] = useState(
    getLocalStorage(`shippingaddress_${email}`)
      ? JSON.parse(getLocalStorage(`shippingaddress_${email}`)).country
      : ""
  );

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(addshippingaddress({ address, postalCode, city, country }));
    console.log("form is submmited");
    navigate("/Ordersummary");
  };
  return (
    <div>
      <h1 className="mx-5 my-2 fw-bold text-center">Shipping</h1>
      <form
        action=""
        className="container p-3 m-2 shadow"
        onSubmit={handlesubmit}
      >
        <label htmlFor="" className="m-2 fw-bold">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="" className="m-2 fw-bold">
          Postal Code
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Postal code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <label htmlFor="" className="m-2 fw-bold">
          City
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="" className="m-2 fw-bold">
          Country
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button className="btn btn-dark my-4 mx-2" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

export default Shipping;
