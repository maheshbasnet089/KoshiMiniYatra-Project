<template>
  <v-container>
    <v-row>
      <v-col>
        <HomeLocation />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <HomeCategory />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <HomeBlog />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <TopEmploye />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeLocation from "./Home/Home-Location.vue";
import HomeCategory from "./Home/Home-category.vue";
import HomeBlog from "./Home/Home-Blog.vue";
import TopEmploye from "./Home/Top-Employe.vue"

export default {
  components: {
    HomeCategory,
    HomeLocation,
    HomeBlog,
    TopEmploye
  },
  data: () => ({
    
  }),
};
</script>