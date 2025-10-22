import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// routes
import propertyRoutes from "./routes/propertyRoutes.js";
import { errorHandler } from "./controller/errorController.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/api/property/", propertyRoutes);

app.use(errorHandler);

export default app;
