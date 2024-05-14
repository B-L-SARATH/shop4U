import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
const Product = (props) => {
  console.log(props);
  return (
    <div className="card shadow" style={{ width: "18rem" }}>
      <Link to={`/product/${props._id}`}>
        <img src={props.image} class="card-img-top" alt="..." style={{height:"100%"}}/>
      </Link>
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <Rating value={props.value} text={props.numReviews} />
        <h3 className="my-1">${props.price}</h3>
      </div>
    </div>
  );
};

export default Product;
