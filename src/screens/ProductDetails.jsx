import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import { api } from "../utilities/api";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import { update, add } from "../slices/Cartslice";
import { getLocalStorage } from "../utilities/authorization";
import { toast } from "react-toastify";
import Reviews from "../components/Reviews";

const ProductDetails = () => {
  const [isloggedin, setisloggedin] = useState(getLocalStorage("token"));
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isloading, setisloading] = useState(true);
  const [additemloading, setadditemloading] = useState(false);
  const [qty, setqty] = useState(1);

  useEffect(() => {
    const getproduct = async () => {
      const res = await api("get", `products/${id}`);

      setProduct(res.product);
      setisloading(false);
    };
    getproduct();
  }, [product]);

  const addtocart = () => {
    setadditemloading(true);
    for (let i = 0; i < cartitems.length; i++) {
      if (cartitems[i].id === product._id) {
        dispatch(
          update({
            id: product._id,
            name: product.name,
            img: product.image,
            qty,
            price: product.price,
            stock: product.countInStock,
          })
        );
        toast.success("product added successfully");
        setadditemloading(false);
        return;
      }
    }
    dispatch(
      add({
        id: product._id,
        name: product.name,
        img: product.image,
        qty,
        price: product.price,
        stock: product.countInStock,
      })
    );
    toast.success("product added successfully");
    setadditemloading(false);
  };

  return (
    <div>
      {isloading ? (
        <Loader />
      ) : (
        <div>
          <Link className="btn btn-dark mx-3 my-3" to="/">
            Go back
          </Link>
          <div className="d-flex justify-content-around align-items-center flex-wrap">
            <div
              className="imgcontainer shadow m-2 "
              style={{ width: "400px" }}
            >
              <img
                src={product.image}
                alt="product image"
                style={{ width: "100%" }}
              />
            </div>
            <div
              className="productdetails p-4 shadow m-2"
              style={{ width: "400px" }}
            >
              <h3>{product.name}</h3>
              <hr />
              <Rating value={product.rating} text={product.numReviews} />
              <hr />
              <h3>Price: ${product.price}</h3>
              <hr />
              <p>Description: {product.description}</p>
            </div>
            <div
              className="pricedetails shadow p-4 m-2"
              style={{ width: "400px" }}
            >
              <p>
                Price: <span className="fw-bold">${product.price}</span>
              </p>
              <hr />
              <p>
                Status:{" "}
                <span className="fw-bold">
                  {" "}
                  {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <hr />
              {product.countInStock > 0 && (
                /* <p>
                  Qty:{" "}
                  <select
                    className="rounded-3 shadow"
                    onChange={(e) => setqty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => {
                      return (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      );
                    })}
                  </select>
                </p> */
                <>
                  <span>
                    <button
                      onClick={() => setqty((prev) => prev - 1)}
                      disabled={qty == 0 && true}
                      className="btn btn-dark m-1 "
                    >
                      -
                    </button>
                  </span>
                  {qty}
                  <span>
                    <button
                      onClick={() => setqty((prev) => prev + 1)}
                      className="btn btn-dark m-1"
                      disabled={qty == product.countInStock && true}
                    >
                      +
                    </button>
                  </span>
                </>
              )}
              {isloggedin ? (
                product.countInStock > 0 ? (
                  <button className="btn btn-dark mx-4" onClick={addtocart}>
                    {additemloading ? "..." : "Add to cart"}
                  </button>
                ) : (
                  <button className="btn btn-dark mx-4" disabled>
                    Out of stock
                  </button>
                )
              ) : (
                <Link to="/login" className="btn btn-dark">
                  {" "}
                  Login to add to cart
                </Link>
              )}
            </div>
          </div>

          {/* reviews */}
          <Reviews product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
