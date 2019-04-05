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
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.sidebar {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
