import { getUserId } from "../utils/get-user-by-id";

export const Query = {
    users: (parent, args, { prisma }, info) => {
        return prisma.query.users(null, info);
    },
    me: async (parent, args, { prisma, req }, info) => {
        const userId = getUserId(req);
        return await prisma.query.user({ where: { id: userId } }, info);
    },
};