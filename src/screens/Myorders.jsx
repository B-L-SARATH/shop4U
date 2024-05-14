import React, { useState, useEffect } from "react";
import { api } from "../utilities/api";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchorders = async () => {
      const result = await api("get", "/myorders");
      if (result.success) {
        setOrders(result.orders.reverse());
        console.log(result.orders);
      } else {
        toast.error(result.message);
      }
    };
    fetchorders();
  }, []);
  return (
    <div className=" p-2 m-2">
      {orders.length == 0 ? (
        <h1 className="text-center fw-light"> No orders Found </h1>
      ) : (
        <>
          <h1 className="mx-5 my-2 text-center">My Orders</h1>
          {orders.map((order) => {
            return (
              <>
                <div className="d-flex justify-content-center shadow border p-3 m-2 my-2 flex-wrap">
                  <div className="mx-3 p-2">
                    <i class="fa-solid fa-box text-dark"></i>
                  </div>
                  <div style={{ width: "900px", overflow: "hidden" }}>
                    <p>
                      Ordered on{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                    {order.orderItems.map((item, itemindex) => (
                      <span>
                        {item.name}{" "}
                        {itemindex == order.orderItems.length - 1 ? "." : ","}
                      </span>
                    ))}
                  </div>
                  <div style={{ width: "100px" }}>
                    <Link className="btn btn-dark m-2" to={`/order/${order._id}`}>
                      view
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Orders;
