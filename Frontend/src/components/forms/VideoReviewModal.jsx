import { X } from "lucide-react";
import React, { useState, useRef, useEffect } from 'react';

const VideoReviewModal = ({ onClose, post }) => {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center z-50">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg p-1 py-2 flex flex-col items-center gap-5 relative">
        <X
          className="absolute top-4 right-3 md:right-0 bg-blend-color-burn cursor-pointer opacity-60"
          onClick={onClose}
        />

      </div>
    </div>
  );
};

export default VideoReviewModal;
