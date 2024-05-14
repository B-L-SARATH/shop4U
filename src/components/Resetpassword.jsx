import React, { useState, useEffect } from "react";
import { api } from "../utilities/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Resetpassword = () => {
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const { token } = useParams();

  const Resetpassword = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("passwords do not match");
      return;
    }
    const resetpassword = async () => {
      const res = await api("put", "/resetpassword", {
        password,
        token,
      });
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    };

    resetpassword();
  };

  return (
    <div>
      <h1>reset your password</h1>
      <form action="" onSubmit={Resetpassword}>
        <input
          type="text"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="enter new password"
          required
        />
        <br />
        <input
          type="text"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
          placeholder="confirm password"
          required
        />
        <br />
        <button type="submit">reset password</button>
      </form>
    </div>
  );
};

export default Resetpassword;
