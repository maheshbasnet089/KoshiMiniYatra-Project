<template>
  <div>
    <v-container>
      <v-row>
        <v-col md="4">
          <v-card class="pa-5">
            <v-banner class="text-center">
              <v-avatar size="56">
                <v-img :src="image">
                </v-img>
              </v-avatar>
              <v-rating v-model="rating" background-color="purple lighten-3" color="purple" small></v-rating>
              <p>{{ name }}</p>

              <span class="caption">{{ email }}</span>

            </v-banner>
            <v-row>
              <v-col>

              </v-col>
              <!-- <v-col>
                <v-btn color="primary" dark small>
                  200 Job Done
                  <v-icon dark right> mdi-checkbox-marked-circle </v-icon>
                </v-btn>
              </v-col> -->
            </v-row>
            <div>
              <p class="subtitle-2 indigo--text">Contact information</p>
              <span class="subtitle-2 indigo--text">Email</span>
              <!-- <span>span> -->

              <p>{{ email }}</p>
              <span class="subtitle-2 indigo--text"> Location : </span>
              <p>{{ location }}</p>
              <span class="subtitle-2 indigo--text">createdAt</span>
              <p>{{ createdAt }}</p>



            </div>
          </v-card>
        </v-col>
        <v-spacer></v-spacer>
        <v-col md="8">
          <v-card class="pa-5">
            <v-bottom-navigation v-model="applied">
              <v-btn value="favorites" @click="appliedFun()">
                <span>Applied</span>

                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn value="nearby" @click="createdFun()">
                <span>Created</span>

                <v-icon>mdi-map-marker</v-icon>
              </v-btn>
            </v-bottom-navigation>
            <v-div v-if="appliedCard">

              <v-card v-for="jobs in appliedJobs" :key="jobs.id">
                <v-card style="padding: 20px;margin-top: 10px;">


                  <p>
                    <span class="subtitle-2 indigo--text"> Title : </span> {{ jobs.job.title }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> Description : </span> {{ jobs.job.description }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> Level : </span>{{ jobs.job.level }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> Location : </span> {{ jobs.job.location }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> LastDate : </span> {{ jobs.job.lastDate }}
                  </p>
                </v-card>

              </v-card>
            </v-div>
            <v-card v-if="createdCard">
              <v-card v-for="jobs in createdJobs" :key="jobs.id">
                <v-card style="padding: 20px;margin-top: 10px;">


                  <p>
                    <span class="subtitle-2 indigo--text"> Title : </span> {{ jobs.title }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> Description : </span>{{ jobs.description }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> Level : </span>{{ jobs.level }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> Location : </span> {{ jobs.location }}
                  </p>
                  <p>
                    <span class="subtitle-2 indigo--text"> LastDate : </span> {{ jobs.lastDate }}
                  </p>
                </v-card>

              </v-card>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
  components: {
  },
  data: () => ({
    rating: 4,
    applied: "recent",
    appliedCard: true,
    createdCard: false,
    email: "",
    role: "",
    
    createdAt: "",
    name: "",
    image: null,
    appliedJobs: [],
    createdJobs: [],
    location: ""
  }),
  methods: {
    appliedFun() {
      this.appliedCard = true
      this.createdCard = false
    },
    createdFun() {
      this.appliedCard = false
      this.createdCard = true
    }
  },
  async created() {
    try {

      const response = await axios.get(`${API_LOCATION}/getMe`);
      const response2 = await axios.get(`${API_LOCATION}/appliedJob`);
      console.log(response.data)
      this.rating = response.data.user.rating

      this.createdJobs = response2.data.createdJobs
      console.log(response2.data.createdJobs)
      this.appliedJobs = response2.data.appliedJobs
      console.log(this.appliedJobs)
      this.name = response.data.user.name
      this.email = response.data.user.email
      this.location = response.data.user.location
      this.role = response.data.user.role
      this.image = response.data.user.image
      this.createdAt = response.data.user.createdAt
      console.log(this.email)

    } catch (error) {
      console.log(error);
    }
  }
};
</script>
