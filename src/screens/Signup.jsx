import React from "react";
import { useState } from "react";
import { api } from "../utilities/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
function Signup() {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("form submited");
    setisloading(true);
    const data = { name, email, password };
    const result = await api("post", "/register", data);

    if (result.success) {
      console.log("registration successfull");
      toast.success(result.message);

      navigate("/login");
      setisloading(false);
    } else {
      toast.error(result.message);

      console.log("registration unsuccessfull");
      setisloading(false);
    }
  };
  return (
    <div className="container p-3">
      <h2 className="fw-bold my-5">Register Here</h2>
      <form action="" onSubmit={handlesubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="user"
          name="user"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
        <br />
        <input
          className="form-control"
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <br />
        <input
          className="form-control"
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        />
        <br />
        <div className="d-flex flex-nowrap">
          <button type="submit" className="btn btn-dark mx-2">
            {isloading ? "..." : "Register"}
          </button>
          <Link to="/login" className="btn btn-dark mx-2 ">
            Signin
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
