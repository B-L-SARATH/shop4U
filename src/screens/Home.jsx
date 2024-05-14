import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { api } from "../utilities/api";
import Loader from "../components/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/index.css";
import Pagination from "../components/Pagination";
import Carousel from "../components/Carousel";

const Home = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isloading, setisloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const searchparams = new URLSearchParams(location.search);
    const pagevalue = searchparams.get("page") || 1;
    const searchvalue = searchparams.get("search") || "";
    // console.log("pagevalue", pagevalue);
    // console.log("searchvalue", searchvalue);
    const getproducts = async () => {
      const res = await api(
        "get",
        `/products?page=${pagevalue}&search=${searchvalue}&sort=${searchparams.get(
          "sort"
        )}`
      );
      // console.log("api response", res);
      setProducts(res.products);
      setisloading(false);
      setCurrentPage(res.page);
      setTotalPages(res.pages);
    };
    getproducts();
  }, [location.search]);

  const handlefilter = (e) => {
    const searchparams = new URLSearchParams(location.search);
    searchparams.set("sort", e.target.value);
    searchparams.set("page", 1);
    const search = searchparams.toString();
    // window.location.href = `/?${search}`;
    navigate(`/?${search}`);
  };
  return (
    <div>
      {isloading ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-end align-items-center ">
            <div className="p-3 ">
              <select
                name=""
                id=""
                className=" form-select form-select-sm"
                onChange={handlefilter}
              >
                <option value="0">Filter</option>
                <option value="1">Price: Low to High</option>
                <option value="2">Price: High to Low</option>
                <option value="3">Rating: High to Low</option>
                <option value="4">Rating: Low to High</option>
              </select>
            </div>
          </div>

          <div className="w-100 d-flex justify-content-center align-items-center ">
            {" "}
            <Carousel />{" "}
          </div>
          <div className="d-flex flex-row flex-wrap  gap-5 container-fluid justify-content-center my-3">
            {products.length == 0 ? (
              <h2 style={{ color: "grey" }} className="text-center">
                no results found
              </h2>
            ) : (
              products.map((product) => {
                return (
                  <Product
                    key={product._id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    _id={product._id}
                    value={product.rating}
                    numReviews={product.numReviews}
                  />
                );
              })
            )}
          </div>
        </>
      )}
      {products.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalpages={totalpages}
          location={location}
        />
      )}
    </div>
  );
};

export default Home;
