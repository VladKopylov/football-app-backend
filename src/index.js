import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";

import { resolvers } from "./resolvers";

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context: (req) => ({
        req,
        prisma: new Prisma({
            typeDefs: "prisma/generated/prisma.graphql",
            endpoint: "http://localhost:4466",
        }),
    }),
});

server.start().then((data) => console.log("Server is runnig on port 4000"));
