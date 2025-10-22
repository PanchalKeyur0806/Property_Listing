import mongoose from "mongoose";
import { PropertyModel } from "../model/propertyModel.js";

export const getAllProperty = async (req, res, next) => {
  const properties = await PropertyModel.find();

  res.status(200).json({
    status: "success",
    data: properties,
  });
};
