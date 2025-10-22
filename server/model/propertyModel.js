import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },
    price: { type: Number, trim: true, required: true },
    description: { type: String, trim: true, required: true },
    location: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

const PropertyModel = mongoose.model("PropertyModel", propertySchema);

export { PropertyModel };
