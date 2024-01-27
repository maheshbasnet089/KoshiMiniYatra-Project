<template>
    <v-app-bar app color="#32922F" dark>
        <!-- <div class="d-flex align-center">
            <v-img alt="Vuetify Logo" class="shrink mr-2" contain
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition"
                width="40" />

            <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
                src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
        </div> -->
        
        <!-- <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
                src="../../../src/assets/k-logo.png" width="100" /> -->
             <!--   <h1 @click="homeFun() ">Khetala.com</h1> -->
                <a class="navbar-brand logo ps-5" style="color:#fff !important" href="#"
        @click.prevent="$router.push({ name: 'home' })">KHETALA</a>
        <v-spacer></v-spacer>
        <div>
            <router-link to="/home" class="white--text">Home | </router-link>
            <router-link to="/blogs" class="white--text">Blog | </router-link>
            <router-link to="/jobs" class="white--text">Jobs List | </router-link>
            <router-link v-if="!token" to="/user/login" class="white--text">Login | </router-link>
            <router-link v-if="!token" to="/user/register" class="white--text">Register  </router-link>

        </div>
        <div>
            <!-- <v-btn v-if="!token" class="ma-2" outlined color="white" small @click="loginFun()">
                Login
            </v-btn>
            <v-btn v-if="!token" class="ma-2 indigo--text" color="white" small @click="registerFun()">
                Register
            </v-btn> -->
            <v-btn v-if="token" class="ma-2 indigo--text" color="white" small @click="logOut">
                LogOut
            </v-btn>
            <v-menu v-if="token" bottom min-width="200px" rounded offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon x-large v-on="on">
                        <v-avatar color="brown" size="48">
                            <v-img :src="user.image"></v-img>

                        </v-avatar>
                    </v-btn>
                </template>
                <v-card>
                    <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                            <v-avatar color="brown">
                                <v-img :src="user.image"></v-img>
                            </v-avatar>
                            <!-- <h3>{{ user.image }}</h3> -->
                            <p class="text-caption mt-1">
                                {{ user.email }}
                            </p>
                            <v-divider class="my-3"></v-divider>
                            <v-btn v-if="role=='ADMIN'" depressed text @click="$router.push(`/admin`)">
                                Profile
                            </v-btn>
                            <v-btn v-else depressed text @click="$router.push(`/profile`)">
                                Profile
                            </v-btn>
                            <v-btn v-if="role !='ADMIN'" depressed text @click="$router.push(`/update-profile`)">
                                Update Profile
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <v-btn v-if="user.status == 'active'" depressed text @click="$router.push('/post-job')">
                                Post Job
                            </v-btn>
                            <v-divider class="my-3"></v-divider>
                            <!-- <v-btn depressed text>
                                Disconnect
                            </v-btn> -->
                        </div>
                    </v-list-item-content>
                </v-card>
            </v-menu>
        </div>

    </v-app-bar>
</template>

<script>
import VueCookies from 'vue-cookies'
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
    data: () => ({
        user: {},
        token: null,
        role : null,
        myId : '',
    }),
    async created() {
        this.token = VueCookies.get('token')
        const response = await axios.get(`${API_LOCATION}/getMe`);

        this.user = response.data.user
        this.role = response.data.user.role
        this.myId = response.data.user.id
        console.log(response.data.user.id)

    },
    methods: {
        loginFun() {
            this.$router.push('/login')
        },
        registerFun() {
            this.$router.push('/register')
        },
        async logOut() {
            const response = await axios.post(`${API_LOCATION}/logOut`);
            console.log(response.data)

            VueCookies.remove('token')
            this.$router.push('/home')




            // location.reload()

        },
        homeFun() {
            this.$router.push('/')
        },
        userProfileFun() {
            this.$router.push('/profile')
        },
        postJobFun() {
            this.$router.push('/post-job')
        },
        logCookie(cookieName) {
            var allCookies = document.cookie.split(';');
            for (var i = 0; i < allCookies.length; i++) {
                var cookie = allCookies[i];
                var eqPos = cookie.indexOf("=");
                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                name = name.trim();
                if (name === cookieName) {
                    console.log(cookie.substr(eqPos + 1));
                    break;
                }
            }
        }

    }
}
</script>