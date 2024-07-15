import dotenv from "dotenv";
import { app } from "./app.js";

import connect_DB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

// connecting to database

connect_DB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("cONNECTION FAILED", err);
  });
