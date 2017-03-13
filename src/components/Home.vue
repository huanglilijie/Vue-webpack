<template>
  <title>smart 全家宠爱</title>
  <div id='smart-family' v-if='is_in_activity'>
    <img class='smart-familyimg' src='/static/smart-faimily.jpg'>
      <div v-if='checks'>
        <div class="mask"></div>
        <div class="pump">
          <img src="/static/pump.png"/>
          <p>活动还没开始，请{{startmonth}}月{{startdate}}日再准时来参加！</p>
          <a class="mask-submit" @click="pumpshow()">确定</a>
        </div>
      </div>
      <img class='smart-familybtn' src='/static/family-btn.png' @click='submit()'>
      <div class="home-say">
        <div class="home-title">
          活动规则
        </div>
        <div class="home-say-content">
          <p><i>1.</i><span>用户需支付666元订金开启活动,订金将在成功众筹并购车时抵扣购车款。</span></p>
          <p><i>2.</i><span>用户需分享众筹链接到朋友圈或发送给好友,邀请好友以现金红包形式支持该用户购车。众筹款项将于众筹结束并购车时抵扣购车款。</span></p>
          <p><i>3.</i><span>用户邀请帮助自己众筹购车的人数不限,但众筹总金额不超过8800元。</span></p>
          <p class="specialP"><i>4. 奖励政策:</i>
            <span>众筹金额大于等于1000元且小于3000元,将获得1000元补贴奖励;</span>
            <span>众筹金额大于等于3000元且小于5000元,将获得1500元补贴奖励;</span>
            <span style="width:auto">众筹金额大于等于5000元且小于等于8800元,将获得2000元购车补贴奖励;</span>
            <span>注:补贴奖励可在购车时抵扣购车款。</span></p>
          <p><i>5.</i><span>用户可在活动期随时结束众筹并购车,结束时众筹款项、订金、补帖(如果有)将于购车时抵扣购车款。如果未手动结束众筹活动到期或筹款额满后,将自动结束众筹,等待用户到店。</span></p>
          <p><i>6.</i><span>用户可在未提车前取消众筹,取消后订金和好友支付的众筹款项将退回帐户,您将无法获得任何补贴。</span></p>
          <p><i>7.</i><span>活动名额仅限400人,支付订金成功后即表示参加。</span></p>
          <p><i>8.</i><span>活动时间：4月1日 – 4月30日。活动时间到后,所有未筹满款的用户将自动筹款结束。</span></p>
          <p><i>9.</i><span>本活动最终解释权归戴姆勒-奔驰公司所有。</span></p>
        </div>
      </div>

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
      pumpshow () {
        this.checks = !this.checks
      },
      submit () {
        // 判断活动是否开始
        var nd = new Date()
        var sd = new Date(Golab.startDate)
        if (sd.getTime() > nd.getTime()) {
          var month = sd.getMonth() + 1
          var date = sd.getDate()
          // month = month < 10 ? '0' + month : month
          date = date < 10 ? '0' + date : date
          this.$set('startmonth', month)
          this.$set('startdate', date)
          this.$set('checks', true)
          return false
        }
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
      // var sd = new Date(Golab.startDate)
      // if (sd.getTime() > nd.getTime()) {
      //   this.$alert('活动还未开始')
      // }
      // 判断是否在活动期内
      var ld = new Date(Golab.endDate)
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      var isinactivity
      if (dates <= 0) {
        dates = 0
        isinactivity = false
      } else {
        isinactivity = true
      }
      return {
        is_in_activity: isinactivity,
        uid: null,
        checks: false,
        startmonth: null,
        startdate: null
      }
    },
    ready: function () {
      console.log('根据openid获取用户信息')
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
            window.localStorage.setItem('MME-TOKEN', response.headers.map['MME-TOKEN'][0])
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
                this.$router.go({name: 'itempay', query: {orderId: orderInfo.reservationId, carName: orderInfo.product.name, dealerName: orderInfo.dealer.name, dealerTelephone: orderInfo.dealer.telephone, carIntentionFee: orderInfo.intentionFee, dealerCode: orderInfo.dealer.code}})
              }
              // 支付完成后未创建筹款页，再次进入活动会直接进入支付成功的订单详情页
              if (orderStatus === 'PAID') {
                var param = {
                  orderId: orderInfo.reservationId,
                  carName: orderInfo.product.name,
                  carIntentionFee: orderInfo.intentionFee
                }
                this.$router.go({path: '/orderpayment', query: param})
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
              // 当我在退款完成的状态进入活动，默认显示退款中的订单详情页
              if (orderStatus === 'REFUNDED') {
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
  display: block;
}
.smart-familybtn{
	width: 50%;
	position: absolute;
	bottom: 40%;
	left:25% ;
}
.home-say{
  position: absolute;
  bottom:.1rem;
  font-family: '微软雅黑';
  /*height: 40%;*/
  font-size:.33rem
}
.home-say .home-title{
  text-align: center;
  padding: .1rem;
  width: 3rem;
  margin-bottom: .2rem;
  background: url(/static/images/home-title.png) no-repeat;
  background-size: 100% 100%;
  color:#fff;
  font-size:.5rem;
}
.home-say-content{
  width: 90%;
  margin:0 auto;
  word-wrap: break-word;
  padding: .5rem 0;
  background-color: rgba(255,255,255,.3);
  border-radius: .5rem;
}
.home-say-content i{
  font-style: normal;
  margin-right: .2rem;
}
.home-say-content span{
  text-align: left;
}
.home-say-content p{
  /*padding:.2rem 0;*/
  display: flex;
  width: 93%;
  margin:0 auto;
}
.home-say-content p.specialP{
  display: block;
}
.home-say-content p.specialP i{
  float: left;
}
.home-say-content p.specialP span{
  display: inline-block;
  width: 100%;
  /*text-indent: 1em;*/
  padding-left: 1em;
  letter-spacing: 0;
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
}
.pump{
  width: 85%;
  margin: 0 auto;
  position: fixed;;
  top: 5vh;
  left: 7.5%;
  z-index: 3;
}
.pump img{
  display: block;
  width: 100%;
}
.pump p{
  position: absolute;
  width: 80%;
  text-align: center;
  left: 10%;
  top: 23vh;
  font-size: .6rem;
  color: #000000;
  font-weight: 600;
}
.pump a{
  position: absolute;
  width: 60%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  left: 20%;
  top: 23vh;
  border: 2px dashed #FFFFFF;
  border-radius: 5px;
  text-decoration: none;
  color: #000000;
  font-size: .6rem;
  font-weight: 600;
}
.mask-submit{
  margin-top: 70px;
}
</style>
