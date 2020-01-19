import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import rutas from './routes.js';
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-search-select/dist/VueSearchSelect.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueSweetalert2 from 'vue-sweetalert2';
import Vuelidate from 'vuelidate'
import Datepicker from 'vuejs-datepicker';



Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(VueGoodTablePlugin);
Vue.component('modal', {
  template: '#modal-template'
});

Vue.component('datepicker', Datepicker);



Vue.config.productionTip = false

new Vue({
  router: rutas,
  render: h => h(App),
}).$mount('#app')
