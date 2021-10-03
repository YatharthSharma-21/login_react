import mongoose from 'mongoose'
import user_details from '../models/userDetails.js';
import { validationResult } from 'express-validator';
import {encodeStr, decodeStr} from '../middleware/encryption.js';

const addUserDetails = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    let { name, email, password } = req.body;
    console.log(name,email,password)
    try {
        const details = new user_details({
            name: encodeStr(name),
            password: encodeStr(password),
            email: encodeStr(email)            
        });
        await details.save();
        res.json(details);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }


}

export { addUserDetails }