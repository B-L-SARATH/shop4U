import React, { useEffect, useState } from "react";
import { api } from "../utilities/api";
import { useParams } from "react-router-dom";
const Orderdetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    user: {},
    shippingAddress: {},
    paymentMethod: "",
    orderItems: [],
    paymentResult: { status: "", payment_id: "" },
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

  return (
    <>
      <h1 className="mx-5 my-2">Your Order Details</h1>
      <div className="d-flex p-5 justify-content-around flex-wrap">
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

          <h2>Payment Status</h2>
          <p
            className={
              order.paymentResult.status == "success"
                ? "alert alert-success"
                : "alert alert-danger"
            }
          >
            {order.paymentResult.status}
          </p>
          <hr />
          <p className="alert alert-success">Paid at {order.createdAt} </p>
          <hr />

          <h2>Reference ID</h2>
          <p className="alert alert-primary">
            {order.paymentResult.payment_id}
          </p>

          <hr />
          {/* order items */}
          <h2>Order Items</h2>
          <table className="table">
            <tbody>
              {order.orderItems.length > 0 &&
                order.orderItems.map((item) => (
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
        </div>
      </div>
    </>
  );
};

export default Orderdetails;
