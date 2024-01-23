<template>
  <div>
    <v-row>
      <v-col>
        <v-banner>
          <v-row class="text-center">
            <v-col class="text-center">
              <p class="black--text text-h6 mb-0 pb-0">Our Top Employe</p>
              <p class="grey--text caption">
                Best rated Employee that work with us
              </p>
            </v-col>
          </v-row>
        </v-banner>
      </v-col>
    </v-row>
    <v-row class="pa-5">
      <v-col md="3" class="text-center" v-for='user in users' :key="user.id">
        <v-card class="pa-5">
          <v-avatar size="80">
            <v-img :src="user.image">

            </v-img>
          </v-avatar>
          <p class="black--text pb-0 mb-0 mt-2" v-if="user.name">{{ user.name }}</p>
          <p class="caption grey--texty">{{ user.email }}</p>
          <v-rating :value="user.rating" background-color="purple lighten-3" color="purple" small></v-rating>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../../config/index";
export default {
  data: () => ({
    rating: 4,
    users: []
  }),
  async created() {
    const response = await axios.get(`${API_LOCATION}/getUsers`);
    response.data.users.sort((a, b) => b.rating - a.rating)
    console.log(response)


    this.users = response.data.users.slice(0, 3).filter((user) => user.role !== "ADMIN")
    console.log(this.users)

  },
  methods: {
    alarm() {
      alert("Turning on alarm...");
    },
    blinds() {
      alert("Toggling Blinds...");
    },
    lights() {
      alert("Toggling lights...");
    },
  },
};
</script>
