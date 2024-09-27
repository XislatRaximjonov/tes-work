import { Users } from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(404).json({
        status: "fail",
        message: "Please enter your username and password",
      });
    } else {
      const user = await Users.findOne({
        username,
      });

      if (!user || !(await user.checkPassword(password, user.password))) {
        return res.status(404).json({
          status: "fail",
          message: "Username or password is incorrect",
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
};
export const signUp = async (req, res) => {
  try {
    const newUser = await Users.create({
      username: req.body.username,
      password: req.body.password,
    });

    const token = signToken(newUser._id);
    res.status(201).json({
      status: "success",
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide token",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshuser = await Users.findById(decoded.id);
    if (!freshuser) {
      return res.status(400).json({
        status: "fail",
        message: "this user no longer exist",
      });
    }
    req.user = freshuser;
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: "Token does not exist",
    });
  }
  next();
};
