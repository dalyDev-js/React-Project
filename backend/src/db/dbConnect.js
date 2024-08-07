import mongoose from "mongoose";

export const dbConnect = async function () {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:DalyDev@cluster0.u9scwgt.mongodb.net/ecommerce"
    );
    console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
};
