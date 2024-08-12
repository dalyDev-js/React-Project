import userModel from "../models/User";

export const checkUserExists = async (req, res, next) => {
  const { _id } = req.user; // Extract user ID from token payload

  try {
    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    next(); // Proceed to next middleware or route handler
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
