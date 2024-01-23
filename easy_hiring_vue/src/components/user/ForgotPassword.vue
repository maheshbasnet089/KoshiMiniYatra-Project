<template>
    <div style="width:50%;margin: 0 auto;margin-top: 6rem;">
        <div>
            <v-banner class="ma-3">
                <p class="text-h5 indigo--text mb-0" style="text-align: center">Forgot Password</p>
                <!-- <span class="caption">Plese input Right Credintial to Login</span> -->
            </v-banner>
        </div>
        <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation>
            <!-- <v-alert border="right" colored-border type="error" elevation="2">
          Login failed! :-(
        </v-alert> -->

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

            <v-row>
                <v-col>
                    <v-btn :disabled="!valid" color="indigo" small class="mr-4 white--text" @click="validate">
                        Submit
                    </v-btn>
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
    }),

    methods: {
        validate() {
            this.loginFun();
        },
        loginFun() {
            let user = {
                email: this.email,
            }
            axios
                .post(API_LOCATION + "/forgotpassword", user)
                .then(() => {
                    this.$router.push('/user/reset-password')
                })
                .catch(() => {
                    alert("Failed")
                });
        },
    },
};
</script>
