<template>
  <div>
    <v-row>
      <v-col>
        <v-banner>
          <v-row class="text-center">
            <v-col class="text-center">
              <p class="black--text text-h6 mb-0 pb-0">We write Blogs</p>
              <p class="grey--text caption">
                Here our Inside Story and learning
              </p>
            </v-col>
          </v-row>
        </v-banner>
      </v-col>
    </v-row>
    <v-row class="pa-5">
      <v-col md="4" v-for="blog in blogs" :key="blog.id">

        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text align-end" height="200px" :src="blog.image ">
            <v-card-title>{{ blog.title }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0"> {{ blog.date }} </v-card-subtitle>

          <v-card-text class="text--primary">


            <div>{{ blog.description }}</div>
          </v-card-text>

          <v-card-actions>
            <!-- <v-btn color="orange" text> Share </v-btn> -->

            <v-btn color="orange" text @click="$router.push(`/single-blog/${blog.id}`)"> Explore </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import { API_LOCATION } from '@/config';
export default {
  data() {
    return {
      blogs: []
    }
  },
  async created() {
    try {

      const response = await axios.get(`${API_LOCATION}/blog`);
      console.log(response.data)
      this.blogs = response.data.blog
      console.log(this.blogs)
    } catch (error) {
      console.log(error)
    }
  },
};
</script>
