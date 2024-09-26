import express from "express";
import * as categoriesController from "../Controllers/categoriesControllers.js";
import { protect } from "../Controllers/authController.js";
const router = express.Router();

router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(categoriesController.createCategory);
router
  .route("/:id")
  .get(categoriesController.getCategory)
  .patch(protect, categoriesController.updateCategory)
  .delete(protect, categoriesController.deleteCategory);

export default router;
