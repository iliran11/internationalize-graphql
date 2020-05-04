const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
usconst i18Next = require("./i18next");
const intlDirective = require("./intlDirective");
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  directive @intl on FIELD_DEFINITION
  type Query {
    greeting: String @intl
    id: Int
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    greeting: () => "Hello world!",
    id: () => 1,
  },
};

// Final context funciton

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // now we have the user requeted language
    const lang = req.cookies.lang;
    const t = await i18Next(lang);
    return { t };
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
