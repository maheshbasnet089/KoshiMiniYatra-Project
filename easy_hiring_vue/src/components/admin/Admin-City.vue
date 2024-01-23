<template>
  <div>
    <v-row>
      <v-col md="12">
        <div>
          <v-banner class="ma-3">
            <p class="text-h5 indigo--text mb-0">Add City</p>
            <span class="caption">Please fill up the below form to add new City</span>
          </v-banner>
          <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation @submit.prevent='submitForm'>
            <v-text-field v-model="name" label="Name" :rules="nameRules" required></v-text-field>




            <v-row>


              <v-col cols="12" sm="6" md="4">
                <v-file-input v-model="image" label="Upload Image Image" chips required
                  truncate-length="7"></v-file-input>
              </v-col>
            </v-row>


            <v-row>
              <v-col>
                <v-btn :disabled="!valid" color="indigo" small class="mr-4 white--text" type='submit'>
                  Post City
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="showSuccess" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Success!</v-card-title>
        <v-card-text>City added successfully</v-card-text>
        <v-card-actions>
          <v-btn color="green" text @click="showSuccess = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>

import axios from "axios";
import { API_LOCATION } from "../../config/index";


export default {

  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      image: null,
      showSuccess: false
    }

  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    onFileChange(event) {
      console.log(event.target.files[0])
      this.file = event.target.files[0]
    },
    async submitForm() {
      let formData = new FormData()
      formData.append('name', this.name)
      formData.append('image', this.image)
      try {

        await axios.post(`${API_LOCATION}/city`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
        this.showSuccess = true
      } catch (error) {
        console.log(error)
      }


    }
  },
};
</script>
  