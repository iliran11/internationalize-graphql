import { gql } from "apollo-server-express";

const typeDefs = gql`
  directive @intl on FIELD_DEFINITION
  type Query {
    greeting: String @intl
    id: Int
  }
`;

export default typeDefs;
