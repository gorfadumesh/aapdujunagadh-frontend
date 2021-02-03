import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
export default function Slider() {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    axios.get("/slider/getall").then(({ data }) => {
      console.log(data);
      setSlides(data);
    });
  }, []);
  return (
    <div style={{ width: "70%", margin: "0% 15%" }}>
      <button>
        <Link to={"/admin"}>Admin</Link>
      </button>
      <Carousel
        width={"auto"}
        interval={2000}
        autoPlay={true}
        infiniteLoop={true}
        stopOnHover={false}
        showThumbs={false}
      >
        {slides.length > 0
          ? slides.map(({ url, title, image }) => {
              return (
                <div>
                  <img src={url} />
                  <p className="legend">{title}</p>
                </div>
              );
            })
          : null}
      </Carousel>
    </div>
  );
}
