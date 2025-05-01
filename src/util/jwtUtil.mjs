import jwt from "jsonwebtoken";

export const createToken = (payload)=>{
    const token = jwt.sign(payload,"KEY001");
    return token;

}