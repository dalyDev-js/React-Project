import sendEmail from "../email/email.js";
import jwt from "jsonwebtoken";
import userModel from "../models/User.js";
import catchError from "../middleware/catchError.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import cartModel from "../models/Cart.js";

const signup = catchError(async (req, res) => {
  let addedUser = await userModel.create(req.body);
  const cart = await cartModel.create({
    userId: addedUser._id,
    createdBy: addedUser._id,
  });

  addedUser.cart = cart._id;
  await addedUser.save();

  addedUser.password = undefined;
  sendEmail(req.body.email);
  res.status(201).json({ message: "User added to database", addedUser });
});

const signin = catchError(async (req, res, next) => {
  let existedUser = await userModel
    .findOne({
      email: req.body.email,
    })
    .populate("cart");

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
    if (err) return next(new AppError("invalid token", 400));
    await userModel
      .findOneAndUpdate({ email: decoded }, { isConfirmed: true })
      .populate("cart");
    res.json({ message: "account verified" });
  });
});

export { signup, signin, verifyEmail };
