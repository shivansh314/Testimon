/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import Input from "../Input.jsx";
import Switch from "@mui/material/Switch";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

//TODO : add local storage

function SpaceForm({post}) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues : {
      projectName : post?.projectName || "" ,
      title : post?.title  || " ",
      customMessage : post?.customMessage ||  " ",
      questions : post?.questions || [  ],
      starRating : post?.starRating || true ,
      isSquare : post?.isSquare || false ,
    }}
  );

  
  // submit form 
  const submit = async (data) => {
    const formData = new FormData();
    formData.append("projectName", data.projectName);
    formData.append("title", data.title);
    formData.append("customMessage", data.customMessage);
    formData.append("questions", data.questions);
    formData.append("logo", data.logo[0]);
    formData.append("starRating", data.starRating);
    formData.append("isSquare", data.isSquare);



    if ( post ) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/spaces/updateSpace/${post._id.$oid}",
          formData,
          {
            withCredentials: true,
          }
        );
        console.log("successfully updated forms form");
      }
      catch (error){
        console.log(error.response?.data?.message || "updating forms failed ");
      }

    } else {

      try {
        const response = await axios.post(
          "http://localhost:8000/api/v1/spaces/createSpace",
          formData,
          {
            withCredentials: true,
          }
        );

        console.log("successfully created forms form");
      } catch (error) {
        console.log(error.response?.data?.message || "creating forms failed ");
      }
    }
  }; 
  
  // Handle file change and update state
  const [previewUrl , setPreviewUrl] = useState(null) 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        }
  };
  
  // watch subscription 
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {});

    return () => subscription.unsubscribe();
  }, [watch]);

  // Generate question list items
  const [questionNumber, setQuestionNumber] = useState(0);
  const listItems = [];
  for (let index = 0; index < questionNumber; index++) {
    listItems.push(
      <li key={index} className="text-slate-300">
        {watch(`questions[${index}]`)}
      </li>
    );
  }

  // change button shape 
   const [squareButton, setButton] = useState(false);
  const changeButtonType = () => {
    setButton((prev) => !prev);
  };

  //star rating boolean 
  const [starRating , setStarRating] = useState(true);
  const toggleStarRating = () => {
    setStarRating((prev) => !prev);
  };



  return (
    <div className="h-auto w-screen flex flex-row items-center justify-center mt-3 ">
      {/* Live preview of testimonial form */}
      <div className="w-[400px] mr-4 bg-[#25282C] rounded-lg p-9 pb-10">
        <div className="bg-green-200 text-green-800 text-sm font-semibold rounded-full px-3 py-1 w-max mx-auto relative bottom-12 right-20">
          Live preview - Testimonial page
        </div>

        <div className="flex justify-center">
          {!previewUrl && !post?.logo ? (
            <div
              className={`bg-black ${squareButton ? "rounded-none" : "rounded-full"} w-24 h-24 flex items-center justify-center `}
            ></div>
          ) : (
            <img
              src={post?.logo || previewUrl}
              className={`${squareButton ? "rounded-none" : "rounded-full"} w-24 h-24 bg-cover`}
              alt="preview image"
            />
          )}
        </div>

        <h1 className="text-white text-[2rem] font-semibold text-center mt-4">
          {watch("title")}
        </h1>

        <p className="text-white text-center mt-3">{watch("customMessage")}</p>

        <div className="text-white mt-12">
          <h2 className="font-semibold mb-2">QUESTIONS</h2>
          <div className="w-8 h-1 bg-indigo-600 mb-2"></div>
          {post ? (
            <div className="flex flex-col">
              <ul className="list-disc">
                {post.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="list-disc">{listItems}</ul>
          )}
        </div>

        <div className="mt-10 space-y-4">
          <button className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-center">
            <i className="fas fa-video mr-2"></i> Record a video
          </button>

          <button className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg text-center">
            <i className="fas fa-pen mr-2"></i> Send in text
          </button>
        </div>
      </div>

      {/* create or update form */}
      <form onSubmit={handleSubmit(submit)}>
        <div className="w-[600px] bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            {post ? "Edit Space" : "Create Space"}
          </h1>

          {/* project name */}
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Space name <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("projectName")}
            placeholder="Testimon app"
            className="w-full p-2 border border-gray-300 bg-[#E8F0FE] rounded-lg mb-3"
          />

          {/* image */}
          <div className="flex items-center mb-6">
            {!previewUrl && !post?.logo ? (
              <div
                className={`bg-black ${squareButton ? "rounded-none" : "rounded-full"} w-16 h-16 flex items-center justify-center `}
              ></div>
            ) : (
              <img
                src={post?.logo || previewUrl}
                className={`${squareButton ? "rounded-none" : "rounded-full"} w-16 h-16 bg-cover`}
                alt="preview url"
              />
            )}

            <span className="ml-5 rounded-md shadow-sm">
              <input
                type="file"
                accept="image/*"
                name="newLogoURL"
                id="newLogoURL"
                className="opacity-0 absolute -z-10"
                {...register("logo")}
                onChange={handleFileChange}
              />
              <label
                htmlFor="newLogoURL"
                className="py-2 px-3 border border-gray-300 rounded-md text-sm leading-4 
            font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:border-blue-300 
            focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150
             ease-in-out cursor-pointer"
              >
                Change
              </label>
            </span>
            <label className="ml-4">
              <input
                type="checkbox"
                className="mr-2"
                {...register("isSquare")}
                onChange={changeButtonType}
              />{" "}
              square?
            </label>
          </div>

          {/* title */}
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="header-title"
          >
            Header title <span className="text-red-500">*</span>
          </label>
          <Input
            {...register("title")}
            placeholder="Did you like Testimon?"
            className="w-full p-2 border border-gray-300 rounded-lg mb-6"
          />

          {/* customMessage */}
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="custom-message"
          >
            Your custom message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("customMessage")}
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          ></textarea>

          {/* questions */}
          <div className="flex flex-row mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Questions{" "}
              <i className="fas fa-info-circle ml-1 text-gray-400"></i>
            </label>
            <button
              type="button"
              onClick={() => {
                if (questionNumber < 3) {
                  setQuestionNumber((prev) => prev + 1);
                }
              }}
              className={`${questionNumber >= 3 ? "hidden" : "none"}`}
              disabled={questionNumber >= 3} // Disable button when 3 questions are added
            >
              <AddCircleOutlineIcon
                className="opacity-85 bottom-1 left-1 relative  "
                sx={{
                  height: "0.8em",
                  width: "0.8em",
                }}
              />
            </button>
          </div>
          {post ? (
            <div className="flex flex-col">
              {post.questions.map((question, index) => (
                <Input
                  key={index} // Ensure unique key
                  {...register(`questions[${index}]`)}
                  placeholder={`Question ${index + 1}`}
                  className="mb-3"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {Array.from({ length: questionNumber }).map((_, index) => (
                <Input
                  key={index} // Ensure unique key
                  {...register(`questions[${index}]`)}
                  placeholder={`Question ${index + 1}`}
                  className="mb-3"
                />
              ))}
            </div>
          )}

          <label>Collect star rating</label>
          <Switch
            defaultChecked
            onChange={toggleStarRating}
            {...register("starRating")}
            className="mb-3 top-1"
          />

          {/* submit button */}
          <button className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg text-center">
            {post ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpaceForm;
