import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../slices/Cartslice";
import { Link } from "react-router-dom";
import { api } from "../utilities/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Cartitems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartitems = useSelector((state) => state.cart);
  const removecartitem = (index) => {
    dispatch(remove(index));
  };

  const proceedToCheckout = async () => {
    console.log("proceed to checkout");
    console.log(cartitems);
    const response = await api("post", "isproductsavailable", { cartitems });
    console.log(response);
    if (!response.success) {
      toast.error(response.message);
    } else {
      navigate("/shipping");
    }
  };

  return (
    <div className="mx-3 my-2">
      {cartitems.length === 0 ? (
        <>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h3 className="mx-5 my-3 fw-light ">Cart is empty</h3>
            <img
              src="/images/emptycart.jpg"
              alt="cart img"
              style={{ width: "400px", height: "400px" }}
            />
          </div>
        </>
      ) : (
        <>
          <h1 className="mx-5 my-3"> Shopping Cart</h1>

          <div className="d-flex justify-content-around p-5 flex-wrap">
            {/* cartitemsdiv */}

            <table className="table container" style={{ width: "800px" }}>
              {cartitems.map((item, index) => (
                <tr>
                  <td>
                    {" "}
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.img}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Link>
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
                  <td>
                    <i
                      class="fa-solid fa-trash"
                      onClick={() => {
                        removecartitem(index);
                      }}
                    ></i>
                  </td>
                </tr>
              ))}
            </table>
            {/* amount div */}
            <div
              className="p-3 shadow"
              style={{ width: "300px", height: "200px" }}
            >
              <h4 className="my-2 fw-bold">
                Subtotal {cartitems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                items
              </h4>

              <h6 className="my-2">
                {" "}
                ${" "}
                {cartitems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h6>
              <hr />
              <button className="btn btn-dark" onClick={proceedToCheckout}>
                Proceed to checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Cartitems;
