<template>
  <div>
    <v-card height="fitContent">
      <div class="pa-3">
        <p class="text-h6 mb-0" style="color: #32922f;">Recent User</p>
        <span class="caption">List of all the recent registered Users</span>
      </div>
      <v-divider></v-divider>
      <v-card class="ma-3 mt-7" v-for="user in users" :key="user.id">
        <v-row class="pa-2">
          <v-col md="2">
            <v-avatar color="primary" size="36">
              <v-img :src="user.image">

              </v-img>
            </v-avatar>
          </v-col>
          <v-col>
            <p class="subtitle-2 mb-0">{{ user.name }}</p>
            <p class="caption">{{ user.location }}</p>
          </v-col>
          <v-col>
            <!-- <v-icon
              left
              small
            >
              mdi-eye
            </v-icon> -->
            <v-icon left small @click="deleteUser(user.id)">
              mdi-minus-circle
            </v-icon>
          </v-col>
        </v-row>
      </v-card>

    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
  data() {
    return {
      users: []
    }
  },
  async created() {
    const response = await axios.get(`${API_LOCATION}/getUsers`);
    console.log(response.data)
    this.users = response.data.users

  },
  methods: {
    async deleteUser(id) {
      const response = await axios.delete(`${API_LOCATION}/user/${id}`);
      console.log(response.data)
      this.users = this.users.filter(user => user.id !== id)
    }
  }
}
</script>