<template>
  <div id="app">
    Data:
    <div v-for="user in users" :key="user.name">
      {{ user }}
    </div>
    <button @click="getUsers">Get users</button>
    <br />
    <br />
    <input v-model="name" />
    Data:
    {{ userSearch }}
    <button @click="getUserByName">Get user</button>
    <br />
    <br />
    Name: <input v-model="targetName" /> Age:
    <input v-model.number="targetAge" />
    <div>
      Data:
      {{ updatedUser }}
    </div>
    <button @click="updateAge">Update user</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      /* ... */
      name: "",
      targetName: "",
      users: [],
      userSearch: {},
      targetAge: "",
      updatedUser: {},
    };
  },
  methods: {
    async getUsers() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `{
          getUsers {
            name
            email
            isMP
            mobNum
            IC
            profPic
            intro
            gender
            age
            ADUN
            isPrivate
          }
        }`,
      });
      this.users = res.data.data;
    },
    async getUserByName() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
      query GetUserByName($userName: String!) {
        getUserByName(name: $userName) {
            name
            email
            isMP
            mobNum
            IC
            profPic
            intro
            gender
            age
            ADUN
            isPrivate
        }
      }`,
        variables: {
          userName: "Ali",
        },
      });
      this.userSearch = res.data.data.getUserByName;
    },
    async updateAge() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
        mutation UpdateAge(
          $userName: String!,  $age: Int) {
          updateAge(name: $userName, age: $age) {
            name
            age
          }
        }`,
        variables: {
          userName: this.targetName,
          age: this.targetAge,
        },
      });
      this.updatedUser = res.data.data.updateAge;
    },
  },
};
</script>
