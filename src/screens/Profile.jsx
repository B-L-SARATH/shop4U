import React, { useEffect, useState } from "react";
import { api } from "../utilities/api";
import { Link } from "react-router-dom";
import { getLocalStorage } from "../utilities/authorization";
const Profile = () => {
  const email = localStorage.getItem("email");
  const [user, setuser] = useState({});
  useEffect(() => {
    const getuserdata = async () => {
      const res = await api("get", `/userbymail/${email}`);
      console.log(res.user);
      setuser(res.user);
    };
    getuserdata();
  }, [email]);

  const [address, setaddress] = useState(
    getLocalStorage(`shippingaddress_${email}`)
      ? JSON.parse(getLocalStorage(`shippingaddress_${email}`))
      : { address: "", city: "", postalCode: "", country: "" }
  );
  return (
    <div className="d-flex justify-content-around container m-2 p-3 flex-wrap">
      <div style={{ width: "400px" }} className="shadow p-5 my-3">
        <h2 className="m-3 text-center">Profile</h2>
        <p>
          <span className="fw-bold">Name: </span>
          {user.name}
        </p>
        <p>
          <span className="fw-bold">Email: </span>
          {user.email}
        </p>
        <p>
          <span className="fw-bold">Admin: </span>
          {user.isAdmin ? "Yes" : "No"}
        </p>
        <Link className="btn btn-dark m-1" to={`editprofile/${user._id}`}>
          {" "}
          Update Profile
        </Link>
        <Link className="btn btn-dark m-1" to={`changepassword/${user._id}`}>
          Change Password
        </Link>
      </div>

      <div style={{ width: "400px" }} className="shadow p-5 my-3">
        <h2 className="m-3 text-center">Address</h2>
        <p>
          <span className="fw-bold"> Address: </span>
          {address.address}
        </p>
        <p>
          <span className="fw-bold">City: </span>
          {address.city}
        </p>

        <p>
          <span className="fw-bold">Postal Code: </span>
          {address.postalCode}
        </p>
        <p>
          <span className="fw-bold">Country: </span>
          {address.country}
        </p>
        <Link className="btn btn-dark" to="editshipping">
          {" "}
          Update Address
        </Link>
      </div>
    </div>
  );
};

export default Profile;
