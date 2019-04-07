<template>
    <list v-bind:fields="['event', 'date']" v-bind:appData="appData"></list>
</template>

<script>
import axios from 'axios'
import { API_ENDPOINT, API_ROUTES } from '../conf'
import List from './List.vue'

export default {
    created: function() {
        const URL = `${API_ENDPOINT}/${API_ROUTES.LOGS}`
        axios.get(URL)
            .then(({data}) => data)
            .then(({reply}) => {
                this.appData = reply.map(log => {
                    const ms = parseInt(log.date, 10)
                    const rawDate = new Date(ms)
                    const date = rawDate.toLocaleString('ru')
                    return {event: log.event, date, id: ms}
                })
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
