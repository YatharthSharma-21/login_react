import {encodeStr, decodeStr} from '../middleware/encryption.js';
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";


import user_details from '../models/userDetails.js';
import Token from "../models/Token.js";

//@desc Get authenticated User
const authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
let encodedEmail = encodeStr(email);
  try {
    let user = await user_details.findOne({ encodedEmail });

    if (!user)
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });

    const isMatch = encodeStr(password) == user.password ? true : false;

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
      (err, token) => {
        if (err) throw err;
        let encodedToken = encodeStr(token)
        res.json({ encodedToken });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

//@desc Get authenticated Partner
const authPart = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;

  try {
    let part = await Partner.findOne({ username });

    if (!part)
      return res.status(401).json({ errors: [{ msg: "Invalid Credentials" }] });

    const isMatch = await bcrypt.compare(password, part.password);

    if (!isMatch)
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });

    const payload = {
      user: {
        id: part.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "3d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// @desc    Check User Name
const checkUserName = async (req, res) => {
  const username = req.params.username;

  try {
    const partner = await Partner.findOne({ username });

    if (partner) return res.json({ msg: "Partner already Exists" });

    res.json({ msg: "No issues" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const logout = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);
    const expToken = new Token({ token, expires: "1m" });

    await expToken.save();

    res.json(expToken);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

export { authUser, authPart, checkUserName, logout };
