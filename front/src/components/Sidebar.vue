<template>
  <nav>
    <ul class="nav flex-column">
      <li class="nav-item">
        <v-link href="/logs">Logs</v-link>
      </li>
      <li>
        <v-link href="/data">Data</v-link>
      </li>
      <li>
        <v-link href="/addData">Add Data</v-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import VLink from "./VLink.vue";

export default {
  components: {
    VLink
  }
};
</script>

