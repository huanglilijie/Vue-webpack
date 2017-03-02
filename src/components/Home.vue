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
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  import Vue from 'vue'
  export default {
    name: 'smart-family',
    methods: {
      submit () {
        // 判断活动名额是否已满
        this.$http.get(Config.API_ROOT + 'ecommerce/orders-number')
        .then((response) => {
          var ordersNumber = response.data
          if (ordersNumber >= Golab.activequota) {
            this.$router.go({path: '/listsfullquota/'})
          } else {
            this.$router.go({path: '/lists/', query: {uid: this.uid}})
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    },
    data: function () {
      // 判断活动是否开始
      var nd = new Date()
      var sd = new Date(Golab.startDate)
      if (sd.getTime() > nd.getTime()) {
        this.$alert('活动未开始')
      }
      // 判断是否在活动期内
      var ld = new Date(Golab.endDate)
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      if (dates <= 0) {
        dates = 0
      }
      if (dates === 0) {
        return {
          is_in_activity: false,
          uid: null
        }
      } else {
        return {
          is_in_activity: true,
          uid: null
        }
      }
    },
    ready: function () {
      // 二、判断用户是否存在订单信息
      // 1、根据openid获取用户的uid(uid是在用户注册的时候产生的)
      this.$http.get(Config.API_ROOT + 'ecommerce/user/wechat-user/' + Golab.openid)
      .then((response) => {
        console.log(response)
        var data = response.data
        // 2、根据uid获取用户的最新订单
        window.localStorage.setItem('uid', data.uid)
        console.log('localStorage:' + window.localStorage.getItem('uid'))
        var uid = data.uid
        if (uid != null) {
          Golab.uid = uid
          this.uid = uid
          console.log(response.headers)
          console.log(response.headers.map['MME-TOKEN'])
          if (response.headers.map['MME-TOKEN']) {
            console.log(response.headers.map['MME-TOKEN'][0])
            Vue.http.headers.common['MME-TOKEN'] = response.headers.map['MME-TOKEN'][0]
          }
          this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + uid + '/orders')
          .then((response) => {
            console.log(response)
            var orderInfo = response.data
            if (response.data != null) {
              var orderStatus = orderInfo.orderStatus
              // 当我有一个未支付的订单，再次进入活动时，我可以直接看到支付选择页
              if (orderStatus === 'WAITING_FOR_PAYMENT') {
                this.$router.go({name: 'itempay', query: {orderId: orderInfo.reservationId, carName: orderInfo.product.name, dealerName: orderInfo.dealer.name, dealerTelephone: orderInfo.dealer.telephone, carIntentionFee: orderInfo.product.intentionFee, dealerCode: orderInfo.dealer.code}})
              }
              // 支付完成后未创建筹款页，再次进入活动会直接进入创建邀请函
              if (orderStatus === 'PAID') {
                var param = {
                  orderId: orderInfo.reservationId
                }
                this.$router.go({path: '/createmydear', query: param})
              }
              // 当我开始筹款，我进入活动入口可以默认浏览筹款进度页
              if (orderStatus === 'FUNDING') {
                this.$router.go({path: '/dealerlist', query: {orderId: orderInfo.reservationId}})
              }
              // 当筹款完成或活动结束，我进入活动可以默认显示已完成的筹款进度页
              if (orderStatus === 'FUNDED') {
                this.$router.go({path: '/fundraising', query: {orderId: orderInfo.reservationId}})
              }
              // 当我在退款中的状态进入活动，默认显示退款中的订单详情页
              if (orderStatus === 'REFUNDING') {
                this.$router.go({path: '/orderrefunded', query: {reservationId: orderInfo.reservationId}})
              }
            } else {
              // 在未存在订单的情况下通过活动入口进入活动，可以正常浏览活动首页
            }
          }).catch((response) => {
            console.log(response)
          })
        }
      }).catch((response) => {
        console.log(response)
      })
    }
  }
</script>

<style scoped>
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
