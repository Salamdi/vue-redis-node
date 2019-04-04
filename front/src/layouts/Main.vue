<template>
  <div class="container">
    <div class="sidebar">
      <sidebar></sidebar>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Sidebar
  }
};
</script>

<style scoped>
.container {
  display: flex;
}

.sidebar {
    flex: 1;
}

.content {
    flex: 3;
}
</style>
