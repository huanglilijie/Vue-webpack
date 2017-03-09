import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Validator from 'vue-validator'
import VueResource from 'vue-resource'
import Alert from './libs/alert'
import Wechatshare from './libs/wechatshare.js'
/* import router from './router' */
import 'assets/css/style.css'
// import Config from '../config/config'
import { Picker } from 'mint-ui'
Vue.component(Picker.name, Picker)

Vue.use(Validator)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Alert)
// Vue.use(Wechatshare)

Vue.http.headers.common['MME-TOKEN'] = window.localStorage.getItem('MME-TOKEN')

Vue.validator('phone', function (val) {
  if (val.length === 0) {
    return true
  }
  if (val.length < 11) {
    return false
  }
  return true
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
  '/authredirect': {
    name: 'authredirect',
    component: function (resolve) {
      require(['./components/AuthRedirect.vue'], resolve)
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
  '/whereru': {
    name: 'whereru',
    component: function (resolve) {
      require(['./components/WhereRU.vue'], resolve)
    }
  },
  '/orderconfirm': {
    name: 'orderconfirm',
    component: function (resolve) {
      require(['./components/OrderConfirm.vue'], resolve)
    }
  },
  '/ruler': {
    name: 'ruler',
    component: function (resolve) {
      require(['./components/Ruler.vue'], resolve)
    }
  },
  '/createmydear': {
    name: 'createmydear',
    component: function (resolve) {
      require(['./components/CreateMyDear.vue'], resolve)
    }
  },
  '/endfundraising': {
    name: 'endfundraising',
    component: function (resolve) {
      require(['./components/EndFundraising.vue'], resolve)
    }
  },
  '/smallfundrais': {
    name: 'smallfundrais',
    component: function (resolve) {
      require(['./components/SmallFundrais.vue'], resolve)
    }
  },
  '/completefundraising': {
    name: 'completefundraising',
    component: function (resolve) {
      require(['./components/CompleteFundraising.vue'], resolve)
    }
  },
  '/carpad': {
    name: 'carpad',
    component: function (resolve) {
      require(['./components/CarPad.vue'], resolve)
    }
  },
  '/orderpayment': {
    name: 'orderpayment',
    component: function (resolve) {
      require(['./components/OrderPayment.vue'], resolve)
    }
  },
  '/orderfundraising': {
    name: 'orderfundraising',
    component: function (resolve) {
      require(['./components/OrderFundraising.vue'], resolve)
    }
  },
  '/orderfundraisingend': {
    name: 'orderfundraisingend',
    component: function (resolve) {
      require(['./components/OrderFundraisingEnd.vue'], resolve)
    }
  },
  '/orderfundraisingfinish': {
    name: 'orderfundraisingfinish',
    component: function (resolve) {
      require(['./components/OrderFundraisingFinish.vue'], resolve)
    }
  },
  '/orderrefunded': {
    name: 'orderrefunded',
    component: function (resolve) {
      require(['./components/OrderRefunded.vue'], resolve)
    }
  },
  '/myfundraising': {
    name: 'myfundraising',
    component: function (resolve) {
      require(['./components/MyFundraising.vue'], resolve)
    }
  },
  '/cancelmydear': {
    name: 'cancelmydear',
    component: function (resolve) {
      require(['./components/CancelMyDear.vue'], resolve)
    }
  },
  '/refundsubmit': {
    name: 'refundsubmit',
    component: function (resolve) {
      require(['./components/RefundSubmit.vue'], resolve)
    }
  },
  '/dealerlist': {
    name: 'dealerlist',
    component: function (resolve) {
      require(['./components/DealerList.vue'], resolve)
    }
  },
  '/fundraising': {
    name: 'fundraising',
    component: function (resolve) {
      require(['./components/FunDraising.vue'], resolve)
    }
  },
  '/friendsdream': {
    name: 'friendsdream',
    component: function (resolve) {
      require(['./components/FriendsDream.vue'], resolve)
    }
  },
  '/rewardsend': {
    name: 'rewardsend',
    component: function (resolve) {
      require(['./components/RewardSend.vue'], resolve)
    }
  },
  '/rewardarrive': {
    name: 'rewardarrive',
    component: function (resolve) {
      require(['./components/RewardArrive.vue'], resolve)
    }
  },
  '/friendsdreamfinish': {
    name: 'friendsdreamfinish',
    component: function (resolve) {
      require(['./components/FriendsDreamFinish.vue'], resolve)
    }
  },
  '/friendsactivityend': {
    name: 'friendsactivityend',
    component: function (resolve) {
      require(['./components/FriendsActivityEnd.vue'], resolve)
    }
  }
})
router.beforeEach(function (ref) {
  var ua = window.navigator.userAgent.toLowerCase()
  var path = document.URL
  console.log('ua:' + ua)
  console.log('path:' + path)
  console.log(ref.to)
  console.log(ref.from)
  if (ua.indexOf('micromessenger') < 0) {
    // 判断只有point非微信浏览器提示页，不做跳转，其他页面均跳转
    router.go({path: '/point'})
  } else {
    // 微信分享配置加载
    // Wechatshare.install()
    Wechatshare.kong()
    // 微信授权
    // var openid = window.sessionStorage.getItem('openid')
    // 已经获取到用户的openid，不需要授权
    // if (openid !== null) {
    // } else {
    //   // 需要通过用户授权拉取用户信息
    //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx836245eaa68afe48&redirect_uri=http%3A%2F%2Fwxtest.beautyyan.cn%2Fauthredirect&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    // }
  }
  window.scrollTo(0, 0)
  ref.next()
})
router.afterEach(function (transition) {

})
router.redirect({
  '*': '/index'
})
router.start(App, 'app')
