import Joi from "joi";

import { PropertyModel } from "../model/propertyModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

const propertySchema = Joi.object({
  name: Joi.string().required().trim(),
  type: Joi.string().required().trim(),
  price: Joi.number().required(),
  description: Joi.string().required().trim(),
  location: Joi.string().required().trim(),
});

export const getAllProperty = catchAsync(async (req, res, next) => {
  const { name, type, location } = req.query;
  const queryObj = {};

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (type) {
    queryObj.type = { $regex: type, $options: "i" };
  }
  if (location) {
    queryObj.location = { $regex: location, $options: "i" };
  }

  const properties = await PropertyModel.find(queryObj).sort("-createdAt");

  res.status(200).json({
    status: "success",
    data: properties,
  });
});

export const createProperty = catchAsync(async (req, res, next) => {
  const { error } = propertySchema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  // get the file
  const fileName = req.file;
  if (!fileName) return next(new AppError("file doesn't found", 404));

  const { name, price, description, type, location } = req.body;

  const property = await PropertyModel.create({
    name,
    price,
    description,
    type,
    location,
    propertyImg: fileName.filename,
  });
  if (!property) return next(new AppError("Property is not created", 400));

  res.status(200).json({
    status: "success",
    data: property,
  });
});
