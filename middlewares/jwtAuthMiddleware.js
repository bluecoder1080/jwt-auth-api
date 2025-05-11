import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js"; 


export function jwtAuthMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET); //{It stores username : "aditya1221"}
  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else {
    res.json({
      message: "You Are Logged Out",
    });
  }
}
