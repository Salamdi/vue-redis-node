<template>
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>{{fields[0] | capitalize }}</th>
        <th>{{fields[1] | capitalize }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in appData" v-bind:key="row.id">
        <td>{{row[fields[0]]}}</td>
        <td>{{row[fields[1]]}}</td>
      </tr>
      <tr>
          <th colspan="2" v-if="!appData.length">No Data yet...</th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { API_ENDPOINT, API_ROUTES } from "../conf";

export default {
  props: ["appData", "fields"],
  filters: {
    capitalize(value) {
      return value[0].toUpperCase() + value.slice(1);
    }
  }
};
</script>

