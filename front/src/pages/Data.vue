<template>
  <main-layout>
    <data-list></data-list>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import DataList from '../components/DataList.vue'

export default {
    components: {
        MainLayout,
        DataList
    }
};
</script>
