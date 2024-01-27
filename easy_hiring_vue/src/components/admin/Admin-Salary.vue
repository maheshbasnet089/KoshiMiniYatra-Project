<template>
    <div>
        <v-row>
            <v-col md="12">
                <div>
                    <v-banner class="ma-3">
                        <p class="text-h5 indigo--text mb-0">Add Salary</p>
                        <span class="caption">Please fill up the below form to add new Salary</span>
                    </v-banner>
                    <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation @submit.prevent='submitForm'>
                        <v-text-field v-model="name" label="Salary" :rules="nameRules" required></v-text-field>
                        <v-row>
                            <v-col>
                                <v-btn :disabled="!valid" color="indigo" small class="mr-4 white--text" type='submit'>
                                    Post Salary
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
                <v-card-text>Category added successfully</v-card-text>
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
                (v) => !!v || "Salary is required",
                (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
            ],

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

        async submitForm() {

            try {

                const response = await axios.post(`${API_LOCATION}/salary`, { name: this.name }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                )
                console.log(response)
                //   this.showSuccess = true
                this.$router.push('/admin-salaryList')
            } catch (error) {
                console.log(error)
            }


        }
    },
};
</script>
  