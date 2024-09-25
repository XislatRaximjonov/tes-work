import express from "express";
import * as categoriesController from "../Controllers/categoriesControllers.js"
const router = express.Router()

router.route("/").get(categoriesController.getAllCategories).post(categoriesController.createCategory)
router.route("/:id").get(categoriesController.getCategory).patch(categoriesController.updateCategory).delete(categoriesController.deleteCategory)



export default router