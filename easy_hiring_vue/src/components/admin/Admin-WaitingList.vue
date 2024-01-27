<template>
    <div>
        <v-card class="ma-10">
            <div class="pa-3">
                <p class="text-h6 indigo--text mb-0 pb-0">Waiting User List</p>
                <span class="caption">Below you can see all waiting user</span>
            </div>

            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Username
                            </th>
                            <th class="text-left">
                                Email
                            </th>
                            <th class="text-left">
                                Citizenship
                            </th>

                            <th class="text-left">
                                Location
                            </th>
                            <th class="text-left">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in jobs" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td class="p-3">
                                <!-- <v-img class="white--text align-end" height="100px" :src="item.citizenShip"
                                    :style="{ objectFit: 'cover', width: '300px' }">
                                </v-img> -->

                                <img :src="item.citizenShip" height="100px" :style="{ objectFit: 'cover', width: '300px' }">
                                <a :href="item.citizenShip" target="_blank">View Citizenship</a>  
        
                            </td>
                            
                            <td>{{ item.location }}</td>

                            <td>
                                <v-btn small class="ma-2" @click="acceptUser(item.id)">
                                    <v-icon small color="green">mdi-check</v-icon>
                                </v-btn>
                                <!-- <v-btn small class="ma-2">
                                    <v-icon small color="primary">mdi-eye</v-icon>
                                </v-btn> -->

                            </td>
                        </tr>
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
            jobs: []
        }
    },
    async created() {
        try {


            const response = await axios.get(`${API_LOCATION}/waitingList`);
            console.log(response.data)
            this.jobs = response.data.users;
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async acceptUser(jobId) {
            try {
                const respo = await axios.post(`${API_LOCATION}/waitingList/${jobId}`);
                console.log(respo)
                // remove the city from the data array
                this.jobs = this.jobs.filter(item => item.id !== jobId);

            } catch (error) {
                console.log(error);
            }
        },
        
    }
}
</script>
  
  