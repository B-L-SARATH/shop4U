import React, { useState } from "react";
import { api } from "../utilities/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Changepassword = () => {
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();
  const Changepassword = async (e) => {
    e.preventDefault();
    if (newpassword !== confirmpassword) {
      toast.error("passwords do not match");
      return;
    }
    const res = await api("post", "/changepassword", {
      oldpassword,
      newpassword,
    });
    if (res.success) {
      toast.success(res.message);
      navigate("/profile");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="container p-3 ">
      <h1 className="my-3">Change Password</h1>
      <form action="" onSubmit={Changepassword}>
        <input
          type="password"
          value={oldpassword}
          onChange={(e) => setoldpassword(e.target.value)}
          placeholder="enter old password"
          required
          className="form-control"
        />
        <br />
        <input
          type="password"
          value={newpassword}
          onChange={(e) => setnewpassword(e.target.value)}
          placeholder="enter new password"
          required
          className="form-control"
        />
        <br />
        <input
          type="password"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          placeholder="confirm password"
          required
          className="form-control"
        />
        <br />
        <button type="submit" className="btn btn-dark">
          Change password
        </button>
      </form>
    </div>
  );
};

export default Changepassword;
