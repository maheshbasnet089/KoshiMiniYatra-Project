<template>
  <div>
    <v-row>
      <v-col md="12">
        <div>
          <v-banner class="ma-3">
            <p class="text-h5 indigo--text mb-0">Write your Inside Story</p>
            <span class="caption">Please fill up the below form to edit a Blog</span>
          </v-banner>
          <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">
            <v-text-field v-model="title"  label="Title" required></v-text-field>

            <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
            </quill-editor>

            <v-text-field v-model="description" label="description" required></v-text-field>

            <v-row>
              <v-col cols="16" sm="6" md="4">
                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                  transition="scale-transition" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="date" label="Picker in menu" prepend-icon="mdi-calendar" readonly
                      v-bind="attrs" v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-file-input v-model="image" label="Upload Image" chips truncate-length="7"></v-file-input>
              </v-col>
              <v-col cols="12" sm="6" md="4">

                <v-div>

                  <v-select v-model="category" :items="items" item-text="name" item-value="id"
                    label="Select a category"></v-select>
                </v-div>

              </v-col>
            </v-row>
            <input type="hidden" v-model="blogid" />

            <v-row>
              <v-col>
                <v-btn :disabled="!valid" color="indigo" small class="mr-4 white--text" type="submit" @click="validate">
                  Update Blog
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import axios from "axios";
import { API_LOCATION } from "../../config/index";


export default {
  components: {
    quillEditor,
  },
  data: () => ({
    items: [],
    blogs : [],
    title: "",
    description: "",
    category: "",
    image: "",
    date: "",

    valid: true,

    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,

    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    checkbox: false,
  }),
  async created() {
    try {

// console.log(this.$route.params.id)
      if (this.$route.params.id) {
        this.blogId = this.$route.params.id;
        // If an ID is present, fetch the existing blog post data
        const res = await axios.get(`${API_LOCATION}/blog/edit/${this.blogId}`);
        const existingBlog = res.data.blog;

        // Set the form fields with the existing data
        this.title = existingBlog.title;
        this.description = existingBlog.description;
        this.content = existingBlog.content;
        this.category = existingBlog.category;
        this.image = existingBlog.image;
        this.date = existingBlog.date;
        this.blogid =this.blogId;
        // ... set other fields accordingly

      }


      const response = await axios.get(`${API_LOCATION}/get-all-category`);

      this.items = response.data.category;

    } catch (error) {
      console.log(error)
    }

  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    async submitForm() {
      const blogId = this.blogid;
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('content', this.content)

      formData.append('image', this.image)
      formData.append('description', this.description)
      formData.append('category', this.category)
      formData.append('date', this.date)

      console.log(formData)
      try {

        const response = await axios.put(`${API_LOCATION}/blog/edit/${blogId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
        
        this.data = response.data.job
        alert('Blog Updated Sucessfully !!')

      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>
