import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.MONDODB_URL);
        console.log("DB connected");
    } catch (error) {
        console.log("DB Error"+ error);
    }
}

export default dbConnection;


export const createJWT = (res, userId, role) => {
    const token = jwt.sign({userId: userId, role: role}, process.env.JWT_SECRET,{
        expiresIn: "2d",
    });

    res.cookie("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV  !== "development",
        sameSite: "strict", // prevent CSRF attack
        maxAge : 2*24*60*60*1000, // will be give 2 days

    })
}