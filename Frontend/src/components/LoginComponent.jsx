// src/components/LoginComponent.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate , Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import {  login  } from "../store/authSlice.js";

const LoginComponent = () => {
  const { register,handleSubmit, formState: { errors }} = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate()
 

  const onSubmit = async (data) => {
    try {
      // Make the login request to your backend
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        data,
        {
          withCredentials: true, // Allows sending cookies
        }
      );

      // Handle successful login (e.g., store user info or redirect)
      const userData = response.data ;
      // console.log(userData);
      if ( userData ){
        dispatch(login({ userData }));
      }
      navigate("/")
      alert("Login successful");
      
    } catch (error) {
      // Handle errors
      console.error(error.response?.data?.message || "Login failed");
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex justify-center items-center flex-col">
        <h2 className="mt-6text-center text-3xl font-semibold font-manrope leading-tight opacity-90">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w ">
          Or &nbsp;
          
          <Link
            to="/register"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            create an account
          </Link>
        </p>
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="inline-block mb-1 pl-1">Email</label>
              <input
                className="x-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  validate: {
                    matchPatern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div>
              <label className="inline-block mb-1 pl-1">Username</label>
              <input
                className="x-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                type="text"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
              <label className="inline-block mb-1 pl-1">Password</label>
              <input
                className="x-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
