<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card class="pa-6">
                    <p class="indigo--text pb-0 mb-0">Find the Right Job!</p>
                    <span class="caption">Filter a right category of job</span>
                    <v-text-field label="Find any job you are looking for?" v-model="search" @input="onInput"
                        prepend-inner-icon="mdi-home-search-outline"></v-text-field>
                    <v-autocomplete v-model="values" :items="items" item-text="name" item-value="id" outlined dense chips
                        small-chips label="Find from Category"></v-autocomplete>

                    <v-subheader>What is the salary range you are expecting?</v-subheader>
                    <v-autocomplete v-model="salaryId" :items="salaries" item-text="name" item-value="id" outlined dense
                        chips small-chips label="Find from Salary"></v-autocomplete>


                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
    data: () => ({
        items: [],
        values: ['foo', 'bar'],
        value: null,
        min: -50,
        max: 90,
        range: [-20, 70],
        search: "",
        salaries: [],
        salaryId: null,
        category: null
    }),
    async created() {
        const response = await axios.get(`${API_LOCATION}/get-all-category`);
        const response2 = await axios.get(`${API_LOCATION}/salary`);
        console.log(response2.data.salary)
        this.items = response.data.category
        this.salaries = response2.data.salary

    },
    methods: {
        async onInput() {
            console.log(this.search)
const response = await axios.get(`${API_LOCATION}/job/${this.search}`, {
          params: {
            salaryId: this.salaryId,
          },
        });            console.log(response.data)
            this.category = response.data.category;

        }
    }
}
</script>