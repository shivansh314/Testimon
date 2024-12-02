import React from "react";
import { CCardHeader ,CCard, CCardImage, CCardTitle, CCardText, CCardBody, CButton } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Rating from '@mui/material/Rating';
import { data } from "autoprefixer";

function ReviewCard({ name, email, starRating, review }) {
  return (
    <div>
      <CCard
      style={{
        width : "30rem" ,
        height : "11rem",
      }}>
        <CCardHeader as="h5">{name}</CCardHeader>
        <CCardBody>
          <CCardTitle><Rating name="read-only" value={starRating} readOnly  /></CCardTitle>
          <CCardText
            style={{
              height : "5rem",
              scrollbarWidth : "none",
              overflowY : "auto", /* Enable vertical scrolling */
              whiteSpace : "pre-wrap"

            }}>{review}</CCardText>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default ReviewCard;

