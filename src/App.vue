<template>
  <div id="app">
    <!-- Data:
    <div v-for="user in users" :key="user.name">
      {{ user }}
    </div>
    <h1>{{ users }}</h1>
    <br />
    <br /> -->
    <div style="text-align:center">
      <img :src="userPic" style="max-height: 50vh" />
      <span style="font-size: 300%; position: relative; bottom: 25vh">{{
        userIntro
      }}</span>
    </div>
    <h1>User info</h1>
    <h3>Name: {{ userName }}</h3>
    <h3>Age: {{ userAge }}</h3>
    <h3>Gender: {{ userGender }}</h3>
    <h3>NRIC: {{ userIC }}</h3>
    <h3>
      User type:
      <span v-if="userMP">MP</span>
      <span v-else>Non-MP</span>
      <button>Change user type</button>
    </h3>
    <h3>
      Email:
      <input type="email" v-model="userEmail" />
      <button @click="updateEmail">Change email</button>
    </h3>
    <h3>
      Phone number:
      <input type="tel" v-model="userPhone" />
      <button @click="updatePhone">Change number</button>
    </h3>
    {{ updatedUser }}
    <!-- Name: <input v-model="targetName" /> Age:
    <input v-model.number="targetAge" />
    <div>
      Data:
      {{ updatedUser }}
    </div>
    <button @click="updateAge">Update user</button> -->
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
      userName: "",
      userPic: "",
      userIntro: "",
      userEmail: "",
      userPhone: "",
      userIC: "",
      userGender: "",
      userMP: "",
      userAge: "",
    };
  },

  beforeMount() {
    this.getUserByName();
  },
  methods: {
    // async getUsers() {
    //   const res = await axios.post("http://localhost:4000/graphql", {
    //     query: `{
    //       getUsers {
    //         name
    //         email
    //         isMP
    //         phone
    //         IC
    //         profPic
    //         intro
    //         gender
    //         age
    //         ADUN
    //         isPrivate
    //       }
    //     }`,
    //   });
    //   this.users = res.data.data;
    // },
    async getUserByName() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
      query GetUserByName($userName: String!) {
        getUserByName(name: $userName) {
            name
            email
            isMP
            phone
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
      this.userName = res.data.data.getUserByName.name;
      this.userPic = res.data.data.getUserByName.profPic;
      this.userIntro = res.data.data.getUserByName.intro;
      this.userAge = res.data.data.getUserByName.age;
      this.userEmail = res.data.data.getUserByName.email;
      this.userPhone = res.data.data.getUserByName.phone;
      this.userIC = res.data.data.getUserByName.IC;
      this.userGender = res.data.data.getUserByName.gender;
      this.userMP = res.data.data.getUserByName.isMP;
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
    async updateEmail() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
        mutation UpdateEmail(
          $userName: String!,  $email: String) {
          updateEmail(name: $userName, email: $email) {
            name
            email
          }
        }`,
        variables: {
          userName: this.userName,
          email: this.userEmail,
        },
      });
      this.updatedUser = res.data.data.updateEmail;
    },
    async updatePhone() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
        mutation UpdatePhone(
          $userName: String!,  $phone: String) {
          updatePhone(name: $userName, phone: $phone) {
            name
            phone
          }
        }`,
        variables: {
          userName: this.userName,
          phone: this.userPhone,
        },
      });
      this.updatedUser = res.data.data.updatePhone;
    },
  },
};
</script>
