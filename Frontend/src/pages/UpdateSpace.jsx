import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios
import SpaceForm from '../components/forms/SpaceForm.jsx';

const UpdateSpace = () => {
  const [space, setSpace] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  // TODO : fix why space is not getting filled


  useEffect(() => {
    const getSpace = async () => {
      try {
        const url = window.location.href; // Get the current URL from the browser's address bar
        const segments = url.split("/");
        const spaceId = segments[segments.length - 1]; // The last segment is the space ID
        console.log(`http://localhost:8000/api/v1/spaces/getSpaceById/${spaceId}`);

        const response = await axios.get(
          `http://localhost:8000/api/v1/spaces/getSpaceById/${spaceId}`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
          const cock = response.data.data;
          setSpace(cock);
          console.log("Space successfully set:", cock);
        } else {
          console.error("API call succeeded, but success flag is false!");
        }
      } catch (error) {
        setError(error); // Set the error state
        if (error.response) {
          console.error("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setLoading(false); // Set loading to false after the call completes
      }
    };

    getSpace();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }


  if (error) {
    return <div>Error: {error}</div>; // Display error message if an error occurs
  }

  return (
    <div>
      <SpaceForm post={space} /> {/* Pass the fetched space data to the SpaceForm */}
    </div>
  );
};

export default UpdateSpace;
