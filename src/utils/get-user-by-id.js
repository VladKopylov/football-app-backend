import jwt from "jsonwebtoken";

export const getUserId = ({ request, connection }, requireAuth = true) => {
    let header;

    //Check id subscription
    if (connection) {
        header = connection.context.Authorization;
    } else {
        header = request.headers.authorization;
    }

    if (header) {
        const token = header.replace("Bearer ", "");
        const decoded = jwt.verify(token, "asdasd123");
        console.log('decoded:', decoded);
        return decoded.userId;
    }

    if (requireAuth) {
        throw new Error("Authentication required");
    }

    return null;
};
