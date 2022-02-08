import React from 'react';
import axios from 'axios';
import './style.css';

const FormComponent = props => {
  const formSubmittal = e => {
    e.preventDefault();

    let name = e.target[0].value;
    let message = e.target[1].value;

    axios
      .post('/createComment', {
        name: name,
        message: message,
      })
      .then(res => {
        if (res.status === 200) {
          props.setFormToggle(!props.formToggle);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <form className="container" id="form-container" onSubmit={formSubmittal}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="name"
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Message
          </label>
          <textarea
            name="message"
            className="form-control"
            id="exampleFormControlTextarea1"
            placeholder="message"
            rows="8"
          ></textarea>
          <button type="submit" className="btn btn-warning mt-3 mb-6">
            Post
          </button>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
