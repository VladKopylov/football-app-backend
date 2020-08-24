import bcrypt from "bcryptjs";

export const hashPassword = (password) => {
    if (password < 4) {
        throw new Error("Password must 4 characters or longer");
    }

    return bcrypt.hash(password, 10);
};
