import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    company: {
      type: String,
    },
    starRating: {
      type: Number,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },
    video: {
      required : false ,
      default : "empty string",
      type: String,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    space: {
      type: Schema.Types.ObjectId,
      ref: "Space",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


reviewSchema.plugin(mongooseAggregatePaginate);

export const Review = mongoose.model("Review", reviewSchema);