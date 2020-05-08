<template>
  <div id="app">
    Data:
    <div v-for="champion in champions" :key="champion.name">
      {{ champion }}
    </div>
    <button @click="getChampions">Get Champions</button>
    <br />
    <br />
    <input v-model="name" />
    Data:
    {{ championSearch }}
    <button @click="getChampionByName">Get Champion</button>
    <br />
    <br />
    Name: <input v-model="targetName" /> Attack Damage:
    <input v-model.number="targetAttack" />
    <div>
      Data:
      {{ updatedChampion }}
    </div>
    <button @click="updateAttackDamage">Update Champion</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      /* ... */
      champions: [],
      championSearch: {},
      name: "",
      targetName: "",
      targetAttack: "",
      updatedChampion: {},
    };
  },
  methods: {
    /* ... */
    async getChampions() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `{
          getChampions {
            name
            attackDamage
          }
        }`,
      });
      this.champions = res.data.data;
    },
    async getChampionByName() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
      query GetChampionByName($championName: String!) {
        getChampionByName(name: $championName) {
          name
          attackDamage
        }
      }`,
        variables: {
          championName: "Ashe",
        },
      });
      this.championSearch = res.data.data.getChampionByName;
    },
    async updateAttackDamage() {
      const res = await axios.post("http://localhost:4000/graphql", {
        query: `
        mutation UpdateAttackDamage(
          $championName: String!,  $attackDamage: Float) {
          updateAttackDamage(name: $championName, attackDamage: $attackDamage) {
            name
            attackDamage
          }
        }`,
        variables: {
          championName: this.targetName,
          attackDamage: this.targetAttack,
        },
      });
      this.updatedChampion = res.data.data.updateAttackDamage;
    },
  },
};
</script>
