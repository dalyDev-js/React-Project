import bcrypt from "bcrypt";
import userModel from "../models/User.js";

export const checkEmail = async (req, res, next) => {
  let existedEmail = await userModel.findOne({ email: req.body.email });
  if (existedEmail)
    return res.status(409).json({ message: "email is already used" });

  req.body.password = bcrypt.hashSync(req.body.password, 8);
  next();
};
