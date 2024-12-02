import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from "react-hook-form";
import Input from "../Input.jsx";
import Rating from '@mui/material/Rating';
import { data } from "autoprefixer";
import axios from "axios";
import {Link , useNavigate} from "react-router-dom";

const Modal = ({ onClose, post }) => {
  const { register, handleSubmit } = useForm();
  const [rating, setStar] = useState(0);
  const navigate = useNavigate()

  const handleRatingChange = (event, newRating) => {
    setStar(newRating);
  };


  const submit = async (data ) => {
    const payload = {
      name: data.name,
      email: data.email,
      company: data.company,
      starRating: rating,
      review: data.review,
    };
    // console.log(data);

    try {
      const response = await axios.post(`http://localhost:8000/api/v1/reviews/createReview/${post._id}`,
        payload,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' }
        });

      // TODO : fix the navigating issue

      navigate(`/reviews/createReview/${post._id}`);

    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log('Error message:', error.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg p-1 py-2 flex flex-col items-center gap-5">
        <h1 className="font-serif text-lg md:text-xl">Write Text Testimonial</h1>
        <X  className="absolute top-4 right-3 md:right-0 bg-blend-color-burn cursor-pointer opacity-60"
        onClick={onClose}/>
        <img src={post.logo} alt="company logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-md" />

        <div className="flex flex-col items-center gap-4 w-full p-4">
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4 w-full">
            <Input
              type="text"
              label="Name"
              {...register("name", { required: true })}
              className="w-full"
            />
            <Input
              type="email"
              label="Email"
              {...register("email", { required: true })}
              className="w-full"
            />
            <Input
              type="text"
              label="Company"
              {...register("company", { required: true })}
              className="w-full"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Star Rating
            </label>
            <Rating name="half-rating" value={rating} precision={1} onChange={handleRatingChange} />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Review
            </label>
            <textarea
              rows="3"
              {...register("review", { required: true })}
              className="w-full h-auto p-2 border border-gray-300 rounded-lg"
            ></textarea>

            <button
              type="submit"
              className=" bg-indigo-600 hover:bg-indigo-700 text-white w-1/6 px-5 py-2 rounded-lg mt-4 ml-auto"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  ) ;
};

export default Modal;

