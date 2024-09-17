import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";




const spaceSchema = new Schema(
  {
    projectName: {
      type: String,
      requried: true,
    },
    title: {
      type: String,
      requried: true,
    },
    logo: {
      type: String,
      requried: true,
    },
    customMessage: {
      type: String,
      requried: true,
    },
    questions: {
      type: Array,
      requried: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    link: {
      type: String,
      requried: true,
    },

    requiredFields: {
      name: { type: Boolean, default: true },
      email: { type: Boolean, default: true },
      company: { type: Boolean, default: false },
    },

    starRating : {
      type : Boolean , 
      default : true 
    } , 

    isSquare : {
      type : Boolean ,
      default : false 
    }

  },
  {
    timestamps: true,
  }
);

spaceSchema.plugin(mongooseAggregatePaginate);


export const Space = mongoose.model("Space", spaceSchema);