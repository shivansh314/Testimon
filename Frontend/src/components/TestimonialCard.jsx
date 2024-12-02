import { React , useState } from "react";
import DoneIcon from '@mui/icons-material/Done';

const Testimonial = () => {


  return (
    <div className="h-screen w-screen flex  items-center justify-center ">
      <div className="h-64 w-96 bg-stone-900 p-8 rounded-2xl ">
        <div className=" h-6 w-6 rounded-full bg-[#C6EA52] flex justify-center items-center">
          <DoneIcon sx={{ height : 16 , opacity: 80 }} />
        </div>

        <h1 className="text-amber-50 text-xl font-sans mt-3"> Shivansh Barthwal </h1>
        <p className="text-[0.95em] text-gray-500 mt-3">
          element and a background image to display the media.
          It can be problematic in some situations, for example, you might
        </p>
      </div>


    </div>
  );
};


export default Testimonial;