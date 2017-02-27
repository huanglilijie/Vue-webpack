<template>
  <div id='smart-family' v-if='is_in_activity'>
    <img class='smart-familyimg' src='/static/smart-faimily.jpg'>
      <img class='smart-familybtn' src='/static/family-btn.png' @click='submit()'>
  </div>
  <div id='smart-family' v-else>
    <img class='smart-familyimg' src='/static/smart-family-over.jpg'/>
  </div>
</template>

<script>
  // import Config from '../../config/config'
  // import Golab from '../libs/golab'
  export default {
    name: 'smart-family',
    methods: {
      submit () {
        console.log(new Date())
        this.$router.go({path: '/lists/'})
      }
    },
    data: function () {
      // 判断是否在活动期内
      var nd = new Date()
      var ld = new Date('2017-04-30')
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      if (dates <= 0) {
        dates = 0
      }
      if (dates === 0) {
        return {
          is_in_activity: false
        }
      } else {
        return {
          is_in_activity: true
        }
      }
    },
    ready: function () {
      // 一、判断是否微信浏览器打开，需要确认这个判断放在哪个页面，也就是活动的入口
      var ua = window.navigator.userAgent.toLowerCase()
      if (!ua.indexOf('micromessenger') < 0) {
        this.$router.go({path: '/point/'})
      }
      // 二、判断用户是否存在订单信息
      // 1、根据openid获取用户的userid
      /* this.$http.post(Config.API_ROOT + 'ecommerce/user/wechat-user/' + Golab.openid)
      .then((response) => {
        var data = response.data
        // 2、根据userid获取用户的最新订单
        var userid = data.userid
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + userid + '/orders/')
        .then((response) => {
          var orderInfo = response.data
          if (response.data != null) {
            var orderStatus = orderInfo.orderStatus
            // 待支付订单，跳转到选择付款方式页
            if (orderStatus === 'WAITING_FOR_PAYMENT') {
              this.$router.go({name: 'itempay', query: {orderId: orderInfo.reservationId, carName: orderInfo.product.name, dealerName: orderInfo.dealer.name, dealerTelephone: orderInfo.dealer.telephone, carIntentionFee: orderInfo.product.intentionFee}})
            }
            // 已付款订单，跳转到支付成功页
            if (orderStatus === 'PAID') {
              this.$router.go({path: '/item/itemSuccess'})
            }
            // 筹款中订单，跳转到筹款进度页面
            if (orderStatus === 'FUNDING') {
              this.$router.go({path: '/myfundraising'})
            }
          } else {
            // 客户无订单进入活动首页，不做任何跳转
          }
        }).catch((response) => {
          console.log(response)
        })
      }).catch((response) => {
        console.log(response)
      })*/
    }
  }
</script>

<style>
*{
	margin: 0;
	padding: 0;
}
html,body{
	font-family: '微软雅黑';
}
#smart-family {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
.smart-familyimg{
	width: 100%;
}
.smart-familybtn{
	width: 50%;
	position: absolute;
	bottom: 41%;
	left:25% ;
}
</style>
