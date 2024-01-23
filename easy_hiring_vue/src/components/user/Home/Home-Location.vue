<template>
  <div>
    <v-row>
      <v-col>
        <v-banner>
          <v-row>
            <v-col md="5">
              <p class="black--text text-h6 mb-0 pb-0">
                Where you are looking for Job?
              </p>
              <p class="grey--text caption">
                Click the Location and find the job in your prefered Location
              </p>
            </v-col>

            <v-spacer></v-spacer>
            <v-col md="3">
              <v-text-field v-model="search" label="Search" @input="onInput" append-icon="mdi-map-marker" clearable
                solo></v-text-field>
            </v-col>
          </v-row>
        </v-banner>
      </v-col>
    </v-row>
    <v-row class="pa-5">
      <v-col md="3" v-for="city in jobs" :key="city.id" @click="$router.push(`/addressJobDetail/${city.id}`)">
        <v-card class="mx-auto" max-width="450">
          <v-img :src=city.image :aspect-ratio="16 / 9">
          </v-img>
          <div class="pa-2">
            <div class="text-h6 mb-0">{{ city.name }}</div>
            <!-- <p class="grey--text caption">4 Jobs open for {{ city.name }}</p> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import { API_LOCATION } from "../../../config/index";
export default {
  data: () => ({
    jobs: [],
    search: null
  }),
  methods: {
    alarm() {
      alert("Turning on alarm...");
    },
    blinds() {
      alert("Toggling Blinds...");
    },
    lights() {
      alert("Toggling lights...");
    },
    async onInput() {
      const response = await axios.get(`${API_LOCATION}/city/${this.search}`);
      console.log(response.data)
      this.jobs = response.data.city;

    }

  },
  async created() {
    try {

      const response = await axios.get(`${API_LOCATION}/city`);
      // const response2 = await axios.get(`${API_LOCATION}/job/22`);
      console.log(response.data)
      this.jobs = response.data.city;
      console.log(this.jobs)

    } catch (error) {
      console.log(error)
    }
  },
};
</script>
