import {Schema} from "mongoose"


const spaceSchema = new Schema({

},
{
    timestamps : true
}
)


export const Spaces = mongoose.model( "Spaces" , spaceSchema)