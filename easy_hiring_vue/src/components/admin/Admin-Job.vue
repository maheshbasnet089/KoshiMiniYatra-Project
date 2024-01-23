<template>
  <div>
    <v-row>
      <v-col md="12">
        <div>
          <v-banner class="ma-3">
            <p class="text-h5 indigo--text mb-0">Write your Inside Story</p>
            <span class="caption">Please fill up the below form to post a Blog</span>
          </v-banner>
          <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation @submit.prevent="submitJob">
            <v-text-field v-model="title" label="Title" required></v-text-field>

            <!-- <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
            </quill-editor> -->

            <v-text-field v-model="description" label="Description" required></v-text-field>

            <v-text-field v-model="type" label="Type" required></v-text-field>
            <v-text-field v-model="pricing" label="Pricing" required></v-text-field>


            <v-div>

              <v-select v-model="locationId" :items="locations" item-text="name" item-value="id"
                label="Select a location"></v-select>
            </v-div>
            <v-text-field v-model="level" label="level" required></v-text-field>
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

                <v-div>

                  <v-select v-model="categoryId" :items="items" item-text="name" item-value="id"
                    label="Select a category"></v-select>
                </v-div>

              </v-col>
              <v-col>
                <v-div>

                  <v-file-input v-model="image" label="Upload Cover Image" chips truncate-length="7"></v-file-input>
                </v-div>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-btn :disabled="!valid" color="indigo" small class="mr-4 white--text" type="submit">
                  Post Job
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
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";

// import { quillEditor } from "vue-quill-editor";
import axios from "axios";
import { API_LOCATION } from "../../config/index";

export default {
  components: {
    // quillEditor,
  },
  data: () => ({
    valid: true,

    items: [],
    locations: [],


    nameRules: [
      (v) => !!v || "required",
      (v) => (v && v.length <= 10) || "must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    show1: false,

    level: "",
    pricing: "",
    type: "",
    title: "",
    description: "",
    categoryId: "",
    locationId: "",


    date: null,
    image: null,

    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    checkbox: false,
  }),
  async created() {
    try {


      const response = await axios.get(`${API_LOCATION}/get-all-category`);
      const response2 = await axios.get(`${API_LOCATION}/city`);
      console.log(response2.data)
      this.locations = response2.data.city
      this.items = response.data.category;
      console.log(this.locations)
      // console.log(this.data)
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
    async submitJob() {
      let formData = new FormData()
      formData.append('title', this.title)
      formData.append('image', this.image)
      formData.append('level', this.level)
      formData.append('categoryId', this.categoryId)
      formData.append('lastDate', this.date)
      formData.append('location', this.locationId)
      formData.append('type', this.type)
      formData.append('pricing', this.pricing)
      formData.append('description', this.description)
      formData.append('userId', 1)

      try {

        const response = await axios.post(`${API_LOCATION}/job`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
        alert('Sucessfully Created');
        this.$router.push('/admin-joblist')
        this.data = response.data.job
      } catch (error) {
        alert('Error');
        console.log(error)
      }
    }
  },
};
</script>
