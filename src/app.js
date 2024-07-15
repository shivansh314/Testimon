import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))

app.use(cookieParser())

//routing
import router from './routes/user.routes.js'
import spaceRouter from "./routes/space.routes.js";


app.use("/api/v1/users", router)
app.use("/api/v1/spaces" , spaceRouter)


export { app }