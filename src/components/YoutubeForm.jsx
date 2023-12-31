import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import "./youtube.css";

const initialValues = {
  username: "",
  email: "",
  channel: "",
};

const YoutubeForm = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log("Form values", values);

    try {
      const res = await axios.post(
        "https://656a41cfde53105b0dd853c3.mockapi.io/api/v1/UsersEmail",
        values
      );
      const data = res.data;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Ism Kiritilmadi!";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Emailni Formati notog'ri!";
    }
    if (!values.channel) {
      errors.channel = "Parol kiritilmadi!";
    }
    return errors;
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Ism Kiritilmadi!"),
    email: Yup.string()
      .email("Emailni Formati notog'ri!")
      .required("Email Kirirtilmadi!"),
    channel: Yup.string().required("Parol kiritilmadi!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    validationSchema,
  });

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    formik;

  useEffect(() => {
    // Code to run on component mount or update
  }, []);

  return (
    <div className="form mt-5">
      <form onSubmit={handleSubmit}>
        <h2>Welcome Modest!</h2>
        <div className="form-control">
          <label htmlFor="username">ISM</label>
          <input
            type="text"
            id="username"
            className="form-control"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.username && errors.username ? (
            <div className="error">{errors.username}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {touched.email && errors.email ? (
            <div className="error">{errors.email}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="channel">Parol</label>
          <input
            className="form-control"
            type="text"
            id="channel"
            name="channel"
            value={values.channel}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.channel && errors.channel ? (
            <div className="error">{errors.channel}</div>
          ) : null}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default YoutubeForm;
