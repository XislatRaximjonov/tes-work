import mongoose, { Schema } from "mongoose";
import { Categories } from "./categoriesModel.js";

const productsSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, "Product nomi kritilishi kerak!"],
        trim: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    quantity: {
        type: "number",
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "categories",
    },
    category: {
        type: String,
    },
});

productsSchema.pre("save", async function (next) {
    if (this.isModified("categoryId")) {
        // Fetch the category document using the id
        const category = await Categories.findById(this.categoryId);
        if (!category) {
            return next(new Error("Category not found"));
        }
        // Set the category name
        this.category = category.name;
    }
    console.log(this);
    next();
});

export const Products = mongoose.model("products", productsSchema);