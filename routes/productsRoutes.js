import express from "express";
import * as productsController from "../Controllers/productsController.js";
import { protect } from "../Controllers/authController.js";
import {upload} from "../Utils/uploads.js";
const router = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(protect , upload.single("image"), productsController.createProduct);

router
  .route("/:id")
  .patch(protect, productsController.updateProduct)
  .delete(protect, upload.single("image"), productsController.deleteProduct)
  .get( productsController.getProduct);
export default router;
