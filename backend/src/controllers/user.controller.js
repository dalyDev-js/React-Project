import sendEmail from "../email/email.js";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";
import catchError from "../middleware/catchError.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
const signup = catchError(async (req, res) => {
  let addedUser = await userModel.insertMany(req.body);
  addedUser[0].password = undefined;
  sendEmail(req.body.email);
  res.status(201).json({ message: "user added to database", addedUser });
});

const signin = catchError(async (req, res, next) => {
  let existedUser = await userModel.findOne({
    email: req.body.email,
  });
  if (
    !existedUser ||
    !bcrypt.compareSync(req.body.password, existedUser.password)
  )
    return next(new AppError("invalid email or password", 422));

  if (existedUser.isConfirmed == false)
    return next(new AppError("please confirm you Account", 401));
  let token = jwt.sign(
    { _id: existedUser._id, role: existedUser.role },
    "treka"
  );
  res.json({ message: "welcome", token });
});

const verifyEmail = catchError(async (req, res, next) => {
  jwt.verify(req.params.token, "Don", async (err, decoded) => {
    // if (err) return res.status(400).json({ message: "invalid token" });
    if (err) return next(new AppError("invalid token", 400));
    await userModel.findOneAndUpdate({ email: decoded }, { isConfirmed: true });
    res.json({ message: "account verified" });
  });
});

export { signup, signin, verifyEmail };
