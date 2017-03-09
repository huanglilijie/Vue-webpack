import Vue from 'vue'
// import $ from 'webpack-zepto'
import Config from '../../config/config'
import VueResource from 'vue-resource'
import Golab from './golab'
import wx from 'wx'
Vue.use(VueResource)
/**
 * 微信分享配置
 */
export default {
  kong () {
    // ceshi
  },
  install () {
    var path = document.URL
    var localurl = window.location.href.split('#')[0]
    var nonceStr = Math.random().toString(36).substr(2, 16)
    var timestamp = parseInt(new Date().getTime() / 1000) + ''
    console.log(localurl)
    console.log(nonceStr)
    console.log(timestamp)
    var signature
    Vue.http.post(Config.API_ROOT + 'ecommerce/user/get-signature', {noncestr: nonceStr, timestamp: timestamp, url: localurl})
    .then((response) => {
      signature = response.data.signature
      console.log(response)
    }).catch((response) => {
      console.log(response)
      // token失效重新获取
      Vue.http.get('/wechatagent/cgi-bin/token?grant_type=client_credential&appid=' + Golab.appid + '&secret=' + Golab.appsecret)
      .then((response) => {
        var accesstoken = response.data.access_token
        console.log(response)
        // 使用access_token获取api_ticket
        Vue.http.get('/wechatagent/cgi-bin/ticket/getticket?access_token=' + accesstoken + '&type=jsapi')
        .then((response) => {
          var jsapiticket = response.data.ticket
          console.log(response)
          // 将获取的access_token/jsapi_ticket,存储到服务器
          Vue.http.post(Config.API_ROOT + 'ecommerce/user/set-signature', {jsapi_ticket: jsapiticket, access_token: accesstoken})
          .then((response) => {
            console.log(response)
            // 再次获取签名
            Vue.http.post(Config.API_ROOT + 'ecommerce/user/get-signature', {noncestr: nonceStr, timestamp: timestamp, url: localurl})
            .then((response) => {
              signature = response.data.signature
              console.log(response)
            }).catch((response) => {
              console.log(response)
            })
          }).catch((response) => {
            console.log(response)
          })
        }).catch((response) => {
          console.log(response)
        })
      }).catch((response) => {
        console.log(response)
      })
    })
    console.log(signature)
    // 注入微信分享配置
    wx.config({
      // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: Golab.appid, // 必填，公众号的唯一标识
      timestamp: 1488988911, // 必填，生成签名的时间戳
      nonceStr: nonceStr, // 必填，生成签名的随机串
      signature: signature, // 必填，签名，见附录1
      jsApiList: ['checkJsApi', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareQZone'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function (res) {
          // 以键值对的形式返回，可用的api值true，不可用为false
          // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        }
      })
      var title = 'smart全家宠爱'
      var desc = '生活不止有眼前的路还有smart和远方'
      var linkurl
      if (path.indexOf('/dealerlist') > 0) {
        linkurl = 'http://wxtest.beautyyan.cn/friendsdream?openid=oZx0fwPMqq5eHRR2tRBSE9YtqD5w'
      } else {
        linkurl = 'http://wxtest.beautyyan.cn'
      }
      var imgUrl = 'http://wxtest.beautyyan.cn/static/images/fenxianglogo.png'
      // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: linkurl, // 分享链接
        imgUrl: imgUrl, // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // alert('success')
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      })
      // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: linkurl, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
      })
      // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: linkurl, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
           // 用户确认分享后执行的回调函数
        },
        cancel: function () {
           // 用户取消分享后执行的回调函数
        }
      })
      // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: linkurl, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
           // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
      })
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    })
    wx.error(function (res) {
      console.log(res)
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    })
  }
}
