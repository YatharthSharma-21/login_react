import express from "express";
import { check } from "express-validator";

import { auth } from "../middleware/auth.js";
import {
  authUser,
  authPart,
  checkUserName,
  logout,
} from "../controller/authController.js";

const router = express.Router();

// @route    POST api/auth
// @desc     Authenticate NMC user
// @access   Public
router.post(
  "/",
  [
    check("email", "Please enter a valid email").not().isEmpty().isEmail(),
    check("password", "Password is required").exists(),
  ],
  authUser
);

// @route    GET api/auth
// @desc     Authenticate Partner
// @access   Public
router.post(
  "/part",
  [
    check("username", "Please enter your username").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  authPart
);

// @route    POST api/auth/:username
// @desc     Update partner settings
// @access   Public
router.get("/:username", checkUserName);

// @route    POST api/auth/logout
// @desc     Update partner settings
// @access   Private
router.post("/logout", auth, logout);

export default router;
