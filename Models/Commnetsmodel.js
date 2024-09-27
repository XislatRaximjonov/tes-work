import mongoose from "mongoose";

const commentsShema = new mongoose.Schema ({
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 1000,

    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true,
    },
    
})

export const Comments = mongoose.model("comments", commentsShema);