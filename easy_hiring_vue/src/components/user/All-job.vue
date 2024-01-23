<template>
    <v-container fluid>
        <v-row>
            <UserJumbotorn/>
        </v-row>
            <!-- <v-col md="4">
            </v-col> -->
                <JobCard />
    </v-container>
</template>

<script>
import UserJumbotorn from './User-Jumbotorn.vue';
import JobCard from './Job-Card.vue'


export default {
  name: 'UserHome',

  components: {
    
    UserJumbotorn,
    JobCard,
  },

  data: () => ({
    //
  }),
};
</script>