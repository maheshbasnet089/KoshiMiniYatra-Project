<template>
  <div style="width:50%;margin: 0 auto;margin-top: 6rem;">
    <div>
      <v-banner class="ma-3">
        <p class="text-h5 indigo--text mb-0" style="text-align: center">Login Form</p>
        <!-- <span class="caption">Plese input Right Credintial to Login</span> -->
      </v-banner>
    </div>
    <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation>
      <!-- <v-alert border="right" colored-border type="error" elevation="2">
        Login failed! :-(
      </v-alert> -->

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
        label="Please type a strong password" hint="At least 8 characters" counter
        @click:append="show1 = !show1"></v-text-field>

      <span class="caption">Forgot password? <span style="text-decoration: underline;"
          @click="$router.push('/user/forgot-password')">Reset Now</span></span>
      <v-row>
        <v-col>
          <v-btn :disabled="!valid" color="indigo" small class="mr-4 white--text" @click="validate">
            Login
          </v-btn>
          <span class="caption"> Not registered? <span style="text-decoration: underline;"
              @click="$router.push('/user/register')">Register</span></span>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";

export default {
  components: {},
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,

    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      this.loginFun();
    },
    loginFun() {
      let user = {
        email: this.email,
        password: this.password
      }
      axios
        .post(API_LOCATION + "/login", user)
        .then((result) => {
          let key = [];
          switch (result.data.newData.role) {
            case 'ADMIN':
              alert('Admin Login Sucessfully !!')

              key.push(result.data.newData.token);
              this.progressLoader = false;
              window.localStorage.setItem("key", JSON.stringify(key));
              this.$router.push("/admin").catch((err) => {
                console.log(err);
              });
              break;
            case 'USER':

              alert('Login Sucessfully !!')

              key.push(result.data.newData.token);
              this.progressLoader = false;
              window.localStorage.setItem("key", JSON.stringify(key));
              this.$router.push("/").catch((err) => {
                console.log(err);
              });
              break;
            default:
              this.progressLoader = false;
              this.$router.push("/login");
          }
          this.$router.push('/')
          location.reload()

        })
        .catch((err) => {
          alert("Login Failed. Please check your inputs.")
          console.log(err);
          this.progressLoader = false;
          (this.snackbar = true),
            (this.responseMessgae = "Login Failed. Please check your inputs.");
        });
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
