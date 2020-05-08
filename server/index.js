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
    updateEmail(name: String!, email: String): User
    updatePhone(name: String!, phone: String): User
  }

  type User{
    name: String
    email: String
    isMP: Boolean
    phone: String
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
    "https://education.usm.my/images/gambarlect/PM-ALI-SAMSUDIN.jpg",
    "I am Ali. I like to drink Coke. I want to become a programmer.",
    "Male",
    40,
    "PJ",
    false
  ),
  new User(
    "Ahmad",
    "ahmad123@gmail.com",
    false,
    "012-9783678",
    "860401113457",
    "https://pure.uniten.edu.my/files-asset/8786453/90010052.jpg?w=160&f=jpg",
    "I am Ahmad. I like to eat fried chicken. I work in a university.",
    "Male",
    30,
    "PJ",
    true
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
  updateEmail: ({ name, email }) => {
    const user = users.find((x) => x.name === name);
    user.email = email;
    return user;
  },
  updatePhone: ({ name, phone }) => {
    const user = users.find((x) => x.name === name);
    user.phone = phone;
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
