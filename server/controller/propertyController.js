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
  const { name, type, price } = req.query;
  const queryObj = {};

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (type) {
    queryObj.type = { $regex: type, $options: "i" };
  }

  //   sort options
  const sortOptions = {
    new: "-createdAt",
    old: "createdAt",
  };
  const sortKey = sortOptions.sort || sortOptions.new;

  const properties = await PropertyModel.find(queryObj).sort(sortKey);

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

  const { name, price, description, type, location } = req.body;

  const property = await PropertyModel.create({
    name,
    price,
    description,
    type,
    location,
  });
  if (!property) return next(new AppError("Property is not created", 400));

  res.status(200).json({
    status: "success",
    data: property,
  });
});
