import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

// routes
import propertyRoutes from "./routes/propertyRoutes.js";
import { errorHandler } from "./controller/errorController.js";

dotenv.config({ path: ".env" });

const app = express();
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// routes
app.use("/api/property/", propertyRoutes);

app.use(errorHandler);

export default app;
