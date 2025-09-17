import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

export const listProducts = asyncHandler(async (req, res) => {
  const {
    keyword = "",
    category,
    minPrice,
    maxPrice,
    page = 1,
    limit = 12,
    sort = "-createdAt",
  } = req.query;

  const filter = {};
  if (keyword) filter.$text = { $search: keyword };
  if (category) filter.category = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;

  const [count, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter)
      .sort(sort)
      .skip(pageSize * (pageNumber - 1))
      .limit(pageSize),
  ]);

  res.json({
    products,
    page: pageNumber,
    pages: Math.ceil(count / pageSize),
    total: count,
  });
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});
