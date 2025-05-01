import {Router} from "express";
import DB from "../db/DB.mjs";
import {validationResult} from "express-validator";
import {loginValidation, validateUserRegister} from "../validation/user-validation.mjs";
import {createToken} from "../util/jwtUtil.mjs";
import {verifyToken} from "../util/verifyToken.mjs";


const userRouter = Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();

};


// Register

userRouter.post("/user-register",validateUserRegister,handleValidationErrors,async (req,res)=>{
    const userData = req.body;

    try {
       await DB.user.create({data:userData});
       return res.status(200).json({msg:"User Registered Successfully"});

    } catch (err){
        return res.status(500).json({msg:"Register Failed",err:err});
    }

});


// Login
userRouter.post("/user-login", loginValidation,handleValidationErrors, async (req, res) => {

    // const { UserName, Password } = req.body;
    const userName = req.body.UserName;
    const password = req.body.Password;

    try {
        const user = await DB.user.findUnique({
            where: { UserName:userName }
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (user.Password !== password) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const payload = {
            userId:user.Id,
            userName : userName
        }
        const jwtToken = createToken(payload);

        return res.status(200).json({
            msg: "Login successful",
            data: {
                id: user.Id,
                username: user.UserName,
                name: user.Name,
                token:jwtToken
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Login failed", error: err.message });
    }
});



userRouter.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await DB.user.findUnique({
            where: { UserName: req.user.userName } // userName was stored in token payload
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            msg: "User profile fetched successfully",
            data: user
        });

    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong", error: err.message });
    }
});





export default userRouter;