import mongoose from 'mongoose'
import user_details from '../models/userDetails.js';
import { validationResult } from 'express-validator';
import { encodeStr, decodeStr } from '../middleware/encryption.js';
import smtpTrans from "../DB_Connection/nodemailer.js";
import ejs from "ejs";
import path from "path";

const __dirname = path.resolve();

const addUserDetails = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password } = req.body;
    const existUser = await user_details.findOne({ "email": encodeStr(email) });
    if (existUser) {
        return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
    }

    let otp = Math.floor(1000 + Math.random() * 9000);

    const html = await ejs.renderFile(
        path.join(__dirname, "views", "otpMail.ejs"),
        {
            otp
        }
    );
    const mailOpts = {
        from: process.env.MAIL,
        to: email,
        subject: "Account Verification",
        html: html,
    };

    try {
        const details = new user_details({
            name: encodeStr(name),
            password: encodeStr(password),
            email: encodeStr(email),
            otp: encodeStr(String(otp)),
        });
        let info = smtpTrans.sendMail(mailOpts, async (err) => {
            if (err) {
                console.log(err);
                // return res
                //     .status(500)
                //     .json({ errors: [{ msg: "Not able to send mail" }] });
            }
            await details.save();
            res.json(details);



        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }


}

const verifyOtp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let { otp } = req.body;
    const existUser = await user_details.findOne({ "otp": encodeStr(otp) });
    if (!existUser) {
        return res
            .status(400)
            .json({ errors: [{ msg: "User not found" }] });
    }else{
        return res
            .status(200)
            .json({ success: [{ msg: "Otp Verified" }] });
    }    


}

export { addUserDetails, verifyOtp }