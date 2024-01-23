
<template>
    <div>
        <v-card class="ma-10">
            <div class="pa-3">
                <p class="text-h6 indigo--text mb-0 pb-0">Category List</p>
                <span class="caption">Below you can see all Posted Categorys</span>
            </div>

            <div class="d-flex justify-end mr-10">
                <v-btn color="blue" @click="$router.push('/admin-salary')">Add salary</v-btn>
            </div>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in data" :key="item.id">



                            <td> {{ item.name }}</td>

                            <td>

                                <v-btn small class="ma-2" @click="deleteCategory(item.id)">
                                    <v-icon small color="red">mdi-cancel</v-icon>
                                </v-btn>


                            </td>
                        </tr>
                        <v-dialog v-model="showCityModal" max-width="400px" center>
                            <v-card>
                                <v-card-title class="headline">{{ name }}</v-card-title>

                                <v-card-actions>
                                    <v-btn color="indigo" text @click="showCityModal = false">Close</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';
import { API_LOCATION } from "../../config/index";
export default {
    data() {
        return {
            data: null,
            showCityModal: false,
            name: "",
            image: ""

        }
    },
    async created() {
        try {

            const response = await axios.get(`${API_LOCATION}/salary`);
            console.log(response.data)
            this.data = response.data.salary;
            // console.log(this.data)
        } catch (error) {
            console.log(error)
        }

    },
    methods: {
        async deleteCategory(categoryId) {
            try {
                await axios.delete(`${API_LOCATION}/salary/${categoryId}`);
                // remove the city from the data array
                this.data = this.data.filter(item => item.id !== categoryId);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

