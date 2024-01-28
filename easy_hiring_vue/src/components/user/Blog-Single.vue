<template>
  <div>
    <v-container>
      <v-row>
      <v-col>
        <v-img class="white--text align-end" height="300px" :src= "image" >
        </v-img>
        <v-banner>
          <v-row class="">
            <v-col class="">
          <v-card-title><b>{{ title }}</b></v-card-title>

              <p class="grey--text text mb-0 pb-0 ">{{ date }}</p>
              <p class="grey--text caption">
               {{ description }}
              </p>

             
              <!-- <p class="black--text">{{ content }}</p> -->
            </v-col>
           
          </v-row>
        </v-banner>
      </v-col>
    </v-row>
    <v-row>
      <div v-html="content"></div>
    </v-row>
    </v-container>
    
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
      this.content = response.data.blog.content
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
