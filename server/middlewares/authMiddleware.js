import jwt from "jsonwebtoken";
import User from "../models/user.js"

const protectRoute = async(req,res,next)=> {
    try {
        let token = req.cookies?.token;
        // let token = req.headers.authorization;
        // console.log(token);

        if(token){
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
            const resp = await User.findById(decodedToken.userId).select("isAdmin email");

            req.user = {
                email: resp.email,
                isAdmin: resp.isAdmin,
                userId: resp.userId,
                role: decodedToken.role
            };

            next();
        }
        else {
            return res
              .status(401)
              .json({ status: false, message: "Not authorized. Try login again." });
          }
    } catch (error) {
        console.log(error);

        return res.status(401).json({status: false, message: "Not Authorized. Try login Again"});
    }

};


const isAdminRoute = (req, res, next) => {
    if(req.user && req.user.role === "Admin"){
        next();
    }
    else{
        return res.status(401).json({status: false, message: "Not Autorized as Admin. Try Again"});
    }
};

export {isAdminRoute, protectRoute};