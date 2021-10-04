import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { encodeStr, decodeStr } from "../middleware/encryption.js";
import user_details from "../models/userDetails.js";

const auth = (req, res, next) => {
  //Get token from header
  let token = req.headers.authorization?.split(" ")[1];
  token = decodeStr(token);
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);    
    req.user = decoded.user;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

const adminAuth = async (req, res, next) => {
  //Get token from header
  const token = req.headers.authorization?.split(" ")[1];

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user_details;

    const user = await User.findById(req.user.id);
    if (!user.role.includes("admin"))
      return res.status(401).json({ msg: "Unauthorized user" });

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export { auth, adminAuth };
