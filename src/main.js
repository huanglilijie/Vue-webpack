import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Validator from 'vue-validator'
import VueResource from 'vue-resource'
import Alert from './libs/alert'
/* import router from './router' */
import 'assets/css/style.css'

Vue.use(Validator)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Alert)

Vue.validator(
  'phone', function (val) {
    if (val.length === 0) {
      return true
    } else {
      return /^1[34578]\d{9}$/.test(val)
    }
  })

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
  '/listsfullquota': {
    name: 'listsfullquota',
    component: function (resolve) {
      require(['./components/ListsFullQuota.vue'], resolve)
    }
  },
  '/user': {
    name: 'user',
    component: function (resolve) {
      require(['./components/User.vue'], resolve)
    }
  },
  '/item': {
    name: 'item',
    component: function (resolve) {
      require(['./components/Item.vue'], resolve)
    },
    subRoutes: {
      'itempayinfo': {
        name: 'itempayinfo',
        component: function (resolve) {
          require(['./components/ItemPayInfo.vue'], resolve)
        }
      },
      'itempay': {
        name: 'itempay',
        component: function (resolve) {
          require(['./components/ItemPay.vue'], resolve)
        }
      },
      'itemSuccess': {
        name: 'itemSuccess',
        component: function (resolve) {
          require(['./components/ItemSuccess.vue'], resolve)
        }
      }
    }
  },
  'whereru': {
    name: 'whereru',
    component: function (resolve) {
      require(['./components/WhereRU.vue'], resolve)
    }
  },
  'orderconfirm': {
    name: 'orderconfirm',
    component: function (resolve) {
      require(['./components/OrderConfirm.vue'], resolve)
    }
  },
  'ruler': {
    name: 'ruler',
    component: function (resolve) {
      require(['./components/Ruler.vue'], resolve)
    }
  },
  'myfundraising': {
    name: 'myfundraising',
    component: function (resolve) {
      require(['./components/MyFundraising.vue'], resolve)
    }
  }
})
router.redirect({
  '*': '/index'
})
router.start(App, 'app')
