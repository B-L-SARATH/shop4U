import React, { useState } from "react";
import { api } from "../utilities/api";
import { toast } from "react-toastify";
const Editreview = ({ togglemodal, product, userid }) => {
  const userreview = product.reviews.find((review) => review.user === userid);
  console.log("userreview", userreview);
  const [ratingvalue, setratingvalue] = useState(userreview.rating);
  const [comment, setcomment] = useState(userreview.comment);
  console.log("edit component will be rednered");

  const updatereview = async (e) => {
    e.preventDefault();
    const res = await api("put", `/product/${product._id}/updatereview`, {
      rating: ratingvalue,
      comment,
    });
    if (res.success) {
      console.log("review updated");
      toast.success(res.message);
      togglemodal();
    } else {
      console.log("review not updated");
      toast.error(res.message);
    }
  };
  return (
    <div
      style={{ width: "500px", height: "500px" }}
      className="rounded-3 bg-light"
    >
      <div className="d-flex justify-content-between p-3">
        <span className="fw-bold">Edit review here</span>
        <button className="btn btn-dark" onClick={() => togglemodal()}>
          close it{" "}
        </button>
      </div>
      <hr />
      <div>
        <form className="container p-3" onSubmit={updatereview}>
          <div>
            <label htmlFor="rating" className="m-3 fw-bold">
              Rating
            </label>
            <div>
              <span
                onClick={() => {
                  setratingvalue(1);
                }}
              >
                {ratingvalue > 0 ? (
                  <i class="fa-solid fa-star m-4"></i>
                ) : (
                  <i class="fa-regular fa-star m-4"></i>
                )}
              </span>
              <span
                onClick={() => {
                  setratingvalue(2);
                }}
              >
                {ratingvalue > 1 ? (
                  <i class="fa-solid fa-star m-4"></i>
                ) : (
                  <i class="fa-regular fa-star m-4"></i>
                )}
              </span>
              <span
                onClick={() => {
                  setratingvalue(3);
                }}
              >
                {ratingvalue > 2 ? (
                  <i class="fa-solid fa-star m-4"></i>
                ) : (
                  <i class="fa-regular fa-star m-4"></i>
                )}
              </span>
              <span
                onClick={() => {
                  setratingvalue(4);
                }}
              >
                {ratingvalue > 3 ? (
                  <i class="fa-solid fa-star m-4"></i>
                ) : (
                  <i class="fa-regular fa-star m-4"></i>
                )}
              </span>
              <span
                onClick={() => {
                  setratingvalue(5);
                }}
              >
                {ratingvalue > 4 ? (
                  <i class="fa-solid fa-star m-4"></i>
                ) : (
                  <i class="fa-regular fa-star m-4"></i>
                )}
              </span>
            </div>

            <div className="m-3">
              <label htmlFor="comment" className="my-2 fw-bold">
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
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editreview;
