import { Router } from "express";
import {
  createProperty,
  getAllProperty,
} from "../controller/propertyController.js";

const router = Router();

router.route("/").get(getAllProperty).post(createProperty);

export default router;
