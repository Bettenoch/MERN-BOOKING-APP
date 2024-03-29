import express, {Request, Response, Router} from 'express';	
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post("/register", [
  check("firstName", "First Name Is required").isString(),
  check("lastName", "Last Name Is required").isString(),
  check("email", "Email Is required").isEmail(),
  check("password", "PASSWORD with 6 or more characters is required").isLength({ min: 6 }),
], async( req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({message: errors.array()});
  }
    try{
      let user = await User.findOne({
        email: req.body.email
      });
      if (user) {
        return res.status(400).json({message: "EUser already exists"});
      };
      user = new User(req.body);
      await user.save();
      
      const token = jwt.sign({userId: user.id},
         process.env.JWT_SECRET_KEY as string, {
          expiresIn: "1d"
         }
         );
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400000,
        })
        return res.status(200).send({message: "User Registration Successful"})
    } catch (error) {
        res.status(500).send({message: "Error saving"})
    };
});

export default router;