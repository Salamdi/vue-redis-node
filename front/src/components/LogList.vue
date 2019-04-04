<template>
    <list v-bind:fields="['event', 'date']" v-bind:appData="appData"></list>
</template>

<script>
import { API_ENDPOINT, API_ROUTES } from '../conf'
import List from './List.vue'

export default {
    created: function() {
        const URL = `${API_ENDPOINT}/${API_ROUTES.LOGS}`
        fetch(URL, {
            'Content-Type': 'application/json'
        })
            .then(res => res.json())
            .then(({reply}) => {
                this.appData = reply.map(log => {
                    const ms = parseInt(log.date, 10)
                    return {event: log.event, date: new Date(ms), id: ms}
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

