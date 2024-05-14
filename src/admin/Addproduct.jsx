import React, { useState } from "react";
import { api } from "../utilities/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Addproduct = () => {
  const navigate = useNavigate();
  const [product, setproduct] = useState({
    name: "",
    price: "",
    countInStock: "",
    brand: "",
    category: "",
    description: "",
    image: "",
  });

  const [uploading, setuploading] = useState(0);
  const [showupload, setshowupload] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log(product);

    const result = await api("post", "products", product);
    if (result.success) {
      toast.success("product added successfully");
      setproduct({
        name: "",
        price: "",
        countInStock: "",
        brand: "",
        category: "",
        description: "",
        image: "",
      });
      setshowupload(false);
      navigate("/getproducts");
    } else {
      toast.error("product not added");
    }
  };

  const uploadfilehandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "mycloud");
    formData.append("cloud_name", "drzahfghf");
    formData.append("folder", "ecommerce");
    formData.append("file", file);
    setshowupload(true);
    try {
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/drzahfghf/image/upload",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setuploading(percentCompleted);
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        }
      );
      console.log(result.data.url);
      console.log(result.data.secure_url);
      setproduct({ ...product, image: result.data.url });
      toast.success("image uploaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("image not uploaded");
    }
  };
  return (
    <div className="container" style={{ width: "500px" }}>
      <h1 className="m-4 my-3">Enter Product Details</h1>
      <form action="" onSubmit={handlesubmit}>
        <label htmlFor="">Product name</label>
        <br />

        <input
          type="text"
          placeholder="enter product name"
          className="form-control"
          value={product.name}
          onChange={(e) => setproduct({ ...product, name: e.target.value })}
          required
        />

        <br />
        <label htmlFor="">Product price</label>
        <br />
        <input
          type="text"
          placeholder="enter product price"
          className="form-control"
          value={product.price}
          onChange={(e) => setproduct({ ...product, price: e.target.value })}
          required
        />
        <br />
        <label htmlFor="">Product quantity</label>
        <br />
        <input
          type="text"
          placeholder="enter product quantity"
          className="form-control"
          value={product.countInStock}
          onChange={(e) =>
            setproduct({ ...product, countInStock: e.target.value })
          }
          required
        />
        <br />
        <label htmlFor="">Product description</label>
        <br />
        <input
          type="text"
          placeholder="enter product description"
          className="form-control"
          value={product.description}
          onChange={(e) =>
            setproduct({ ...product, description: e.target.value })
          }
          required
        />
        <br />
        <label htmlFor="">Product category</label>
        <br />
        <input
          type="text"
          placeholder="enter product category"
          className="form-control"
          value={product.category}
          onChange={(e) => setproduct({ ...product, category: e.target.value })}
          required
        />
        <br />
        <label htmlFor="">Product Brand</label>
        <br />
        <input
          type="text"
          placeholder="enter product brand"
          className="form-control"
          value={product.brand}
          onChange={(e) => setproduct({ ...product, brand: e.target.value })}
          required
        />
        <br />
        <label htmlFor="">Product image</label>
        <br />
        <input
          type="file"
          className="form-control"
          onChange={uploadfilehandler}
          required
        />
        {showupload && <p className="m-2">{uploading}% uploaded</p>}
        <br />

        <button class="btn btn-dark" type="submit">
          {" "}
          Add product
        </button>
      </form>
    </div>
  );
};

export default Addproduct;
