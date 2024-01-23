<template>
  <div>
    <v-card class="ma-10">
      <div class="pa-3">
        <p class="text-h6 indigo--text mb-0 pb-0">Users List</p>
        <span class="caption">Below you can see all User</span>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in users" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>
                <v-btn small class="ma-2" @click="deleteUser(item.id)">
                  <v-icon small color="red">mdi-cancel</v-icon>
                </v-btn>
                <v-btn small class="ma-2">
                  <v-icon small color="primary">mdi-eye</v-icon>
                </v-btn>

              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
      alert('User Deleted Sucessfully !!')

      this.users = this.users.filter(user => user.id !== id)

    },
  }
}
</script>

