import { DevTool } from '@hookform/devtools';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
  const [imgPost, setImgPost] = useState(null);

  const form = useForm();
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = form;

  const onSubmit = () => {
    console.log('Form values');
  };

  async function addPost() {
    let config = {
      'Content-Type': 'multipart/form-data',
    };
    let post = new FormData();
    post.append('title', title);
    post.append('body', body);
    post.append('img', imgPost);

    try {
      const res = await axios.post(
        'https://64dcf61be64a8525a0f76c4d.mockapi.io/api/v1/products',
        post
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2>Register</h2>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register('username', {
                required: 'Username is required',
              })}
            />
            {errors.username ? (
              <div className="error">{errors.username.message}</div>
            ) : null}
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email ? (
              <div className="error">{errors.email.message}</div>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <input
              type="text"
              id="channel"
              {...register('channel', {
                required: 'Channel is required',
              })}
            />
            {errors.channel ? (
              <div className="error">{errors.channel.message}</div>
            ) : null}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      <DevTool control={control} />
    </>
  );
};

export default Register;
