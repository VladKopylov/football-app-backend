import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
    const payload = { userId}
    return jwt.sign(payload, "asdasd123", {
        expiresIn: "7 days",
    });
};
