import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

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
        "https://653a5527e3b530c8d9e98349.mockapi.io/api/v1/users",
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
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    if (!values.channel) {
      errors.channel = "Channel is required";
    }
    return errors;
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required!"),
    email: Yup.string()
      .email("Invalid email format!")
      .required("Email is required!"),
    channel: Yup.string().required("Channel is required!"),
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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
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
          <label htmlFor="channel">Channel</label>
          <input
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default YoutubeForm;
