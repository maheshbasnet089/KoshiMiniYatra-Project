<template>
  <div>
    <v-row>
      <v-col>
        <v-img class="white--text align-end" height="200px" :src= "image" >
          <v-card-title>{{ title }}</v-card-title>
        </v-img>
        <v-banner>
          <v-row class="">
            <v-col class="">
              <p class="grey--text text mb-0 pb-0 ">{{ date }}</p>
              <p class="grey--text caption">
               {{ description }}
              </p>
            </v-col>
          </v-row>
        </v-banner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
import { API_LOCATION } from "../../config/index";
export default {
  data() {
    return {

      title: "",
      date: "",
      category: "",
      address : "",
      description : "",
      image : ""
    }


  },
  async created() {
    try {
      const params = this.$route.params.id
     
      const response = await axios.get(`${API_LOCATION}/blog/${params}`);
     console.log(response)
      // this.showCityModal = true;
      this.title = response.data.blog.title
      this.description = response.data.blog.description
      this.address = response.data.blog.address
      this.title = response.data.blog.title
      this.category = response.data.blog.category
      this.date = response.data.blog.date
      this.image = response.data.blog.image

    } catch (error) {
      console.log(error);
    }
  }
};
</script>
