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
  padding-top: 40px;
}

.sidebar {
  flex: 1;
  display: flex;
  padding: 24px;
}

.content {
  flex: 3;
  display: flex;
  justify-content: center;
  height: 100vh;
  overflow-y: auto;
}
</style>
