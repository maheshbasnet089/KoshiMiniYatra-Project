<template>
  <div style="width: 50%;margin: 0 auto;">
    <div>
      <v-banner class="ma-3">
        <p class="text-h5 indigo--text mb-0" style="text-align: center;">Registration Form</p>
        <!-- <span class="caption">Please provide us all the legal and liable information of yours. The
          information will be secret</span> -->
      </v-banner>
    </div>
    <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">

      <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Name" required></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
      <v-row>
        <v-col md="6">
          <v-text-field v-model="tempAddress" label="Temprorary Address" required></v-text-field>
        </v-col>
        <v-col md="6">
          <v-text-field v-model="phone" label="Phone" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6">
          <v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" prepend-icon="mdi-camera"
            v-model="image" :rules="avatarRules" label="Avatar"></v-file-input>



        </v-col>
        <v-col md="6">
          <v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick your citizenship"
            prepend-icon="mdi-camera" :rules="citizenshipRules" v-model="citizenship" label="Citezenship"></v-file-input>



        </v-col>
      </v-row>
      <v-col>

        <v-div>

          <v-select v-model="location" :rules="locationRules" :items="locations" item-text="name" item-value="name"
            label="Select a location"></v-select>
        </v-div>
      </v-col>
      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
        label="Please type a strong password" hint="At least 8 characters" counter
        @click:append="show1 = !show1"></v-text-field>

      <v-checkbox v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']"
        label="By agreeing you accept our privacy and policy" required></v-checkbox>

      <v-row>
        <v-col>
          <v-btn :disabled="!valid" color="indigo" type="submit" small class="mr-4 white--text" @click="validate">
            Register
          </v-btn>
          <span class="caption"> Alread register? <span style="text-decoration: underline;"
              @click="$router.push('/user/login')">Login</span> </span>
        </v-col>
      </v-row>


    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
  components: {
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
    ],
    locationRules: [
      (v) => !!v || "Location is required",
    ],
    citizenshipRules: [
      (v) => !!v || "citizenship is required",
    ],
    avatarRules: [
      (v) => !!v || "Avatar is required",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,
    image: null,
    locations: [],
    location: "",
    tempAddress: "",
    phone: "",
    citizenship: "",


    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    checkbox: false,

  }),
  async created() {
    const response2 = await axios.get(`${API_LOCATION}/city`);
    console.log(response2.data)
    this.locations = response2.data.city
  }
  ,

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
    async submitForm() {

      try {
        // const data = {
        //   name: this.name,
        //   email: this.email,
        //   password: this.password
        // }
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('image', this.image)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('location', this.location)
        formData.append('tempAddress', this.tempAddress)
        formData.append('phone', this.phone)

        formData.append('citizenship', this.citizenship)
        try {
          const response = await axios.post(`${API_LOCATION}/register`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          console.log(response);

          if (response.status === 200) {
            // User was successfully created
          alert('Registered Sucessfully !!')

            this.$router.push('/user/login');
          } else {
            // There was an error creating the user
            console.error(response.data.message);
          }
        } catch (error) {
          console.error(error);
          // Handle error response here
          alert('Invalied Crediantials!!')
        }

      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>
