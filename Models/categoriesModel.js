import mongoose from "mongoose";
const categoriesShema = new mongoose.Schema({
  name: {
    type: "string",
    required: [true, "Categori nomi topilmadi "],
    trim: true,
    unique: true,
  },

  description: {
    type: "string",
    default: "Some description",
  },

  image: { type: String ,
   
  },
});
export const Categories = mongoose.model("categories", categoriesShema);
