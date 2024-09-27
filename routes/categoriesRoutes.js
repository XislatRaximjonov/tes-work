import express from "express";
import * as categoriesController from "../Controllers/categoriesControllers.js";
import { protect } from "../Controllers/authController.js";
import {upload} from "../Utils/uploads.js";
const router = express.Router();

router
  .route("/")
  .get(categoriesController.getAllCategories)
  .post(protect, upload.single("image"), categoriesController.createCategory);
router
  .route("/:id")
  .get(categoriesController.getCategory)
  .patch(protect, upload.single("image"), categoriesController.updateCategory)
  .delete(protect, categoriesController.deleteCategory);

export default router;
