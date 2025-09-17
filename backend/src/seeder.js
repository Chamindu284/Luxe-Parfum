import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./utils/connectDB.js";
import Product from "./models/Product.js";
import { sampleProducts } from "./data/sampleProducts.js";

dotenv.config();

const run = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("Seeded products");
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
};

run();
