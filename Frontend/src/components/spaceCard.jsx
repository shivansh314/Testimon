import React from 'react';
import {useState} from "react";
import styled from 'styled-components';
import { CCard, CCardImage, CCardTitle, CCardText, CCardBody, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

import {Link} from 'react-router-dom';

const SpaceCard = ({ logo, projectName, title, link , spaceId}) => {
  const [copySuccess, setCopySuccess] = useState(""); // To display confirmation

  // Function to copy link to clipboard
  const copyToClipboard = () => {
    const newlink = link; // Replace with your desired link
    navigator.clipboard
      .writeText(newlink)
      .then(() => {
        setCopySuccess("Link copied to clipboard!");
        alert("Link copied")
        setTimeout(() => setCopySuccess(""), 3000); // Clear message after 3 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopySuccess("Failed to copy link.");
      });
  };
  return (
      <CCard style={{ width: '18rem' , height : "24rem" }}>
        <CCardImage
          orientation="top"
          src={logo}
          style={{
            objectFit: 'cover',
            height: '200px',
            width: '100%'
          }}
        />
        <CCardBody>
          <CCardTitle>{projectName}</CCardTitle>
          <CCardText
            style={{ height: '50px' }}>{title}</CCardText>
          <Link to={`/reviews/getReviews/${spaceId}`}>
            <CButton color="primary">see reviews</CButton>
          </Link>
          <span
            onClick={copyToClipboard}
            style={{
              cursor: "pointer",
              color: "#5856D6",
              textDecoration: "underline",
              fontSize: "18px",
              marginLeft : "5rem",
              padding : "3px",
              border : "solid 1px #007bff",
              textDecorationLine : "none",
            }}
            title="link"
          >
        LINK
      </span>

        </CCardBody>
      </CCard>
  );
};

export default SpaceCard;
