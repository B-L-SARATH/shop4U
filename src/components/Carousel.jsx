import React from "react";

const Carousel = () => {
  return (
    <div
      id="carouselExampleFade"
      class="carousel slide carousel-fade container m-3 w-100  d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "450px" }}
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="images/banner2.jpg"
            class="d-block w-80"
            alt="..."
            style={{ width: "100%", height: "400px", borderRadius: "20px" }}
          />
        </div>
        <div class="carousel-item">
          <img
            src="images/banner1.jpg"
            class="d-block w-80"
            alt="..."
            style={{ width: "100%", height: "400px", borderRadius: "20px" ,objectFit:"cover"}}
          />
        </div>
        <div class="carousel-item">
          <img
            src="images/banner3.jpg"
            class="d-block w-80"
            alt="..."
            style={{ width: "100%", height: "400px", borderRadius: "20px" ,objectFit:"cover"}}
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
