import { Products } from "../Models/productModel.js";
import { APIFeatures } from "../Utils/apiFeatures.js";
export const getAllProducts = async (req, res) => {
  try {
    const features = new APIFeatures(Products.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();



    const products = await  features.query;
    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};


export const createProduct = async (req, res) => {
  try {
    const products = await Products.create(req.body);
    res.status(201).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(400).json({
        status: "fail",
        message: "Product id topilmadi",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: null,
        message: "Product ochirildi",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};


export const getProduct = async (req, res) => {
  try {
    const product = await Products.find({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};