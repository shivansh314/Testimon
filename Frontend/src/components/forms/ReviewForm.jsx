import React, { useState , useEffect } from "react";
import Modal from "./ReviewModal.jsx";
import VideoReviewModal from "./VideoReviewModal.jsx";
import axios from "axios";

const ReviewForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [post , setPost]  = useState({});

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleVideoModal = () => setIsVideoModalOpen(!isVideoModalOpen);



  useEffect(() => {
    const getSpace = async () => {
      try {
        const url = window.location.href;  // Get the current URL from the browser's address bar
        const segments = url.split('/');
        const spaceId = segments[segments.length - 1];  // The last segment is the space ID
        console.log(`http://localhost:8000/api/v1/spaces/getSpaceById/${spaceId}`);

        const response = await axios.get(
          `http://localhost:8000/api/v1/spaces/getSpaceById/${spaceId}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        // console.log("API Response:", response.data);
        if (response.data.success) {
          setPost(response.data.data); // Use response.data.data to set the state
        } else {
          console.error("API call succeeded, but success flag is false!");
        }


      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    getSpace(); // Fetch data on mount
  }, []); // Empty dependency array ensures this runs only once


  const [questionNumber, setQuestionNumber] = useState(0);
  const listItems = post.questions
    ? post.questions.map((question, index) => (
      <li key={index} className="text-slate-400">{question}</li>
    ))
    : null;






  return (
    <div className="h-auto w-screen">
      <div className="bg-white flex flex-col items-center ">
        <div className="flex items-center flex-col m-3">
          <img src={post.logo} alt="logo" className="rounded-md h-28 mb-12" />
          <h1 className="text-2xl sm:text-4xl md:text-[3.3rem] font-bold mb-4 text-gray-800 p-5">
            {post.title}
          </h1>
          <p className="md:text-xl mb-4 text-gray-500">{post.customMessage}</p>
          <div className="w-auto h-auto m-4 flex flex-col items-center justify-center bg-white  border-gray-200 rounded-lg relative left-0 mb-7">
            <div className="relative -left-44 w-1/5 mr-20">
              <h2 className="font-semibold mb-1 text-[1.3rem] ">QUESTIONS</h2>
              <div className="w-14 h-1 bg-indigo-600 mb-4 "></div>
            </div>
            <div className=" relative -left-16">
              <ul className="list-disc ">{listItems}</ul>
            </div>
          </div>
          <div className="mt-7">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-9 py-3 rounded-sm text-center mr-3"
            onClick={toggleVideoModal}>
              Record a video
            </button>

            <button
              className="bg-gray-700 hover:bg-gray-600 text-white px-9 py-3 rounded-sm text-center"
              onClick={toggleModal}
            >
              Send in text
            </button>
          </div>

        </div>
      </div>

      {isModalOpen && <Modal onClose={toggleModal} post={post}/>}
      { isVideoModalOpen && <VideoReviewModal onClose={toggleVideoModal} post={post} />}


    </div>


  );
};

export default ReviewForm;
