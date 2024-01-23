
<template>
    <div>
        <v-card class="ma-10">
            <div class="pa-3">
                <p class="text-h6 indigo--text mb-0 pb-0">Contact List</p>
                <span class="caption">Below you can see all Posted Contacts</span>
            </div>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left">
                                Name
                            </th>
                            <th class="text-left">
                                Email
                            </th>
                            <th class="text-left">
                                Subject
                            </th>
                            <th class="text-left">
                                Message
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in data" :key="item.id">

                            <td> {{ item.name }}</td>
                            <td> {{ item.email }}</td>
                            <td> {{ item.subject }}</td>
                            <td> {{ item.message }}</td>

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
      data: null,
    }
  },
  async created() {
    try {

      const response = await axios.get(`${API_LOCATION}/contact/get-all-contact`);
      console.log(response.data)
      this.data = response.data.contact;
      // console.log(this.data)
    } catch (error) {
      console.log(error)
    }

  },
}
</script>
    