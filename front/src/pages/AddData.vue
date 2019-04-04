<template>
  <main-layout>
    <data-form></data-form>
  </main-layout>
</template>

<script>
import MainLayout from '../layouts/Main.vue'
import DataForm from '../components/DataForm.vue'

export default {
    components: {
        MainLayout,
        DataForm
    }
};
</script>
