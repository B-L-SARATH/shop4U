import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../utilities/api";
import { toast } from "react-toastify";
import { clear } from "../slices/Cartslice";
import { useNavigate } from "react-router-dom";
import "../assets/styles/index.css";
const Ordersummary = () => {
  const cartitems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const address = JSON.parse(localStorage.getItem(`shippingaddress_${email}`));

  const orderprice = cartitems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);
  const shippingprice = orderprice > 100 ? 0 : 49.99;
  const totalprice = parseFloat(orderprice) + parseFloat(shippingprice);

  const confirmorder = async (payment_id) => {
    const paymentResult = {
      paidAt: Date.now(),
      status: "success",
      payment_id: payment_id,
    };
    const result = await api("post", "/order", {
      orderItems: cartitems,
      shippingAddress: address,
      shippingPrice: shippingprice,
      totalPrice: totalprice,
      paymentResult,
    });

    if (result.success) {
      toast.success(result.message);
      console.log("order is placed");
      dispatch(clear());
      navigate("/");
    } else {
      toast.error(result.message);
      console.log(result.message);
    }
  };

  const placeorder = async () => {
    console.log("order is placed");
    const user = await api(
      "get",
      "userbymail/" + localStorage.getItem("email")
    );
    const keyid = await api("get", "getkey");

    const createorder = await api("post", "createorder", {
      amount: totalprice,
    });

    console.log(createorder);

    const options = {
      key: keyid.key,
      amount: totalprice,
      currency: "INR",
      name: "Shop4U",
      description: "Make the payment",
      image: "./images/sample.jpg",
      order_id: createorder.order.id,
      handler: async (response) => {
        const result = await api("post", "paymentverification", {
          response,
        });
        if (result.success) {
          confirmorder(result.payment_id);
        } else {
          toast.error(result.message);
          console.log(result.message);
        }
      },
      prefill: {
        name: user.user.name,
        email: user.user.email,
      },
      notes: {
        address: "Srikakulam 532001",
      },
      theme: {
        color: "#0C0D0E",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="d-flex justify-content-between m-5 flex-wrap">
      <div className="d-flex flex-column m-2 " style={{ width: "600px" }}>
        <div className=" p-3">
          <h2 className="my-3">Shipping</h2>
          <p>
            {" "}
            <span className="fw-bold">Address: </span>
            {address.address} ,{address.city},{address.postalCode},{" "}
            {address.country}
          </p>
        </div>
        <hr />

        <div className="my-3 p-3">
          <h2 className="my-2">Order Items</h2>

          <table
            className="table container orderitems"
            style={{ width: "600px" }}
          >
            <tbody>
              {cartitems.map((item, index) => (
                <tr key={index}>
                  <td>
                    {" "}
                    <img
                      src={item.img}
                      alt=""
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>${item.price}</p>
                  </td>
                  <td>
                    <p>Qty:{item.qty}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="border p-5 m-2">
        <h1>Order summary</h1>
        <hr />
        <p>Items price: $ {orderprice}</p>
        <hr />
        <p>Shipping : {shippingprice}</p>

        <hr />
        <p>Total: {totalprice}</p>
        <hr />
        <button className="btn btn-dark" onClick={placeorder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Ordersummary;
