<template>
    <template-view>
        <!-- Section 1 -->
        <section class="hero" id="home" style="display: flex;">
            <div class="w-50" style="margin-left: -26rem ;">
                <h1 style="color :#3f51b5 ">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod necessitatibus
                    voluptatem".
                </h1>
                <!-- <button class="btn btn-warning" style="background-color:#4CAF50 !important">Learn More</button> -->
            </div>
            <div style="margin-top: -20rem;border: 1px solid red;">
                <!-- <div style="display: flex;flex-direction: column;">
              <h1>for Clients</h1>
              <div>
                  <button>hello</button>
                  <button>hello</button>
                  <button>hello</button>
              </div>
          </div> -->
            </div>
        </section>

        <!-- Section 2 -->
        <section class="py-5" id="about">
            <div class="container" style="padding:30px">
                <div class="row">
                    <div class="col-md-6">
                        <p style="font-size: 20px;font-weight: 600;text-decoration: underline;">About us </p>
                        <img src="https://img.freepik.com/free-vector/choosing-best-candidate-concept_52683-43377.jpg?w=900&t=st=1675602278~exp=1675602878~hmac=7754f484b1c941f546eaeecfe1c74f84c8af0c91a83ebbfa1aa91449ae0e5cdc"
                            alt="" class="img-fluid rounded" height="200px">
                    </div>
                    <div class="col-md-6" style="padding:40px">
                        <p style="font-size: 20px;font-weight: 600;">Easy Hiring</p>
                        

                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, nostrum eaque. Culpa
                            provident corporis vitae qui. Culpa debitis laboriosam voluptates suscipit vitae quidem
                            autem odio quaerat commodi. Officiis perspiciatis fugiat eius, molestiae ratione cum error
                            totam aperiam enim iure, illo obcaecati, atque numquam soluta? Beatae quisquam tempora odio
                            dolorem quo!</p>

                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse, nostrum eaque. Culpa
                            provident corporis vitae qui. Culpa debitis laboriosam voluptates suscipit vitae quidem
                            autem odio quaerat commodi. Officiis perspiciatis fugiat eius, molestiae ratione cum error
                            totam aperiam enim iure, illo obcaecati, atque numquam soluta? Beatae quisquam tempora odio
                            dolorem quo!</p>

                    </div>
                </div>
            </div>
        </section>



        <!-- Section 4 -->
        <section class="py-5 bg-white" id="contact">
            <div class="container">
                <div class="row">

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
                            <button @click="sendMessage" type="submit" class="btn btn-primary my-2" style="background:#3f51b5 !important">
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
    background-image: url('https://img.freepik.com/premium-photo/young-man-sitting-waiting-room-with-folder-hand-before-interview_52137-33723.jpg?size=626&ext=jpg&ga=GA1.2.1448105259.1671379202&semt=sph');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    color: white;
    justify-content: center;


}
</style>