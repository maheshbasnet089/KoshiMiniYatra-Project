<template>
    <v-row>
        <v-col md="4">
            <v-row>
                <v-col>
                    <v-card class="pa-6">
                        <p class="indigo--text pb-0 mb-0">Find the Right Job!</p>
                        <span class="caption">Filter a right category of job</span>
                        <v-text-field label="Find any job you are looking for?" v-model="search" @input="onInput"
                            prepend-inner-icon="mdi-home-search-outline"></v-text-field>


                        <v-subheader>What is the salary range you are expecting?</v-subheader>
                        <v-autocomplete @input="onInput" v-model="salaryId" :items="salaries" item-text="name"
                            item-value="id" outlined dense chips small-chips label="Find from Salary"></v-autocomplete>


                    </v-card>
                </v-col>
            </v-row>
        </v-col>

        <v-col md="8">

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
                            <p class="pa-0 ma-0"><span style="font-weight: 500 ;">Title:</span>{{ job.level }}</p>
                            <p class="pa-0 ma-0"><span style="font-weight: 500 ;">Category:</span>{{ job.category.name }}
                            </p>
                            <p class="pa-0 ma-0" v-if="job.pricing !== null && typeof job.pricing !== 'undefined'"><span
                                    style="font-weight: 500 ;">Salary:</span>{{ job.pricing }}</p>
                            <p class="pa-0 ma-0" v-else><span style="font-weight: 500 ;">Salary:</span>{{ job.salary.name }}
                            </p>
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
                <h3 style="text-align: center; margin-top: 50px; text-decoration: double;"><b>No Jobs Available Now !!</b>
                </h3>
            </template>
        </v-col>


    </v-row>
</template>

<script>
import axios from 'axios';
import { API_LOCATION } from "../../config/index";
export default {
    data: () => ({
        rating: null,
        items: [],
        values: ['foo', 'bar'],
        value: null,
        min: -50,
        max: 90,
        range: [-20, 70],
        search: null,
        salaries: [],
        salaryId: null,
        category: null,
        jobs: []
    }),
    async created() {
        try {

            const response = await axios.get(`${API_LOCATION}/job`);
            const response4 = await axios.get(`${API_LOCATION}/get-all-category`);
            console.log(response4.data)
            const response2 = await axios.get(`${API_LOCATION}/salary`);
            console.log(response2.data.salary)
            this.items = response.data.category
            this.salaries = response2.data.salary
            // const response2 = await axios.get(`${API_LOCATION}/getMe`);
            console.log(response.data)
            this.jobs = response.data.result;
            console.log(this.jobs)
        } catch (error) {
            console.log(error)
        }
    },


    methods: {
        async onInput() {
            const response = await axios.get(`${API_LOCATION}/job/${this.search}`, {
                params: {
                    salaryId: this.salaryId,
                },
            }); console.log(this.salaryId)
            console.log(response.data)
            this.jobs = response.data.result
            console.log(response.data)
            this.category = response.data.category;


        }
    }
}
</script>