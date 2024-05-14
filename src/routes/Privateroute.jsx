import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../utilities/api";
import { removeItem } from "../utilities/authorization";

const Privateroute = () => {
  const [isloggedin, setisloggedin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkauth = async () => {
      const result = await api("get", "/isauthenticated");
      if (result.success) {
        setisloggedin(true);
      } else {
        removeItem("isloggedin");
        navigate("/login");
      }
    };

    checkauth();
  }, []);

  return isloggedin && <Outlet />;
};

export default Privateroute;
