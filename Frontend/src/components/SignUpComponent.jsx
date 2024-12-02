// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {useNavigate , Link } from "react-router-dom";
import axios from 'axios';

import Input from "./Input.jsx";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const SignUpComponent = ()=>{
    const { register , handleSubmit } = useForm()
    const navigate = useNavigate()
  // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState();

    const onSubmit = async(data) => {
        try {
          const formData = new FormData(); // Create a new FormData object

          // Append form fields to the FormData object
          formData.append("username", data.username);
          formData.append("fullName", data.fullName);
          formData.append("email", data.email);
          formData.append("password", data.password);
          formData.append("avatar", data.avatar[0]); // Append the avatar file

          console.log(data);

          const response = await axios.post(
            "http://localhost:8000/api/v1/users/register",
            formData,
            {
              withCredentials: true,
            }
          );

          console.log(response.data);

          alert("Sign up successfull");
        } catch (error) {
            setError(error)
            console.log(error.response?.data?.message  || "signup failed ");  
        }  
        }
    
    return (
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <h2 className="text-center text-2xl font-semibold font-manrope leading-tight opacity-90">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-black/60 font-manrope">
              Already have an account?&nbsp;
            </p>
            <h2 className="text-sm text-primary transition-all duration-200 hover:underline text-center font-manrope">
              <Link to ="/login">
                Sign In
              </Link>
            </h2>
             {error && <p className="text-red-600 mt-1 text-center">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <Input
                  label="User Name: "
                  placeholder="Enter your username"
                  {...register("username", {
                    required: true,
                  })}
                />
                <Input
                  label="Full Name: "
                  placeholder="Enter your full name"
                  {...register("fullName", {
                    required: true,
                  })}
                />
                <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                />
                <Input
                  label="Password: "
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: true,
                  })}
                  className="mb-3"
                />

                {/*// avatar input*/}
                <label className="block text-sm font-medium text-gray-700 ">
                  Avatar:
                </label>
                <div className="relative bottom-12 left-16">
                  <Button
                    component="label"
                    role={undefined}
                    variant="outlined"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      accept="image/png, image/jpg, image/jpeg, image/gif"
                      onChange={(event) => console.log(event.target.files)}
                      multiple
                      {...register("avatar", {
                        required: true,
                      })}
                    />
                  </Button></div>

                {/*// submit button*/}
                <Button variant="contained" type="submit" sx={{
                  position : "relative",
                  left : "4em",
                  bottom : '2em'
                }}>Create Account</Button>
              </div>

            </form>
          </div>
      </div>
    );

}

export default SignUpComponent;