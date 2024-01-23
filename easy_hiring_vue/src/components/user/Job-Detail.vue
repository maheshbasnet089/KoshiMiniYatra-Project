<template>
  <div>
    <v-container>
      <v-row>
        <v-col md="9">
          <v-card class="pa-5">
            <p>Job Details</p>
            <v-banner>
              <v-row class="justify-space-around">
                <v-col md="1">
                  <v-avatar size="56" tile>
                    <img alt="Avatar" style="border-radius: 50%;" :src="image">
                  </v-avatar>
                </v-col>
                <v-col md="3">
                  <!-- <p v-if="userName">{{ userName }} is Hiring</p> -->
                  <!-- <p v-if="email">{{ email.slice(0, 8) }} is Hiring</p> -->
                </v-col>
                <v-col md="3">
                  <v-rating v-model="rating" readonly background-color="purple lighten-3" color="purple" small></v-rating>
                  <v-dialog v-model="dialog" persistent max-width="400px">
                    <v-card>
                      <v-card-title>Rate User</v-card-title>
                      <v-card-text>
                        <v-rating v-model="userRating" background-color="purple lighten-3" color="purple"
                          small></v-rating>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="primary" text @click="submitRating">Submit</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <button @click="dialog = true">Rate User</button>

                </v-col>
              </v-row>
            </v-banner>
            <v-row class="pa-4">
              <v-col>
                <p style="font-weight: 700;">{{ title }}</p>
              </v-col>
              <v-col>
                <p style="font-weight: 300;">{{ type }}</p>
              </v-col>
              <v-col>
                <p class="pa-0 ma-0" v-if="salary !== null && typeof salary !== 'undefined'"><span
                    style="font-weight: 500 ;">Salary:</span>{{ salary }}</p>
                <p class="pa-0 ma-0" v-else><span style="font-weight: 500 ;">Salary:</span>{{ pricing.name }}
                </p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="pa-4">
              <v-col>
                <p>
                  {{ date }}

                  {{ description }}
                </p>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <div v-if="isUserJobOwner">
              <v-btn v-if="token" class="mt-2" small @click="$router.push(`/apply-job/${id}`)">
                Apply Now
              </v-btn>
            </div>

          </v-card>
        </v-col>
        <v-col md="3" v-if="token">
          <v-card class="pa-5">
            <p>Simillar Jobs</p>
            <v-row v-for="job in jobs" :key="job.id">

              <v-col md="4">
                <v-avatar size="56" tile @click="$router.push(`/apply-job/${job.id}`)">
                  <v-img v-if="job.user" :src="job.user.image" style="border-radius: 50%;">

                  </v-img>
                </v-avatar>
              </v-col>
              <v-col @click="$router.push(`/apply-job/${job.id}`)">
                <p class="mb-0" v-if="job.user"> {{ job.user.email.slice(0, 8) }} is Hiring</p>
                <p class="mb-0" v-else> A is Hiring</p>

                <span class="caption">{{ job.title }}</span>
              </v-col>


            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import VueCookies from 'vue-cookies'

import { API_LOCATION } from "../../config/index";


export default {
  components: {
  },
  data: () => ({
    userRating: 2,
    rating: 4,
    dialog: false,

    title: '',
    description: '',
    payment: null,
    type: '',
    level: '',
    location: '',
    date: '',
    userName: "",
    email: "",
    image: null,
    id: "",
    jobs: [],
    token: null,
    userId: null,
    salary: null,
    pricing: null,
    myId: '',

    user: null,

  }),

  async created() {
    try {

      this.token = VueCookies.get('token')

      const me = await axios.get(`${API_LOCATION}/getMe`);
      console.log(me)
      this.myId = me.data.user.id

      const response = await axios.get(`${API_LOCATION}/job/getSingleDetail/${this.$route.params.id}`);
      console.log(response)
      const responseForAllJobs = await axios.get(`${API_LOCATION}/job`);

      this.jobs = responseForAllJobs.data.result
      console.log(responseForAllJobs.data.result)

      console.log(response.data.result)

      this.email = response.data.result[0].user.email
      this.title = response.data.result[0].title
      this.description = response.data.result[0].description
      this.payment = response.data.result[0].payment
      this.type = response.data.result[0].type
      this.location = response.data.result[0].location
      this.date = response.data.result[0].lastDate
      this.level = response.data.result[0].level
      this.image = response.data.result[0].image
      this.id = response.data.result[0].id
      this.rating = response.data.result[0].user.rating
      this.userId = response.data.result[0].userId
      this.salary = response.data.result[0].pricing
      this.pricing = response.data.result[0].salary
      console.log(this.salary)

    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    isUserJobOwner() {
      console.log(this.userId)
      console.log(this.myId)
      return this.userId !== this.myId
    }
  },
  methods: {
    async submitRating() {

      await axios.post(`${API_LOCATION}/updateRating/${this.userId}`, {
        rating: this.userRating
      })

      alert("Rating Submitted")
      this.dialog = false


    }
  }

};
</script>
