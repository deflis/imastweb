declare module 'store/dist/store.modern' {
    import store from 'store'
    export default store
}

declare module '*/appconfig' {
    class AppConfig {
        host: string
        imast: string
        client_name: string
        client_id: string
        client_secret: string
    }
    export default new AppConfig
}
