import React, { useState } from "react";
import Modal from "./TableModal";

export default function TableComponent({ props, onDelete, update }) {
  const { url, title, image, _id } = props;

  const [state, setstate] = useState({
    title,
    url,
    image,
    show: false,
  });
  const setState = async (key) => {
    await setstate({ ...state, ...key });
  };
  const handleChange = (e) => {
    var obj = {};
    obj[e.target.name] = e.target.value;
    setState(obj);
  };
  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     axios.post("/slider/add", state).then(({ data }) => {
  //       console.log(data);
  //       setSlides([...slides, data]);
  //     });
  //     setstate({ title: "", url: "", image: "" });
  //   };
  const showModal = (e) => {
    setState({
      show: !state.show,
    });
  };
  return (
    <tr>
      <td>{title}</td>
      <td>{url}</td>
      <td>{image}</td>
      <td>
        <button
          onClick={(e) => {
            showModal(e);
          }}
        >
          Update
        </button>
        <Modal onClose={showModal} show={state.show}>
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
          <button
            onClick={() => {
              update({ ...state, slideId: _id });
              showModal();
            }}
          >
            Update
          </button>
          {/* </form> */}
        </Modal>
        <button
          onClick={() => {
            console.log(_id);
            onDelete(_id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
