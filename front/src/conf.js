export const API_ENDPOINT = process.env.NODE_ENV === 'production'
    ? 'http://62.109.26.114/redis_api'
    : 'http://localhost:3000'
export const API_ROUTES = {
    EVENT: 'event',
    LOGS: 'logs',
    DATA: 'data'
}
export const EVENTS = {
    LOGIN: 'login',
    ADD_DATA: 'add_data'
}
