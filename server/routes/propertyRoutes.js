import { Router } from "express";
import { getAllProperty } from "../controller/propertyController.js";

const router = Router();

router.route("/").get(getAllProperty);

export default router;
