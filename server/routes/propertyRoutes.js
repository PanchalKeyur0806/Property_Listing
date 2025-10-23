import { Router } from "express";
import {
  createProperty,
  getAllProperty,
} from "../controller/propertyController.js";
import { upload } from "../utils/multer.js";

const router = Router();

router
  .route("/")
  .get(getAllProperty)
  .post(upload.single("propertyImg"), createProperty);

export default router;
