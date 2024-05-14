import React, { useState, useEffect } from "react";
import { api } from "../utilities/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Editproduct = () => {
  const [product, setproduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchproduct = async () => {
      const result = await api("get", `/products/${id}`);
      if (result.success) {
        setproduct(result.product);
      }
    };
    fetchproduct();
  }, []);

  const handleupdateproduct = async (e) => {
    e.preventDefault();
    const result = await api("put", `/updateproduct/${id}`, product);
    if (result.success) {
      toast.success(result.message);
      console.log(result.message);
    } else {
      toast.error(result.message);
      console.log(result.message);
    }
  };

  return (
    <div>
      <h1 className="m-3 text-center">Edit product</h1>
      <form action="" onSubmit={handleupdateproduct} className="container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={product.name}
            className="form-control"
            onChange={(e) => setproduct({ ...product, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            value={product.price}
            className="form-control"
            onChange={(e) => setproduct({ ...product, price: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="countInStock">countInStock</label>
          <input
            type="text"
            value={product.countInStock}
            className="form-control"
            onChange={(e) =>
              setproduct({ ...product, countInStock: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            value={product.brand}
            className="form-control"
            onChange={(e) => setproduct({ ...product, brand: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">description</label>
          <input
            type="text"
            value={product.description}
            className="form-control"
            onChange={(e) =>
              setproduct({ ...product, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">category</label>
          <input
            type="text"
            value={product.category}
            className="form-control"
            onChange={(e) =>
              setproduct({ ...product, category: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-dark my-3">
          Update
        </button>
      </form>
    </div>
  );
};

export default Editproduct;
