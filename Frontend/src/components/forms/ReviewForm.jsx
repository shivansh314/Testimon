import React, { useState } from "react";
import Modal from "./forms/ReviewForm.jsx";

const Review = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [questionNumber, setQuestionNumber] = useState(0);
  const listItems = [];
  for (let index = 0; index < 3; index++) {
    listItems.push(
      <li key={index} className="text-slate-400">
        {post.questions[index]}
      </li>
    );
  }

  return (
    <div className="h-screen w-screen">
      <div className="bg-white flex flex-col items-center mt-20">
        <div className="flex items-center flex-col m-3">
          <img src={post.logo} alt="logo" className="rounded-md h-28 mb-12" />
          <h1 className="text-2xl sm:text-4xl md:text-[3.3rem] font-bold mb-4 text-gray-800 p-5">
            {post.title}
          </h1>
          <p className="md:text-xl mb-4 text-gray-500">
            {post.customMessage}
          </p>
          <div
            className="w-auto h-auto m-4 flex flex-col items-center justify-center bg-white  border-gray-200 rounded-lg relative left-0 mb-7">
            <div className="relative -left-44 w-1/5 mr-20">
              <h2 className="font-semibold mb-1 text-[1.3rem] ">QUESTIONS</h2>
              <div className="w-14 h-1 bg-indigo-600 mb-4 "></div>
            </div>
            <div className=" relative -left-16">
              <ul className="list-disc ">{listItems}</ul>
            </div>
          </div>
          <div className="mt-7">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-9 py-3 rounded-sm text-center mr-3"
            >
              Record a video
            </button>

            <button className="bg-gray-700 hover:bg-gray-600 text-white px-9 py-3 rounded-sm text-center"
                    onClick={toggleModal}>
              Send in text
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal onClose={toggleModal} post = {post}/>}
    </div>
  );
};

export default Review;
