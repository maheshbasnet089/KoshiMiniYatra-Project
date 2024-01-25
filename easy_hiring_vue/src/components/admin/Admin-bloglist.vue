<template>
    <div>
        <v-card class="ma-10">
            <div class="pa-3">
                <p class="text-h6 indigo--text mb-0 pb-0">Blog List</p>
                <span class="caption">Below you can see all Posted Blogs</span>
            </div>
            <div class="d-flex justify-end mr-10">
                <v-btn color="blue" @click="$router.push('/admin-blog-add')">Add Blog</v-btn>
            </div>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Title
                            </th>
                            <th class="text-left">
                                Date
                            </th>
                            <th class="text-left">
                                Image
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in blogs" :key="item.id">
                            <td>{{ item.title }}</td>
                            <td>{{ item.date }}</td>
                            <td><img :src="item.image" alt="" width="50"></td>
                            <td> <v-btn small class="ma-2" @click="deleteJob(item.id)">
                                    <v-icon small color="red">mdi-cancel</v-icon>
                                </v-btn>
                               

                                <v-btn small class="ma-2" @click="$router.push(`/blog-edit/${item.id}`)"> <v-icon small color="blue">mdi-pen</v-icon> </v-btn>
                            </td>

                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';
import { API_LOCATION } from "../../config/index";
export default {
    data() {
        return {
            blogs: []
        }
    },
    async created() {
        try {

            const response = await axios.get(`${API_LOCATION}/blog`);

            console.log(response.data)
            this.blogs = response.data.blog;

        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        async deleteJob(jobId) {
            try {
                await axios.delete(`${API_LOCATION}/blog/${jobId}`);
                // remove the city from the data array

            } catch (error) {
                console.log(error);
            }
        },
        // async editBlog(bid) {
        //     try {
        //         await axios.get(`${API_LOCATION}/blog-edit/${bid}`);
        //         // remove the city from the data array

        //     } catch (error) {
        //         console.log(error);
        //     }
        // },
    }
}
</script>
  
  