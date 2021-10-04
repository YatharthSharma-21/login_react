import express from "express";
import { check } from "express-validator";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";
import { addUserDetails, verifyOtp, verifyuser } from "../controller/userController.js";

const router = express.Router();

router.post(
    "/signup",
    [
      //auth,
      // upload.array("files",'length'),
      check("name", "User name required"),
      check("email", "email is required"),
      check("password", "password is required"),
    ],
    addUserDetails,
    (err, req, res, next) => {
      //multer
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  );

  router.post(
    "/verifyotp",
    [
      //auth,
      // upload.array("files",'length'),
      check("otp", "no otp found"),      
    ],
    verifyOtp,
    (err, req, res, next) => {
      //multer
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  );

  router.post(
    "/verifyUser",
    [
      auth,
      // upload.array("files",'length'),
      // check("otp", "no otp found"),      
    ],
    verifyuser,
    (err, req, res, next) => {
      //multer
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  );

  

  export default  router;