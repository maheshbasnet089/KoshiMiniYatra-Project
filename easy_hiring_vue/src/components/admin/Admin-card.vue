<template>
  <v-container>
    <v-row class="justify-space-around pa-5">
      <v-col md="4">
        <v-card class="pa-5 white--text" color="#32922f">
          <p class="text-h4 text-center mb-0 pb-0">{{ this.users.length }}</p>
          <p class="caption text-center">Total User</p>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="pa-5 white--text" color="#32922f">
          <p class="text-h4 text-center mb-0 pb-0">{{ this.jobs.length }}</p>
          <p class="caption text-center">Job Posted</p>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";

export default {
  data() {
    return {

      text: "",
      users: [],
      jobs: []
    }
  },

  async created() {
    try {
      const response = await axios.get(`${API_LOCATION}/getUsers`)
      const response2 = await axios.get(`${API_LOCATION}/job`)
      this.jobs = response2.data.result
      console.log(response2.data)
      this.users = response.data.users

    } catch (error) {
      console.log(error)
    }

  }
}
</script>
