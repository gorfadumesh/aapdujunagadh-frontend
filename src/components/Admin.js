import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import TableComponent from "./TableComponent";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

export default function Admin() {
  const [state, setstate] = useState({ title: "", url: "", image: "" });
  const [slides, setSlides] = useState([]);

  const setState = async (key) => {
    await setstate({ ...state, ...key });
  };
  useEffect(() => {
    axios.get("/slider/getall").then(({ data }) => {
      console.log(data);
      setSlides(data);
    });
  }, []);
  const handleChange = (e) => {
    var obj = {};
    obj[e.target.name] = e.target.value;
    setState(obj);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/slider/add", state).then(({ data }) => {
      console.log(data);
      setSlides([...slides, data]);
    });
    setstate({ title: "", url: "", image: "" });
  };

  const update = (data) => {
    console.log(data);
    axios.post("/slider/update", data).then(({ data }) => {
      console.log(data);
      setSlides(
        slides.map((slide) => {
          if (slide._id == data._id) return data;
          else {
            return slide;
          }
        })
      );
    });
    setstate({ title: "", url: "", image: "" });
  };

  const onDelete = (slideId) => {
    axios.post("/slider/delete", { slideId }).then(({ data }) => {
      setSlides(slides.filter((slide) => slide._id !== slideId));
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Url:
          <input
            type="text"
            name="url"
            value={state.url}
            onChange={handleChange}
          />
        </label>
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={state.image}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button>
        <Link to={"/"}>Home</Link>
      </button>
      <table id="admin">
        <tr>
          <th>Title</th>
          <th>Url</th>
          <th>Image</th>
          <th>Edit</th>
        </tr>
        {slides.map((props) => {
          return (
            <TableComponent props={props} onDelete={onDelete} update={update} />
          );
        })}
      </table>
    </div>
  );
}
