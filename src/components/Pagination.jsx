import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ currentPage, totalpages, location }) => {
  const searchparams = new URLSearchParams(location.search);

  const navigateTo = (page) => {
    searchparams.set("page", page);
    return `${location.pathname}?${searchparams.toString()}`;
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5 p-5">
      <nav aria-label="...">
        <ul class="pagination ">
          <li class="page-item">
            <Link
              class={` page-link ${currentPage <= 1 && "disabled"}`}
              to={navigateTo(currentPage - 1)}
            >
              Previous
            </Link>
          </li>
          <li class="page-item active">
            <Link class="page-link" to={navigateTo(currentPage)}>
              {currentPage}
            </Link>
          </li>
          <li class="page-item " aria-current="page">
            <Link
              className={`page-link ${currentPage >= totalpages && "disabled"}`}
              to={navigateTo(currentPage + 1)}
            >
              {currentPage + 1}
            </Link>
          </li>

          <li class={`page-item  ${currentPage >= totalpages && "disabled"}`}>
            <Link class="page-link" to={navigateTo(currentPage + 1)}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
