import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from "../utilities/api";

const Adminroute = () => {
  const [isadmin, setisadmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkadmin = async () => {
      const result = await api("get", "/isadmin");
      if (result.success) {
        setisadmin(true);
      } else {
        navigate("/");
      }
    };

    checkadmin();
  }, []);

  return isadmin && <Outlet />;
};

export default Adminroute;
