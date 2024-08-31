import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async(req, res)=>{

    try {
        const {fullname, email, phoneNumber, password, role} = req.body;  //This line extracts specific fields (fullname, email, phoneNumber, password, and role) from the 'req.body'. 'req.body' contains the data sent by the client in the request.

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        const user = await User.findOne({email}); //asynchronously search the database for an existing user with the same email ('User.findOne({ email })').
        if(user){ // If a user with the provided email already exists
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash the password before saving it to the database. Hashing is crucial for security purposes to protect the password.

        await User.create({ // Create a new user record in the database with the provided fullname, email, phoneNumber, role, and the hashedPassword.
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        })

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })


    } catch (error) {
        console.error("Error during user registration:", error);
    }
}


export const login = async(req, res)=>{

    try {
        const {email, password, role} = req.body; 

        if(!email || !password || !role){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }

        let user = await User.findOne({email}); //  Looks for a user in the database with the provided email
        if(!user){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed-password stored in the database.
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }

        if(role != user.role){ // check if the provided role matches the role stored in the user's data.
            return res.status(400).json({
                message: "Account doesn't exists with current role",
                success: false
            })
        }

        const tokenData = { userId: user._id } // If the login credentials are valid, the function generates a JWT (JSON Web Token) using the user's ID (`userId`).
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'}); //  Token is signed with a secret key stored in the environment variable SECRET_KEY and is set to expire in 1 day

        user = { // The `user` object is redefined to include only specific fields (excluding sensitive information like the password) that will be sent back to the client.
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly: true, sameSite: 'strict'}).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })


    } catch (error) {
        console.error("Error during user login:", error);
    }
}


export const logout = async(req, res)=>{

    try {
        return res.status(200).cookie("token", "", {maxAge: 0}).json({ // The `cookie("token", "", { maxAge: 0 })` method is used to clear the "token" cookie by setting its value to an empty string ("") and its `maxAge` to `0`. This effectively deletes the cookie from the browser.
            message: "Logged out successfully",
            success: true
        })

    } catch (error) {
        console.error("Error during user logout:", error);
    }
}