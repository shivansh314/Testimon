// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const LoginForm = () => {
  const { register,handleSubmit, formState: { errors }} = useForm();
 

  const onSubmit = async (data) => {4
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
      console.log(response.data);
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
        <h2 className=" text-2xl font-serif">Login</h2>
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
