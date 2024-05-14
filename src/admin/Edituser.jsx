import React, { useEffect, useState } from "react";
import { api } from "../utilities/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
const Edituser = () => {
  const [user, setuser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchuser = async () => {
      const result = await api("get", `/user/${id}`);
      if (result.success) {
        setuser(result.user);
      } else {
        toast.error(result.message);
      }
    };
    fetchuser();
  }, []);

  const handlesubmit = async (e) => {
    console.log("form submiited");
    e.preventDefault();
    const result = await api("put", `/updateuser/${id}`, user);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div>
      <h1 className="m-2 text-center">Update User</h1>
      <form action="" onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={user.name}
            className="form-control"
            onChange={(e) => setuser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            value={user.email}
            className="form-control"
            onChange={(e) => setuser({ ...user, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="isAdmin">isAdmin</label>
          <input
            type="text"
            value={user.isAdmin}
            className="form-control"
            onChange={(e) => setuser({ ...user, isAdmin: e.target.value })}
          />
        </div>
        <button className="btn btn-dark" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default Edituser;
