import mongoose from "mongoose";
import app from "./index.js";

// Conntect To Db
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Conntected"))
  .catch((error) => console.log("DB failed to connect"));

app.listen(process.env.PORT, () =>
  console.log(`server is running on port http://localhost:${process.env.PORT}`)
);
