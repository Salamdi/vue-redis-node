<template>
  <main-layout>
    <logs-list></logs-list>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import LogsList from '../components/LogList.vue'

export default {
  components: {
    MainLayout,
    LogsList
  }
};
</script>
