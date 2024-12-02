import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from "../components/ReviewCard.jsx";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [spaceId, setSpaceId] = useState("");
  const [text , setText] = useState([]);
  const reviewsPerPage = 9;

  useEffect(() => {
    // Fetch spaces data from backend
    const fetchReviews = async () => {
      try {
        const url = window.location.href;
        const segments = url.split("/");
        const spaceId = segments[segments.length - 1];
        setSpaceId(spaceId)

        const response = await axios.get(
          `http://localhost:8000/api/v1/reviews/getAllReview/${spaceId}`,
          {}
        );



        setReviews(response.data.data);
        setLoading(false);

      } catch (error) {
        console.error(
          "Error fetching reviews:",
          error.response || error.message
        );
        if (error.response) {
          console.log("Server Response:", error.response.data);
        }
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    const reviewTexts = reviews.map((text) => text.review);
    setText(reviewTexts);
  }, [reviews]);

  console.log(text);

  if (loading) {
    return <div>Loading...</div>;
  }
  // Get current reviews for the page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div className="p-4 pt-2">
      <div className=" w-11/12 flex justify-between items-center">
        <h1 className="font-sans text-blue-500 relative text-center mb-4">
          Customer Reviews
        </h1>
        <Link to={`/updatespace/${spaceId}`}>
          <Button variant="outlined">UPDATE SPACE</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4">
        {reviews.length === 0 ? (
          <p>No reviews available</p>
        ) : (
          currentReviews.map((review) => (
            <div key={review._id} className="review-card ">
              <ReviewCard
                company={review.company}
                name={review.name}
                review={review.review}
                starRating={review.starRating}
                spaceId={review.space}
              />
            </div>
          ))
        )}
      </div>
      <div className="pagination flex justify-center gap-4  mt-2 font-bold">
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={
              currentPage === index + 1
                ? "active border-2 border-black h-5 w-5 rounded-full flex items-center justify-center"
                : ""
            }
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reviews;