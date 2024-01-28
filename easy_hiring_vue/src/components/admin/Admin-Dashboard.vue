<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-navigation-drawer permanent>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="image"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Admin
              </v-list-item-title>
              <v-list-item-subtitle>admin@gmail.com</v-list-item-subtitle>
            </v-list-item-content>


            <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <p @click="clearLocalStorage" style="padding-left:10px;color:red;font-weight:600;font-size: 18px;display: block;">
          LogOut</p>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-item-group v-model="selectedItem" color="#32922f">
            <v-list-item v-for="(item, i) in items" :key="i" router :to="item.routes">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Khetala.com</v-toolbar-title>
    </v-app-bar>

    <v-main class="pa-0 ma-0">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import VueCookies from 'vue-cookies';
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
  data: () => ({
    image: "",

    drawer: null,
    selectedItem: 0,
    items: [
      { text: "Home", icon: "mdi-home", routes: '/admin' },
      { text: "Users", icon: "mdi-account-tie", routes: '/admin-userlist' },
      { text: "Notification", icon: "mdi-bell", routes: '/admin-notification' },
      { text: "Profile", icon: "mdi-account-circle", routes: '/admin-profile' },
      { text: "Blog", icon: "mdi-account-circle", routes: '/admin-Blog' },
      { text: "Job", icon: "mdi-account-circle", routes: '/admin-joblist' },
      { text: "City", icon: "mdi-account-circle", routes: '/admin-citylist' },
      { text: "Category", icon: "mdi-account-circle", routes: '/admin-categorylist' },
      { text: "Salary", icon: "mdi-account-circle", routes: '/admin-salarylist' },
      { text: "WaitingList", icon: "mdi-account-circle", routes: '/admin-waitinglist' },
      { text: "Contact", icon: "mdi-account-circle", routes: '/admin-contact' },

      // { text: "LogOut", icon: "mdi-account-circle", routes: '/admin-categorylist' },

    ],
  }),
  async created() {
    try {
      const response2 = await axios.get(`${API_LOCATION}/getMe`);
      this.image = response2.data.user.image;
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async clearLocalStorage() {
      localStorage.removeItem("key");
      VueCookies.remove("token")
      location.reload()
    }
  }
};
</script>
