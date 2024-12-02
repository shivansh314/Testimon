// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import Input from "./Input.jsx";
import Button from "./Button.jsx";


const SignUpComponent = ()=>{
    const { register , handleSubmit } = useForm()
    // const navigate = useNavigate()
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
      <div>
        <div className="flex items-center justify-center h-screen">
          <div
            className={`mx-auto w-full max-w-lg bg-white-100 rounded-xl p-20 border border-black/10`}
          >
            <h2 className="text-center text-2xl font-bold leading-tight">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Already have an account?&nbsp;
            </p>
            <h2 className="font-medium text-primary transition-all duration-200 hover:underline text-center">
              Sign In
            </h2>
            {/* {error && <p className="text-red-600 mt-1 text-center">{error}</p>} */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                <Input
                  label="User Name: "
                  placeholder="Enter your full name"
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
                />
                <Input
                  label="Avatar :"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  placeholder="Insert your avatar"
                  {...register("avatar", {
                    required: true,
                  })}
                />

                <Button type="submit" className="w-full bg-black text-white">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

}

export default SignUp;