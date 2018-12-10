const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");

const app = express();
app.use(cors());

const schema = gql`
  # This Query type is the root of all graphql queries
  # User is 'object type' whereas String, int, Boolean etc are 'scalar type'
  # me is a field having object type User
  type Query {
    me: User
  }
  # User has a username field
  # username is a field having scalar type i.e String
  type User {
    username: String!
  }
`;
const resolvers = {
  Query: {
    me: () => {
      // returns data of type User according to line 11
      return {
        username: "geekysrm"
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 5000 }, () => {
  console.log("🚀 Apollo Server running on http://localhost:5000/graphql");
});
