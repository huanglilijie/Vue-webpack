import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Alert from './libs/alert'
/* import router from './router' */
import 'assets/css/style.css'

Vue.use(VueRouter)
Vue.use(Alert)
const router = new VueRouter({
  hashbang: false,
  history: true
})

router.map({
  '/': {
    name: 'home',
    component: function (resolve) {
      require(['./components/Home.vue'], resolve)
    }
  },
  '/index': {
    name: 'home',
    component: function (resolve) {
      require(['./components/Home.vue'], resolve)
    }
  },
  '/point': {
    name: 'point',
    component: function (resolve) {
      require(['./components/Point.vue'], resolve)
    }
  },
  '/lists': {
    name: 'lists',
    component: function (resolve) {
      require(['./components/Lists.vue'], resolve)
    }
  },
  '/user': {
    name: 'user',
    component: function (resolve) {
      require(['./components/User.vue'], resolve)
    }
  },
  '/item/:token': {
    name: 'item',
    component: function (resolve) {
      require(['./components/Item.vue'], resolve)
    },
    children: [
      {
        path: 'itempay',
        component: function (resolve) {
          require(['./components/ItemPay.vue'], resolve)
        }
      },
      {
        path: 'itemSuccess',
        component: function (resolve) {
          require(['./components/ItemSuccess.vue'], resolve)
        }
      }
    ]
  }
})

router.start(App, 'app')
