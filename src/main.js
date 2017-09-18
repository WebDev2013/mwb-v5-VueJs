// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
// import VueStrap from 'vue-strap'

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.css'
// import Vuetify from 'vuetify'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.min.css'
import { awaitDevtools, refreshDevtools } from "./common/awaitDevtools";
import VeeValidate from 'vee-validate';
import Toasted from 'vue-toasted';
// import vueKanban from 'vue-kanban'
import vMediaQuery from 'v-media-query'

import App from './App'
import router from './router/routes'
import { store } from './store/store'
import Nav from './nav/Nav'
import Dashboard from './dashboard/Dashboard'
import ValidationsPage from './review-pages/Validations'
import ReferentialsPage from './review-pages/Referentials'
import ClinicsPage from './review-pages/Clinics'

Vue.use(VueResource)
Vue.http.options.root = './static/data/'
// Vue.use(VueStrap)

// Vue.use(VueMaterial.MdCore)
// Vue.use(VueMaterial.MdCard)
// document.body.classList.remove('md-theme-default');  // until vumaterial allows themes to turn off
// Vue.use(Vuetify)

Vue.use(MuseUI)


Vue.use(VeeValidate);
Vue.use(Toasted, {
  position: 'top-right',
})
// Vue.use(vueKanban)
Vue.use(vMediaQuery)

Vue.config.productionTip = false

Vue.component('mwb-navigation', Nav)
Vue.component('mwb-dashboard', Dashboard)
Vue.component('mwb-validations', ValidationsPage)
Vue.component('mwb-referentials', ReferentialsPage)
Vue.component('mwb-clinics', ClinicsPage)

// Ref: https://github.com/vuejs/vue-devtools/issues/124
//      https://gist.github.com/rtfleg/cc159e4f773a8a3d9ec3a0f8ca821464
awaitDevtools()
  .then(bootstrapApp)
  .then(refreshDevtools); // Refresh is required in order to deal with missing component tree and another issues.

function bootstrapApp() {
  /* eslint-disable no-new */
  new Vue({
    el: "#app",
    store,
    router,
    template: '<App/>',
    components: { App },
    created() {
      // Dispatch some actions or make some commits here.
      // All the store changes will be reflected inside devtools :-)
    }
  });
}

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   store,
//   router,
//   template: '<App/>',
//   components: { App },
  // created() {
  //   awaitDevtools()   // <-- just use it in lifecycle hook, refreshDevtools is not needed now of course.
  //     .then(() => {
  //       // Dispatch some actions or make some commits here.
  //       // All the store changes will be reflected inside devtools :-)
  //     });
  // }
// })
