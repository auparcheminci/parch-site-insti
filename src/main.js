import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
library.add(faUserSecret)

/* import specific icons */
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons'
library.add(faCircleMinus)
/* import specific icons */
import { faHandPointer } from '@fortawesome/free-solid-svg-icons'
library.add(faHandPointer)



import './assets/main.css'

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')