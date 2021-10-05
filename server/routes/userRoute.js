import express from "express";
import { check } from "express-validator";
import { addUserDetails, verifyOtp, verifyuser, updateUser } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";
import upload from '../middleware/multer.js';

const router = express.Router();

router.post(
    "/signup",
    [     
      check("name", "User name required"),
      check("email", "email is required"),
      check("password", "password is required"),
    ],
    addUserDetails,
    (err, req, res, next) => {    
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  );

  router.post(
    "/verifyotp",
    [      
      check("otp", "no otp found"),      
    ],
    verifyOtp,
    (err, req, res, next) => {    
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  );

  router.post(
    "/verifyUser",
    [
      auth,          
    ],
    verifyuser,
    (err, req, res, next) => {  
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  );

  router.post(
    "/updateUser",
    [
      auth,
      upload.single("file"),
         
    ],
    updateUser,
    (err, req, res, next) => {  
      res.status(400).json({ errors: [{ msg: err.message }] });
    }
  );

  

  export default  router;