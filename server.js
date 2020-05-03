const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    id: Int
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    id: () => 1,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Added context. here you should read the lang cookies.
  // if you are sending request from graphql playground, please follow those instructions:
  // https://github.com/prisma-labs/graphql-playground/issues/748#issuecomment-412524510
  context: ({ req }) => {
    // now we have the user requeted language
    const lang = req.cookies.lang;
  },
});

const app = express();
app.use(cookieParser());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
