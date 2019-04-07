import Vue from 'vue'
import axios from 'axios'
import routes from './routes'
import {
    API_ENDPOINT,
    API_ROUTES,
    EVENTS
} from './conf'

const app = new Vue({
    el: '#app',
    data: {
        currentRoute: window.location.pathname
    },
    computed: {
        ViewComponent() {
            const matchingView = routes[this.currentRoute]
            return matchingView
                ? require('./pages/' + matchingView + '.vue')
                : require('./pages/404.vue')
        }
    },
    created: function() {
        const URL = `${API_ENDPOINT}/${API_ROUTES.EVENT}/${EVENTS.LOGIN}`
        const options = {headers: {'Content-Type': 'application/json'}}
        axios.post(URL, null, options)
            .then(() => console.log('Logged in'))
            .catch((err) => console.error(err.message))
    },
    render(h) {
        return h(this.ViewComponent)
    }
})

window.addEventListener('popstate', () => {
    app.currentRoute = window.location.pathname
})
