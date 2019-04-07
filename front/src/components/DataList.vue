<template>
    <list v-bind:fields="['title', 'text']" v-bind:appData="appData"></list>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINT, API_ROUTES } from '../conf'
import List from './List.vue'

export default {
    created: function() {
        const URL = `${API_ENDPOINT}/${API_ROUTES.DATA}`
        axios.get(URL)
            .then(({data}) => data)
            .then(({reply}) => {
                this.appData = reply.map(data => {
                    data.id = Math.random().toString(36).slice(2)
                    return data;
                });
            })
            .catch(err => console.error(err))
    },
    components: {
        List
    },
    data() {
        return {
            appData: []
        }
    }
}
</script>

