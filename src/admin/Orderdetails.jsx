import React, { useEffect, useState } from "react";
import { api } from "../utilities/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Orderdetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    user: {},
    shippingAddress: {},
    paymentMethod: "",
    orderItems: [],
  });
  useEffect(() => {
    const fetchorder = async () => {
      const result = await api("get", `/order/${id}`);
      console.log(result);
      if (result.success) {
        setOrder(result.order);
        console.log(result.order);
      }
    };
    fetchorder();
  }, []);

  const deliverorder = async () => {
    console.log("deliver order", id);
    const result = await api("put", `/deliverorder/${id}`);
    if (result.success) {
      toast.success(result.message);
      setOrder({ ...order, isDelivered: true });
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <h1 className="mx-5">Order {id}</h1>
      <div className="d-flex p-5">
        <div className="mx-4" style={{ width: "700px" }}>
          {/* shipping details  */}

          <h2>Shipping</h2>
          <p>
            <strong>Name:</strong> {order.user.name}
          </p>

          <p>
            <strong>Email:</strong> {order.user.email}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {order.shippingAddress.address +
              " " +
              order.shippingAddress.city +
              " " +
              order.shippingAddress.country}
          </p>

          {order.isDelivered ? (
            <p className="alert alert-success">Delivered</p>
          ) : (
            <p className="alert alert-danger">Not Delivered</p>
          )}
          <hr />

          {/* payment details */}

          <h2>Payment Method</h2>
          <p>
            <strong>Method:</strong> {order.paymentMethod}
          </p>
          <p className="alert alert-success">Paid at {order.createdAt} </p>
          <hr />

          {/* order items */}
          <h2>Order Items</h2>
          <table className="table">
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img src={item.image} alt="" style={{ width: "50px" }} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          className="shadow border p-2 d-flex flex-column justify-content-around align-items-around"
          style={{ height: "300px", width: "350px" }}
        >
          <div className=" text-center">
            <h2>Order Summary</h2>
          </div>
          <hr />
          <div className="d-flex justify-content-around">
            <div>
              Items <br />
              Shipping <br />
              Total <br />
            </div>
            <div>
              {order.orderItems.reduce((acc, item) => acc + item.qty, 0)} <br />
              ${order.shippingPrice} <br />${order.totalPrice} <br />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            {order.isDelivered ? (
              <p className="text-success">Delivered</p>
            ) : (
              <button
                className="btn btn-dark"
                style={{ width: "200px" }}
                onClick={deliverorder}
              >
                Mark as Delivered
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderdetails;
