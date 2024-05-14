import React, { useState, useEffect } from "react";
import { api } from "../utilities/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Editprofile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setprofile] = useState({
    name: "",
    email: "",
    isadmin: "",
  });

  useEffect(() => {
    const fetchuser = async () => {
      const result = await api("get", `/user/${id}`);
      if (result.success) {
        setprofile(result.user);
      } else {
        toast.error(result.message);
      }
    };
    fetchuser();
  }, []);

  const handlesubmit = async (e) => {
    console.log("form submiited");
    e.preventDefault();
    const result = await api("put", `/updateuser/${id}`, profile);
    if (result.success) {
      toast.success(result.message);
      navigate("/profile");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="container m-5 p-5 updateprofile">
      <form action="" onSubmit={handlesubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          className="form-control"
          value={profile.name}
          onChange={(e) => setprofile({ ...profile, name: e.target.value })}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          className="form-control"
          value={profile.email}
          onChange={(e) => setprofile({ ...profile, email: e.target.value })}
        />
        <button className="btn btn-dark my-3">Update Profile</button>
      </form>
    </div>
  );
};

export default Editprofile;
