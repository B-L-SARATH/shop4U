import React, { useEffect, useState } from "react";
import { api } from "../utilities/api";
import { Link } from "react-router-dom";
const Users = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const result = await api("get", "/users");
      if (result.success) {
        console.log("response", result.users);
        setusers(result.users);
      } else {
        console.log(result.message);
      }
    };
    getUsers();
  }, [  ]);

  const deleteuser = async (id) => {
    const result = await api("delete", `/deleteuser/${id}`);
    if (result.success) {
      console.log(result.message);
    } else {
      console.log(result.message);
    }
  };
  return (
    <div>
      <h1 className="text-center m-3">Users List</h1>
      <table className="table container">
        <thead>
          <th>sno</th>
          <th>name</th>
          <th>email</th>
          <th>isAdmin</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <Link to={`edituser/${user._id}`}>
                  <i className="fa-solid fa-pen-to-square text-dark"></i>
                </Link>
              </td>
              <td>
                <i
                  className="fa-solid fa-trash text-danger"
                  onClick={() => {
                    deleteuser(user._id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
