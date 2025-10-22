import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// routes
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config({ path: ".env" });

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/property/", propertyRoutes);

export default app;
