import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const connect_DB = async() => {
    try {
        const connectionInstance = await mongoose.connect(
          `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log("connection was successfull");
    } catch (error) {
        console.log("MongoDB connection failed");
        process.exit();        
    }
}

export default connect_DB;