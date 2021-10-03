import express from "express";
import { check } from "express-validator";
import upload from "../middleware/multer.js";
import { auth } from "../middleware/auth.js";
import { addUserDetails } from "../controller/userController.js";

const router = express.Router();

router.post(
    "/",
    [
      auth,
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

  export default  router;