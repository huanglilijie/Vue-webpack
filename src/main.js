import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Validator from 'vue-validator'
import VueResource from 'vue-resource'
import Alert from './libs/alert'
import Wechatshare from './libs/wechatshare.js'
import SetWechatTitle from './libs/setWechatTitle.js'
/* import router from './router' */
import Golab from './libs/golab.js'
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
    title: 'smart 全家宠爱',
    component: function (resolve) {
      require(['./components/Home.vue'], resolve)
    }
  },
  '/index': {
    name: 'home',
    title: 'smart 全家宠爱',
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
  '/smartpc': {
    name: 'smartpc',
    component: function (resolve) {
      require(['./components/SmartPC.vue'], resolve)
    }
  },
  '/lists': {
    name: 'lists',
    title: '选择宠爱车型',
    component: function (resolve) {
      require(['./components/Lists.vue'], resolve)
    }
  },
  '/whereru': {
    name: 'whereru',
    title: '在哪提车呢',
    component: function (resolve) {
      require(['./components/WhereRU.vue'], resolve)
    }
  },
  '/carpad': {
    name: 'carpad',
    title: '在哪提车呢',
    component: function (resolve) {
      require(['./components/CarPad.vue'], resolve)
    }
  },
  '/user': {
    name: 'user',
    title: '告诉我们你是谁',
    component: function (resolve) {
      require(['./components/User.vue'], resolve)
    }
  },
  '/ruler': {
    name: 'ruler',
    component: function (resolve) {
      require(['./components/Ruler.vue'], resolve)
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
        title: '支付意向金',
        component: function (resolve) {
          require(['./components/ItemPayInfo.vue'], resolve)
        }
      },
      'itempay': {
        name: 'itempay',
        title: '支付意向金',
        component: function (resolve) {
          require(['./components/ItemPay.vue'], resolve)
        }
      },
      'itemSuccess': {
        name: 'itemSuccess',
        title: '支付成功',
        component: function (resolve) {
          require(['./components/ItemSuccess.vue'], resolve)
        }
      }
    }
  },
  '/createmydear': {
    name: 'createmydear',
    title: '创建我的宠爱之旅',
    component: function (resolve) {
      require(['./components/CreateMyDear.vue'], resolve)
    }
  },
  '/dealerlist': {
    name: 'dealerlist',
    title: '我的宠爱之旅',
    component: function (resolve) {
      require(['./components/DealerList.vue'], resolve)
    }
  },
  '/endfundraising': {
    name: 'endfundraising',
    title: '完成筹款',
    component: function (resolve) {
      require(['./components/EndFundraising.vue'], resolve)
    }
  },
  '/completefundraising': {
    name: 'completefundraising',
    title: '完成筹款',
    component: function (resolve) {
      require(['./components/CompleteFundraising.vue'], resolve)
    }
  },
  '/smallfundrais': {
    name: 'smallfundrais',
    title: '完成筹款',
    component: function (resolve) {
      require(['./components/SmallFundrais.vue'], resolve)
    }
  },
  '/fundraising': {
    name: 'fundraising',
    title: '我的宠爱之旅',
    component: function (resolve) {
      require(['./components/FunDraising.vue'], resolve)
    }
  },
  '/orderpayment': {
    name: 'orderpayment',
    title: '我的宠爱之旅',
    component: function (resolve) {
      require(['./components/OrderPayment.vue'], resolve)
    }
  },
  '/orderfundraising': {
    name: 'orderfundraising',
    title: '我的宠爱之旅',
    component: function (resolve) {
      require(['./components/OrderFundraising.vue'], resolve)
    }
  },
  '/orderfundraisingend': {
    name: 'orderfundraisingend',
    title: '我的宠爱之旅',
    component: function (resolve) {
      require(['./components/OrderFundraisingEnd.vue'], resolve)
    }
  },
  '/orderfundraisingfinish': {
    name: 'orderfundraisingfinish',
    title: '我的宠爱之旅',
    component: function (resolve) {
      require(['./components/OrderFundraisingFinish.vue'], resolve)
    }
  },
  '/orderrefunded': {
    name: 'orderrefunded',
    title: '我的宠爱之旅',
    component: function (resolve) {
      require(['./components/OrderRefunded.vue'], resolve)
    }
  },
  '/cancelmydear': {
    name: 'cancelmydear',
    title: '确认取消',
    component: function (resolve) {
      require(['./components/CancelMyDear.vue'], resolve)
    }
  },
  '/refundsubmit': {
    name: 'refundsubmit',
    title: '提交成功',
    component: function (resolve) {
      require(['./components/RefundSubmit.vue'], resolve)
    }
  },
  '/pagechoose': {
    name: 'pagechoose',
    component: function (resolve) {
      require(['./components/pagechoose.vue'], resolve)
    }
  },
  '/friendsdream': {
    name: 'friendsdream',
    title: '',
    component: function (resolve) {
      require(['./components/FriendsDream.vue'], resolve)
    }
  },
  '/rewardsend': {
    name: 'rewardsend',
    title: '打赏',
    component: function (resolve) {
      require(['./components/RewardSend.vue'], resolve)
    }
  },
  '/rewardarrive': {
    name: 'rewardarrive',
    title: '心意已送到',
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
  },
  '/authredirect': {
    name: 'authredirect',
    component: function (resolve) {
      require(['./components/AuthRedirect.vue'], resolve)
    }
  },
  '/listsfullquota': {
    name: 'listsfullquota',
    component: function (resolve) {
      require(['./components/ListsFullQuota.vue'], resolve)
    }
  },
  '/friendsdreamunsubscribe': {
    name: 'friendsdreamunsubscribe',
    component: function (resolve) {
      require(['./components/FriendsDreamUnsubscribe.vue'], resolve)
    }
  }
})
router.beforeEach(function (ref) {
  var sUserAgent = window.navigator.userAgent.toLowerCase()
  var path = document.URL
  console.log('ua:' + sUserAgent)
  console.log('path:' + path)
  console.log(ref.to)
  console.log(ref.from)
  // 判断是否是微信浏览器
  if (sUserAgent.indexOf('micromessenger') < 0) {
    // 判断是否是移动端
    if (sUserAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      router.go({path: '/point'})
    } else {
      router.go({path: '/smartpc'})
    }
  } else {
    // 微信授权 authredirect
    // 如果ref.to.name 不等于authredirect，需要判断用户是否授权
    if (ref.to.name !== 'authredirect') {
      var openid
      // var state
      // 1、打开邀请函链接，判断是本人还是好友
      if (ref.to.name === 'pagechoose') {
        var useropenid = ref.to.query.useropenid
        var useruid = ref.to.query.useruid
        window.sessionStorage.setItem('useropenid', useropenid)
        window.sessionStorage.setItem('useruid', useruid)
        console.log('useropenid:' + useropenid)
        console.log('useruid:' + useruid)
        // 已经获取到用户的openid，不需要授权
        if (window.sessionStorage.getItem('openid') !== null) {
          openid = window.sessionStorage.getItem('openid')
        } else {
          // 需要通过用户授权拉取用户信息
          window.sessionStorage.setItem('openid', Golab.openid)
          openid = window.sessionStorage.getItem('openid')
          // state = 'pagechoose'
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          // Golab.appid + '&redirect_uri=' + Golab.redirect_uri +
          // '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
        }
        console.log('openid:' + openid)
        console.log('useropenid:' + useropenid)
        console.log(openid === useropenid)
        if (openid === useropenid) {
          // 本人访问邀请函
          router.go({path: '/home'})
        }
      } else {
        // 2、打开活动链接
        // 已经获取到用户的openid，不需要授权
        if (window.sessionStorage.getItem('openid') !== null) {
          openid = window.sessionStorage.getItem('openid')
        } else {
          // 需要通过用户授权拉取用户信息
          window.sessionStorage.setItem('openid', Golab.openid)
          openid = window.sessionStorage.getItem('openid')
          // state = 'index'
          // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          // Golab.appid + '&redirect_uri=' + Golab.redirect_uri +
          // '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
        }
      }
    }
    // 微信分享配置加载
    // Wechatshare.install()
    Wechatshare.kong()
  }
  window.scrollTo(0, 0)
  ref.next()
})
router.afterEach(function (transition) {
  let title = transition.to.title
  SetWechatTitle(title)
})
router.redirect({
  '*': '/index'
})
router.start(App, 'app')
