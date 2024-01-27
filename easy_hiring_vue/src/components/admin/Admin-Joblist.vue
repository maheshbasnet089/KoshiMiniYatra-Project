<template>
  <div>
    <v-card class="ma-10">
      <div class="pa-3">
        <p class="text-h6 indigo--text mb-0 pb-0">Job List</p>
        <span class="caption">Below you can see all Posted Jobs</span>
      </div>
      <div class="d-flex justify-end mr-10">
        <v-btn color="blue" @click="$router.push('/admin-job')">Add Job</v-btn>
      </div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Title
              </th>
              <th class="text-left">
                Type
              </th>
              <th class="text-left">
                Level
              </th>
             
              <th class="text-left">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in jobs" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.level }}</td>
              <td>{{ item.city.name }}</td>
             
              <td>
                <v-btn small class="ma-2" @click="deleteJob(item.id)" >
                  <v-icon small color="red">mdi-cancel</v-icon>
                </v-btn>
              

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
      jobs:[] 
    }
  },
  async created(){
    try {
            
            const response = await axios.get(`${API_LOCATION}/job`);
            console.log(response.data)
            this.jobs = response.data.result;
            
        } catch (error) {
            console.log(error)
        } 
  },
  methods:{
    async deleteJob(jobId) {
      try {
        await axios.delete(`${API_LOCATION}/job/${jobId}`);
        // remove the city from the data array
        this.jobs = this.jobs.filter(item => item.id !== jobId);

      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

