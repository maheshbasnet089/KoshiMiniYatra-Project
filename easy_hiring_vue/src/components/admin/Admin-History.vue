<template>
  <div>
    <v-card>
      <div class="pa-3">
        <p class="text-h6 indigo--text mb-0 pb-0">Recent Posted Jobs</p>
        <span class="caption">Below you can see al the recently posted Jobs</span>
      </div>
      <v-simple-table height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Salary
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in jobs" :key="item.name">
              <td>{{ item.title }}</td>
              <td>

                <p class="pa-0 ma-0" v-if="item.pricing !== null && typeof item.pricing !== 'undefined'"><span
                    style="font-weight: 500 ;">Salary:</span>{{ item.pricing }}</p>
                <p class="pa-0 ma-0" v-else><span style="font-weight: 500 ;">Salary:</span>{{ item.salary.name }}
                </p>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
import { API_LOCATION } from "../../config/index";
export default {
  data() {
    return {

      jobs: []
    }
  },
  async created() {
    const response2 = await axios.get(`${API_LOCATION}/job`)

    this.jobs = response2.data.result
    

  }
}
</script>

