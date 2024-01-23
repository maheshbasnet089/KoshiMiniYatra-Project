<template>
    <div class="pa-6">
        <v-card class="pa-6">
            <v-banner>
                <div class="pa-3 text-center">
                    <p class="text-h6 indigo--text mb-0 pb-0">Mass Notification </p>
                    <span class="caption">Please fill up the below field and send Mail notification about the
                        update</span>
                </div>
            </v-banner>
            <v-textarea solo name="input-7-4" label="Solo textarea" v-model="text"></v-textarea>
            <div class="text-center">
                <v-btn small color="black" class="white--text" type="submit" @click.prevent="submitForm">
                    send
                </v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";

export default {
    data() {
        return {

            text: ""
        }
    },
    methods: {
        async submitForm() {
            try {
                const response = await axios.post(`${API_LOCATION}/sendEmailToUsers`, { message: this.text }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                alert('Notification Sent !!')

                console.log(response.data)

            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>