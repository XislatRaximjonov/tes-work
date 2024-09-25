import express from "express";
import * as productsController from "../Controllers/productsController.js"


const router = express.Router();

router.route("/").get(productsController.getAllProducts).post(productsController.createProduct);

export default router;
