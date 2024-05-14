import React from "react";

const Rating = (props) => {
  return (
    <div>
      <span>
        {props.value >= 1 ? (
          <i class="fa-solid fa-star"></i>
        ) : props.value >= 0.5 ? (
          <i class="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}
      </span>
      <span>
        {props.value >= 2 ? (
          <i class="fa-solid fa-star"></i>
        ) : props.value >= 1.5 ? (
          <i class="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}{" "}
      </span>{" "}
      <span>
        {" "}
        {props.value >= 3 ? (
          <i class="fa-solid fa-star"></i>
        ) : props.value >= 2.5 ? (
          <i class="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}{" "}
      </span>{" "}
      <span>
        {" "}
        {props.value >= 4 ? (
          <i class="fa-solid fa-star"></i>
        ) : props.value >= 3.5 ? (
          <i class="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}{" "}
      </span>{" "}
      <span>
        {" "}
        {props.value >= 5 ? (
          <i class="fa-solid fa-star"></i>
        ) : props.value >= 4.5 ? (
          <i class="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i class="fa-regular fa-star"></i>
        )}{" "}
      </span>
      {props.text ? <span>{props.text} reviews</span> : ""}
    </div>
  );
};

export default Rating;
