// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    greeting: () => "Hello world!",
    id: () => 1,
  },
};

export default resolvers;
