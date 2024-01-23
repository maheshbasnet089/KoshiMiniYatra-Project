<template>
  <div>
    <v-row>
      <v-col md="8">
        <div>
          <v-banner class="ma-3">
            <p class="text-h5 indigo--text mb-0">Apply for job</p>
            <span class="caption">Please fill up the below form to apply to job</span>
          </v-banner>
          <v-form class="pa-5 ma-10" ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">

            <p class="subtitle-2 indigo--text mb-0">Write a cover Letter</p>
            <quill-editor v-model="content" ref="myQuillEditor" :rules="[(v) => !!v || 'Cover letter is required']" :options="editorOption" @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)" @ready="onEditorReady($event)">
            </quill-editor>

            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-file-input :rules="fileRule" label="Upload Past Work photo" chips v-model="image"
                  truncate-length="7"></v-file-input>
              </v-col>

              <v-col cols="12" sm="6" md="">
                <v-file-input label="Upload past work Video" :rules="[(v) => !!v || 'You must upload your work video!']"
                  chips v-model="video" truncate-length="7"></v-file-input>
              </v-col>
            </v-row>

            <v-checkbox v-model="checkbox" :rules="[(v) => !!v || 'You must agree to continue!']"
              label="You agree that all the information are valid and true" required></v-checkbox>


            <v-row>
              <v-col>
                <v-btn :disabled="!valid" color="indigo" small class="mr-4 white--text" type="submit">
                  Apply Job
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
      <v-col md="4" style="padding-right: 20px;margin-top: 40px;">

        <v-img :src="imageRight"></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import axios from "axios";
import { API_LOCATION } from "../../config/index";
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor,
  },
  data: () => ({
    valid: true,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    name: "",
    token: null,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    email: "",
    fileRule: [
      (v) => !!v || "File is required",

    ],
    show1: false,

    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
    checkbox: false,
    content: "",
    image: null,
    video: null,
    imageRight: null,
  }),
  async created() {

    const response = await axios.get(`${API_LOCATION}/job/${this.$route.params.id}`);
    console.log(response.data)
    this.imageRight = response.data.result[0].image
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
      this.validate();
      let formData = new FormData()
      formData.append('coverLetter', this.content)
      formData.append('image', this.image)
      formData.append('video', this.video)
      formData.append('jobId', this.$route.params.id)
      // const params = this.$route.params.id

      try {

        const response = await axios.post(`${API_LOCATION}/appliedJob`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
        alert('Job Applied Sucessfully !!')

        this.$router.push('/jobs')
        console.log(response.data)
        this.showSuccess = true
      } catch (error) {
        console.log(error)

      }


    }
  },

};
</script>
