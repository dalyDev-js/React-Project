import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  let { token } = req.headers;
  jwt.verify(token, "treka", (err, decoded) => {
    if (err) return res.json({ err });

    req.user = decoded;

    next();
  });
};
