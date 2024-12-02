import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import SpaceCard from "../components/SpaceCard";

const Home = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state.auth.userData.data.accessToken);

  useEffect(() => {
    // Fetch spaces data from backend
    const fetchSpaces = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/spaces/getSpaces", {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in the request header
          },
        });

        setSpaces(response.data.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching spaces:', error.response || error.message);
        if (error.response) {
          console.log('Server Response:', error.response.data);
        }
      }
    };

    fetchSpaces();
  }, [token]); // Add token as a dependency in the effect

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-container p-4  h-auto ">
      <h1 className="text-blue-500 mb-4 ">Your Created Spaces</h1>
      <div className="space-list flex flex-row gap-4">
        {spaces.length > 0 ? (
          spaces.map((space) => (
            <div key={space._id} className="space-item">
              <SpaceCard
                logo={space.logo}
                projectName={space.projectName}
                title={space.title}
                link={space.link}
                spaceId = {space._id}
              />
            </div>
          ))
        ) : (
          <p>No spaces found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
