import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    scentFamily: { type: String },
    description: { type: String, required: true },
    images: [{ type: String }],
    image: { type: String },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    countInStock: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    featured: { type: Boolean, default: false },
    size: { type: String },
    concentration: { type: String },
    topNotes: [{ type: String }],
    middleNotes: [{ type: String }],
    baseNotes: [{ type: String }],
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

productSchema.index({
  name: "text",
  brand: "text",
  category: "text",
  description: "text",
});

export default mongoose.model("Product", productSchema);
