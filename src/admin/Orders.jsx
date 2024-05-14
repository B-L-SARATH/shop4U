import React, { useState, useEffect } from "react";
import { api } from "../utilities/api";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchorders = async () => {
      const result = await api("get", "/orders");
      if (result.success) {
        setOrders(result.orders);
        console.log(result.orders);
      } else {
        toast.error(result.message);
      }
    };
    fetchorders();
  }, []);
  return (
    <div>
      <h1 className="mx-5">orders</h1>

      <table className="table container">
        <thead>
          <tr>
            <th> ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id} </td>
              <td>{order.user.name}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.totalPrice}</td>
              <td>{order.paymentResult.status}</td>

              <td>
                {order.isDelivered ? (
                  <span className="text-success">"Delivered" </span>
                ) : (
                  <span className="text-danger">"Not Delivered" </span>
                )}
              </td>
              <td>
                <Link className="btn btn-dark" to={`order/${order._id}`}>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
