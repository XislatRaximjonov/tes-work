import { Users } from "../Models/userMOdel.js"
import jwt from "jsonwebtoken";

const signToken = (id) => {
return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username  || !password) {
          return res.status(404).json({
            status: "fail",
            message: "Iltimos, foydalanuvchi nomingiz va parolingizni kiriting",
          });
        } else {
          const user = await Users.findOne({
            username,
          });
    
          if (!user || !(await user.chekPassword(password, user.password))) {
            return res.status(404).json({
              status: "fail",
              message: "Foydalanuvchi nomi yoki parol noto'g'ri",
            });
          } else {
            const token = signToken(user._id);
            res.status(200).json({
              status: "success",
              token,
            });
          }
        }
      } catch (error) {
        res.status(400).json({
          status: "fail",
          message: error,
        });
      }
}
export const signUp = async (req, res) => {

    try {
        const newUser = await Users.create({
            username: req.body.username,
            password: req.body.password,
        })
        res.status(201).json({
            status: "success",
            user: newUser,
          });
        } catch (error) {
          res.status(404).json({
            status: "fail",
            message: error,
          });
        }
    }
    

export const protect = async (req, res, next) => {
  try {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
    
  } 
  if (!token) {
  return res.status(401).json({
    statusbar: "fail",
    message: "Siz tizimga kirmagansiz!",
  })
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);


  const freshuser = await Users.findById(decoded.id);
  if (!freshuser) {
    return res.status(400).json({
      status: "fail",
      message: "Bu foydalanuvchi endi mavjud emas",
    });
  }
  req.user = freshuser;
} catch (error) {
  return res.status(400).json({
    status: "fail",
    message: "Token mavjud emas",
  });
}
next();
}