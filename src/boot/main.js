import { boot } from 'quasar/wrappers'
import axios from '../plugins/axios.js'

export default boot(async ({ app, }) => {
  app.use(axios, {
    baseUrl: process.env.VUE_APP_BACKEND_URL,
  })
})
