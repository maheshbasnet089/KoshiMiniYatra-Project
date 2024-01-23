<template>
  <div>
    <v-row>
      <v-col>
        <v-banner>
          <v-row>
            <v-col md="5">
              <p class="black--text text-h6 mb-0 pb-0">
                Choose the Category of your work
              </p>
              <p class="grey--text caption">
                Click the Category and find the job in your prefered category
              </p>
            </v-col>

            <v-spacer></v-spacer>
            <v-col md="3">
              <v-text-field v-model="search" label="Search"  @input="onInput" append-icon="mdi-map-marker" clearable solo></v-text-field>
            </v-col>
          </v-row>
        </v-banner>
      </v-col>
    </v-row>
    <v-row class="pa-5">
      <v-col md="3" v-for="(item, i) in category" :key="i" @click="$router.push(`/categoryJobDetail/${item.id}`)">
        <v-card class="mx-auto" max-width="450">
          <v-img :src="item.image" :aspect-ratio="16 / 9">
          </v-img>
          <div class="pa-2">
            <div class="text-h6 mb-0">{{ item.name }}</div>
            <!-- <p class="grey--text caption">200 Jobs open for Gardening</p> -->
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "./../../../config/index";

export default {
  data: () => ({
    category: [],
    search : null
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
      console.log(this.search)
      const response = await axios.get(`${API_LOCATION}/get-all-category/${this.search}`);
      console.log(response.data)
      this.category = response.data.category;

    }
  },
  mounted() {
    axios
      .get(API_LOCATION + "/get-all-category")
      .then((result) => {
        this.category = result.data.category
        console.log(this.category)
      })
      .catch(err => {
        console.log(err)
      })
  }
};
</script>
