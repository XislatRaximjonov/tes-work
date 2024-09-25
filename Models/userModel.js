import mongoose from "mongoose";
import bcrypt from "bcrypt";
const usersScehma = new mongoose.Schema({
    username: {
    type: String,
    required: [true, "Ism kiritilishi kerak"],
    unique: true,
    },
    password: {
        type: String,
    required: [true, "Ism kiritilishi kerak"],
    } 
})




usersScehma.pre("save", async function (next) {
    if (!this.isModified("password")) return next() 
        this.password = await bcrypt.hash(this.password, 12)
   next()
});

usersScehma.methods.chekPassword = async function (candidatePassword, userPassword) {
return bcrypt.compare(candidatePassword, userPassword)
};

export const Users = mongoose.model("Users", usersScehma)