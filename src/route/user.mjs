import {Router} from "express";
import DB from "../db/DB.mjs";


const userRouter = Router();


userRouter.post("/user-register",async (req,res)=>{
    const userData = req.body;

    try {
       await DB.user.create({data:userData});
       return res.status(200).json({msg:"User Registered Successfully"});

    } catch (err){
        return res.status(500).json({msg:"Register Failed",err:err});
    }

})

export default userRouter;