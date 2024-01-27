<template>
    <template-view>
        <!-- Section 1 -->
        <!-- <section class="hero" id="home" style="display: flex; position: relative;">
            <div class=""
                style="width: 100%; height: 100%; position: absolute; display: flex; justify-content: center;align-items: center;background-color: rgba(0,0,0,0.4);">
                <div class="" style=" margin-left: 1rem;">
                    <h1 style="color :#55eb50; font-weight: bold; margin-top: -8rem;">"Khetala: Bridging Jobs, Connecting
                        Workers.".
                    </h1>
                    <button class="btn btn-warning" style="background-color:#4CAF50 !important">Learn More</button>
                </div>
            </div>
        </section> -->
        <section class="hero" id="home" style="display: flex; position: relative;">
            <div class=""
                style="width: 100%; height: 100%; position: absolute; display: flex; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.6);">
                <div class="" style="text-align: center; color: white; margin-left: 1rem;">
                    <!-- <div class="" style="text-align: center; color: #55eb50; margin-left: 1rem;"> -->
                    <h1 style="font-weight: bold; margin-top: -8rem;">"Khetala: Bridging Jobs, Connecting Workers."</h1>
                    <button class="btn btn-success mt-5" @click="$router.push('/')"
                        style="color:white !important; width: 150px; ">Jobs</button>
                </div>
            </div>
        </section>


        <!-- Section 2 -->
        <section class="py-5" id="about">
            <div class="container" style="padding:30px">
                <p style="font-size: 2.6rem;font-weight: 600;text-decoration: underline;">About us </p>
                <div class="row">
                    <div class="col-md-6">
                        <img src="./image/svg/about.svg" alt="" class="img-fluid rounded" height="200px">
                    </div>
                    <div class="col-md-6"
                        style="padding:40px;display: flex; flex-direction: column; justify-content: center;">
                        <p style="font-size: 20px;font-weight: 600;">Welcome to Khetala</p>


                        <p style="text-align: justify;">At Khetala, we pride ourselves on being the conduit that
                            effortlessly connects tasks with the right talent. Our mission revolves around simplifying the
                            hiring process, whether you're a business seeking skilled professionals or an individual looking
                            for exciting opportunities. What sets us apart is our commitment to efficiency, diversity, and
                            reliability. We believe in a seamless experience, where tasks get done with precision and
                            professionalism. For businesses, finding the perfect match for your needs is now easier than
                            ever. For individuals, Khetala is the gateway to discovering fulfilling tasks that align with
                            your skills and passion. Join our vibrant community, where empowerment, connection, and thriving
                            define the Khetala experience.</p>
                    </div>
                </div>
            </div>
        </section>



        <!-- Section 4 -->
        <section class="py-5 bg-white" id="contact">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="row bg-light pt-2">
                            <div class="col-1"></div>
                            <div class="col-4">

                                <p><strong>Call us: </strong> 9800000000</p>
                            </div>
                            <div class="col-4">

                                <p><strong>Email: </strong> khetala@info.com</p>
                            </div>
                            <div class="col-3">

                                <p><strong>Address: </strong> Itahari</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h1>Contact us</h1>
                        <form @submit.prevent="sendMessage">
                            <div class="form-group">
                                <label for="name-input">Your Name <span class="text-danger">*</span></label>
                                <input id="name-input" class="form-control" type="text" v-model="name">
                            </div>
                            <div class="form-group">
                                <label for="email-input">Email <span class="text-danger">*</span></label>
                                <input id="email-input" class="form-control" type="text" v-model="email">
                            </div>
                            <div class="form-group">
                                <label for="subject-input">Subject <span class="text-danger">*</span></label>
                                <input id="subject-input" class="form-control" type="text" v-model="subject">
                            </div>
                            <div class="form-group">
                                <label for="message-textarea">Message</label>
                                <textarea id="message-textarea" class="form-control" v-model="message" rows="3"></textarea>
                            </div>
                            <button @click="sendMessage" type="submit" class="btn btn-primary my-2"
                                style="background:#32922F !important; color: #fff !important; border: none !important;">
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div class="col-md-6" style="margin-top: 100px;">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14263.134620967507!2d87.3019478!3d26.6554085!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x2959e2a3e2bf54e0!2sItahari%20International%20College!5e0!3m2!1sen!2snp!4v1672139442349!5m2!1sen!2snp"
                            width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </section>
    </template-view>
</template>

<script>
import TemplateView from './Template-View.vue'

import axios from "axios";
import { API_LOCATION } from "../../config/index";

export default {
    components: { TemplateView },

    data() {
        return {
            name: '',
            email: '',
            subject: '',
            message: '',
        }
    },
    methods: {
        async sendMessage() {
            axios.post(API_LOCATION + '/contact/add-contact', {
                name: this.name,
                email: this.email,
                subject: this.subject,
                message: this.message
            }).then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
        }
    },
}

</script>

<style scoped>
.hero {
    /* width: 100%; */
    height: 80vh;
    background-image: url('./image/field.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;


}

* {
    scroll-behavior: smooth;
}
</style>