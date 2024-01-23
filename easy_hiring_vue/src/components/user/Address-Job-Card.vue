<template>
    <v-container>
        <template v-if="jobs.length > 0">
            <v-card class="pa-10 align-center mb-8" v-for="job in jobs" :key="job.id">
                <v-row>
                    <v-col md="2">
                        <v-avatar size="56" tile>
                            <v-img v-if="job.user" :src="job.image" style="border-radius: 50%;"></v-img>
                        </v-avatar>
                    </v-col>
                    <v-col md="3">
                        <div>
                            <h3>{{ job.title }}</h3>
                        </div>
                    </v-col>
                    <v-col md="2">
                        <!-- <p class="pa-0 ma-0"><span style="font-weight: 500 ;">Title:</span>{{ job.level }}</p> -->
                        <p class="pa-0 ma-0"><span style="font-weight: 500 ;">Category:</span>{{ job.category.name }}
                        </p>
                        <p class="pa-0 ma-0"><span style="font-weight: 500 ;">Salary:</span>{{ job.pricing }}</p>
                    </v-col>
                    <v-col md="3" v-if='job.user'>
                        <v-rating :value="job.user.rating" background-color="purple lighten-3" readonly color="purple"
                            small></v-rating>
                    </v-col>
                    <v-col md="1">
                        <v-btn small @click="$router.push(`/job-detail/${job.id}`)">
                            view Detail
                        </v-btn>
                    </v-col>
                </v-row>

            </v-card>
        </template>
        <template v-else>
            <h3 style="text-align: center; margin-top: 50px; text-decoration: double;"><b>No Jobs Available Now For This
                    City !!</b> </h3>
        </template>

    </v-container>
</template>

<script>
import axios from 'axios';
import { API_LOCATION } from "../../config/index";
export default {
    data: () => ({
        rating: 4,
        jobs: []
    }),
    async created() {
        try {
            console.log(this.$route.params.id)

            const response = await axios.get(`${API_LOCATION}/job/address/${this.$route.params.id}`);
            this.jobs = response.data.result;
            console.log(this.jobs)
        } catch (error) {
            console.log(error)
        }
    },
    methods: {

    }
}
</script>