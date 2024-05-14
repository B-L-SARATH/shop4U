import React, { useState, useEffect } from "react";
import { getLocalStorage } from "../utilities/authorization";
import Rating from "./Rating";
import { api } from "../utilities/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Editreview from "../screens/Editreview";
const Reviews = ({ product }) => {
  const [showmodal, setshowmodal] = useState(false);
  const [isloggedin, setisloggedin] = useState(getLocalStorage("token"));
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");
  const [ratingvalue, setratingvalue] = useState(0);
  const { id } = useParams();
  const [currentuserid, setcurrentuserid] = useState("");
  const [submitreview, setsubmitreview] = useState(false);
  const addreview = async (e) => {
    setsubmitreview(true);
    e.preventDefault();
    const res = await api("post", `/product/${id}/addreview`, {
      rating: ratingvalue,
      comment,
    });
    if (res.success) {
      toast.success(res.message);
      setrating(0);
      setcomment("");
    } else {
      toast.error(res.message);
      setrating(0);
      setcomment("");
    }
    setsubmitreview(false);
  };

  const togglemodal = () => {
    setshowmodal(!showmodal);
  };

  useEffect(() => {
    const getuser = async () => {
      const res = await api("get", `userbymail/${getLocalStorage("email")}`);
      setcurrentuserid(res.user._id);
    };
    getuser();
  }, []);

  return (
    <>
      {showmodal && (
        <div
          style={{
            zIndex: 10,
            // backgroundColor:"red",
            backgroundColor: "rgba(0,0,0,0.7)",
            height: "100%",
            width: "100%",
            position: "fixed",
            top: "0",
            left: "0",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          {" "}
          <Editreview
            togglemodal={togglemodal}
            product={product}
            userid={currentuserid}
          />
        </div>
      )}
      <div className="container my-5 p-5">
        <h2 className="mx-5 my-5 text-center">Reviews</h2>
        {product.reviews.length === 0 && (
          <p className="alert alert-primary">No reviews</p>
        )}
        <div className="d-flex justify-content-around align-items-center flex-wrap">
          {product.reviews.map((review) => (
            <div
              key={review.user}
              className="shadow p-3 m-3"
              style={{ width: "350px" }}
            >
              <div className="d-flex justify-content-between">
                <strong className="m-2">{review.name}</strong>
                {review.user === currentuserid && (
                  <i
                    class="fa-solid fa-pen-to-square"
                    onClick={() => {
                      setshowmodal(true);
                    }}
                  ></i>
                )}
              </div>
              <div className="m-2">
                <Rating value={review.rating} text={false} />
              </div>
              <p className="m-2">{review.createdAt.substring(0, 10)}</p>
              <p className="m-2">{review.comment}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="my-5 text-center">Add Your Review</h2>
          {isloggedin ? (
            <form onSubmit={addreview} className="container ">
              <div>
                <label htmlFor="rating" className="m-3">
                  Rating
                </label>
                <div>
                  <span className="m-2" style={{ fontSize: "30px" }}>
                    😟
                  </span>
                  <span className="m-2" style={{ fontSize: "30px" }}>
                    😦
                  </span>
                  <span className="m-2" style={{ fontSize: "30px" }}>
                    ☹️
                  </span>
                  <span className="m-2" style={{ fontSize: "30px" }}>
                    😐
                  </span>
                  <span className="m-2" style={{ fontSize: "30px" }}>
                    🙂
                  </span>
                </div>
                <div>
                  <span
                    onClick={() => {
                      setratingvalue(1);
                    }}
                  >
                    {ratingvalue > 0 ? (
                      <i class="fa-solid fa-star m-3"></i>
                    ) : (
                      <i class="fa-regular fa-star m-3"></i>
                    )}
                  </span>
                  <span
                    onClick={() => {
                      setratingvalue(2);
                    }}
                  >
                    {ratingvalue > 1 ? (
                      <i class="fa-solid fa-star m-3"></i>
                    ) : (
                      <i class="fa-regular fa-star m-3"></i>
                    )}
                  </span>
                  <span
                    onClick={() => {
                      setratingvalue(3);
                    }}
                  >
                    {ratingvalue > 2 ? (
                      <i class="fa-solid fa-star m-3"></i>
                    ) : (
                      <i class="fa-regular fa-star m-3"></i>
                    )}
                  </span>
                  <span
                    onClick={() => {
                      setratingvalue(4);
                    }}
                  >
                    {ratingvalue > 3 ? (
                      <i class="fa-solid fa-star m-3"></i>
                    ) : (
                      <i class="fa-regular fa-star m-3"></i>
                    )}
                  </span>
                  <span
                    onClick={() => {
                      setratingvalue(5);
                    }}
                  >
                    {ratingvalue > 4 ? (
                      <i class="fa-solid fa-star m-3"></i>
                    ) : (
                      <i class="fa-regular fa-star m-3"></i>
                    )}
                  </span>
                </div>

                <div className="m-3">
                  <label htmlFor="comment" className="my-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="m-3">
                  <button className="btn btn-dark m-2" type="submit">
                    {submitreview ? "..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <p className="alert alert-danger my-4 text-center">
                {" "}
                Please login to write a review
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
