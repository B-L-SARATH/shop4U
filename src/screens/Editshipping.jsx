import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Editshipping = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [address, setaddress] = useState(
    localStorage.getItem(`shippingaddress_${email}`)
      ? JSON.parse(localStorage.getItem(`shippingaddress_${email}`))
      : { address: "", city: "", postalCode: "", country: "" }
  );

  const handlesubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(`shippingaddress_${email}`, JSON.stringify(address));
    toast.success("Shipping Address is updated");
    navigate("/profile");
  };
  return (
    <div className="container p-3 ">
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
          value={address.address}
          onChange={(e) => setaddress({ ...address, address: e.target.value })}
        />
        <label htmlFor="" className="m-2 fw-bold">
          Postal Code
        </label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Postal code"
          value={address.postalCode}
          onChange={(e) =>
            setaddress({ ...address, postalCode: e.target.value })
          }
        />
        <label htmlFor="" className="m-2 fw-bold">
          City
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter city"
          value={address.city}
          onChange={(e) => setaddress({ ...address, city: e.target.value })}
        />
        <label htmlFor="" className="m-2 fw-bold">
          Country
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter country"
          value={address.country}
          onChange={(e) => setaddress({ ...address, country: e.target.value })}
        />
        <button className="btn btn-dark my-4 mx-2" type="submit">
          Update Shippng Address
        </button>
      </form>
    </div>
  );
};

export default Editshipping;
