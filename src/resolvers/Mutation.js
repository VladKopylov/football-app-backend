import bcrypt from "bcryptjs";

import { hashPassword } from "../utils/hash-password";
import { generateToken } from "../utils/generate-token";

export const Mutation = {
    createUser: async (parent, { data }, { prisma }, info) => {
        const emailTaken = await prisma.exists.User({ email: data.email });
        if (emailTaken) throw new Error("Email taken");

        const password = await hashPassword(data.password);
        const user = await prisma.mutation.createUser({
            data: {
                ...data,
                password,
            },
        });

        return {
            user,
            token: generateToken(user.id),
        };
    },
    login: async (parent, { data }, { prisma }, info) => {
        const user = await prisma.query.user({ where: { email: data.email } });

        if (!user) throw new Error("User doesn't exist");

        const isMatchPassword = await bcrypt.compare(data.password, user.password);

        if (!isMatchPassword) throw new Error("Password doesn't match");

        return {
            user,
            token: generateToken(user.id),
        };
    },
};
