import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { api } from "../utilities/api";
import { toast } from "react-toastify";
import Pagination from "../components/Pagination";
const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  useEffect(() => {
    const searchparams = new URLSearchParams(location.search);
    const pagevalue = searchparams.get("page") || 1;
    const searchvalue = searchparams.get("search") || "";
    // console.log("pagevalue", pagevalue);
    // console.log("searchvalue", searchvalue);
    const getproducts = async () => {
      const res = await api(
        "get",
        `/products?page=${pagevalue}&search=${searchvalue}`
      );
      setProducts(res.products);
      setisloading(false);
      setCurrentPage(res.page);
      setTotalPages(res.pages);
    };
    getproducts();
  }, [location.search]);

  const handledelete = async (id) => {
    const res = await api("delete", `/deleteproduct/${id}`);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div>
      <h1 className="text-center m-2">products</h1>

      <Link className="btn btn-dark mx-5 my-3" to="/addproduct">
        Add product
      </Link>
      <table className="table container">
        <thead>
          <tr>
            <th> ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>stock</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id} </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.countInStock}</td>
              <td>{product.brand} </td>
              <td>
                <Link to={`editproduct/${product._id}`}>
                  <i class="fa-solid fa-pen-to-square text-dark"></i>
                </Link>
              </td>
              <td>
                <i
                  class="fa-solid fa-trash text-danger"
                  onClick={() => {
                    handledelete(product._id);
                  }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalpages={totalpages} />
    </div>
  );
};

export default Products;
