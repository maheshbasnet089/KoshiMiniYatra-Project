<template>
  <div class="pa-6">
    <v-row class="justify-center">
      <v-col md="5">
        <v-card class="pa-6">
          <v-banner>
            <div class="pa-3 text-center">
              <img :src="image" width="70" alt="">
              <p class="text-h6 indigo--text mb-0 pb-0">Hello! Mr. {{ name }}</p>
              <span class="caption">{{ email }}</span>
            </div>
          </v-banner>
          <div>
            <p class="caption">Name</p>
            <v-text-field v-model="name" solo label="Solo" clearable></v-text-field>
          </div>
          <div>
            <p class="caption">Email</p>
            <v-text-field v-model="email" solo label="Solo" clearable disabled></v-text-field>
          </div>
          <div>
            <p class="caption">Update Password</p>
            <v-text-field v-model="password" solo label="Change Password" clearable></v-text-field>
          </div>
          <div>
            <v-col cols="12" sm="6" md="4">
              <v-file-input v-model="image" solo label="Upload Image Image" chips required truncate-length="7"></v-file-input>
            </v-col>
          </div>
          <div class="text-center">
            <v-btn small color="black" class="white--text" type="submit" @click="submitForm"> Update Profile </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    image: "",
  }),
  async created() {
    try {


      const response2 = await axios.get(`${API_LOCATION}/getMe`);
      console.log(response2.data.user)
      this.name = response2.data.user.name;
      this.email = response2.data.user.email;
      this.image = response2.data.user.image;
      // this.name = response2.data.user.name;
      console.log(this.jobs)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async submitForm() {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('image', this.image)
      formData.append('email', this.email)
      formData.append('password', this.password)

      const response = await axios.patch(`${API_LOCATION}/updatePassword`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      location.reload()
      console.log(response.data)

    }
  }
};
</script>
