<template>
    <div style="width:50%;margin: 0 auto;margin-top: 6rem;">
        <div>
            <v-banner class="ma-3">
                <p class="text-h5 indigo--text mb-0" style="text-align: center">Reset Password</p>
                <!-- <span class="caption">Plese input Right Credintial to Login</span> -->
            </v-banner>
        </div>
        <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation>

            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="otp" label="OTP (From email)" required></v-text-field>
            <v-text-field v-model="password" :rules="[rules.required, rules.min]" label="New Password"
                required></v-text-field>


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
        otp: "",
        emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],

        password: "",
        rules: {
            required: (value) => !!value || "Required.",
            min: (v) => v.length >= 8 || "Min 8 characters",
            emailMatch: () => `The email and password you entered don't match`,
        },
    }),

    methods: {
        validate() {
            this.loginFun();
        },
        loginFun() {
            let user = {
                otp: this.otp,
                password: this.password,
                email: this.email
            }
            console.log(this.password);
            axios
                .post(API_LOCATION + "/resetpassword", user)
                .then(() => {

                    alert('Sucessfully Changed')
                    this.$router.push('/user/login')

                })
                .catch(() => {
                    alert("Failed")
                });
        },
    },
};
</script>
