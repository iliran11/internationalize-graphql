import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import cookieParser from "cookie-parser";
import intlDirective from "./intlDirective";
import "./i18next";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // now we have the user requeted language
    const lng = req.cookies.lng;
    return { lng };
  },
  schemaDirectives: {
    intl: intlDirective,
  },
});

const app = express();
app.use(cookieParser());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
