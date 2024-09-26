import express from "express";
import * as productsController from "../Controllers/productsController.js";

const router = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct);

router
  .route("/:id")
  .patch(protect, productsController.updateProduct)
  .delete(protect, productsController.deleteProduct)
  .get( productsController.getProduct);
export default router;
