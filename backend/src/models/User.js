import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = new mongoose.model("User", userSchema);

export default userModel;
