import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "KEY001"); // use same secret key
        req.user = decoded; // store user data in request object
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or expired token", error: err.message });
    }
};
