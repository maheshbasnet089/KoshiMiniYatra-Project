<template>
    <v-container fluid>
        <TopNavbar/>
        <v-main>
          <router-view></router-view>
        </v-main>
        <MainFooter />
    </v-container>
</template>

<script>
import TopNavbar from './Top-Navbar.vue';
import MainFooter from './Main-Footer.vue';

export default {
  name: 'userLayout',

  components: {
    TopNavbar,
    MainFooter
},

  data: () => ({
    //
  }),
};
</script>