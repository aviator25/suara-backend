const express = require("express");
// const { graphql, buildSchema } = require('graphql')
const { buildSchema } = require("graphql");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const User = require("./user");

const schema = buildSchema(`
  type Query {
    language: String
    getUsers: [User]
    getUserByName(name: String!): User
  }

  type Mutation {
    updateAge(name: String!, age: Int): User
  }

  type User{
    name: String
    email: String
    isMP: Boolean
    mobNum: String
    IC: String
    profPic: String
    intro: String
    gender: String
    age: Int
    ADUN: String
    isPrivate: Boolean
  }
`);

const users = [
  new User(
    "Ali",
    "ali123@gmail.com",
    false,
    "012-345678",
    "860401113457",
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Muhammad_Ali_NYWTS.jpg",
    "I am Ali",
    "Male",
    40,
    "PJ",
    false
  ),
];

// resolver here
const rootValue = {
  language: () => "GraphQL",
  getUsers: () => users,
  getUserByName: ({ name }) => {
    return users.find((x) => x.name === name);
  },
  updateAge: ({ name, age = 150 }) => {
    const user = users.find((x) => x.name === name);
    user.age = age;
    return user;
  },
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    rootValue,
    schema,
    graphiql: true,
  })
);
app.listen(4000, () => console.log("Listening on 4000"));
