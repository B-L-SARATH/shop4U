import React from "react";
import { useState } from "react";
import { api, instance } from "../utilities/api";
import { getLocalStorage, saveLocalStorage } from "../utilities/authorization";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("form submited");
    setisloading(true);
    const data = { email, password };
    const result = await api("post", "/login", data);

    if (result.success) {
      saveLocalStorage("token", result.token);
      saveLocalStorage("email", result.email);
      console.log("login success");
      toast.success(result.message);
      instance.defaults.headers.Authorization = getLocalStorage("token");
      window.location.href = "/";
      setisloading(false);
    } else {
      toast.error(result.message);
      setisloading(false);
    }
  };

  const forgetpassword = async () => {
    if (!email) {
      toast.error("please enter email");
      return;
    }
    const data = { email };
    const result = await api("post", "/forgetpassword", data);
    console.log("resut", result);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div className="container p-3">
      <h2 className="fw-bold my-5">SignIn Here</h2>
      <form action="" onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="email"
          className="form-control"
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

        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-dark ">
            {isloading ? "..." : "Login"}
          </button>

          <Link to="/register" className="btn btn-dark">
            Signup
          </Link>

          <button onClick={forgetpassword} className="btn btn-dark">
            Forget password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
