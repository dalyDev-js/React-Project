import AppError from "../utils/appError.js";

export default function catchError(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      next(new AppError(err.message, 400));
    });
  };
}
