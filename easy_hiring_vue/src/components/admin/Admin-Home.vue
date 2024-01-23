<template>
    <div>
        <AdminCard />
        <v-divider></v-divider>
        <v-row class="justify-space-around pa-5">
            <v-col md="7">
                <AdminHistory />
            </v-col>
            <v-col md="4">
                <v-card>
                    <LatestUser />
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import AdminCard from "./Admin-card.vue"
import AdminHistory from "./Admin-History.vue"
import LatestUser from "./Latest-User.vue"

export default {
  name: 'AdminHome',

  components: {
    AdminCard,
    AdminHistory,
    LatestUser
},

  data: () => ({
    //
  }),
};
</script>