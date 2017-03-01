<template>
  <div class="item-success">
    <p class="pay_mon">支付订金：{{pageParam.carIntentionFee}} 元</p>
    <div class="pay_success">
    	<p>已成功预订 即刻开启筹款</p>
	    <p>距离活动结束还有<span>{{dates}}</span>天</p>
	    <p>快去筹款吧！</p>
	  </div>
	  <div>
	 		<p class="btn-footer-1" @click="jump">马上行动</p>
	 		<p class="btn-footer-2" @click="orderDetail">查看详情</p>
	  </div>

  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  import Golab from '../libs/golab'
  export default {
    name: 'item-success',
    data () {
      var nd = new Date()
      var ld = new Date(Golab.endDate)
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      if (dates <= 0) {
        dates = 0
      }
      return {
        dates: dates,
        pageParam: {}
      }
    },
    created () {
      // 获取页面传参
      var orderId = this.$route.query.orderId
      var carName = this.$route.query.carName
      var carIntentionFee = this.$route.query.carIntentionFee
      var dealerName = this.$route.query.dealerName
      var dealerTelephone = this.$route.query.dealerTelephone
      var param = {
        orderId: orderId,
        carName: carName,
        carIntentionFee: carIntentionFee,
        dealerName: dealerName,
        dealerTelephone: dealerTelephone
      }
      this.$set('pageParam', param)
    },
    methods: {
      jump () {
        this.$router.go({
          name: 'createmydear',
          query: this.pageParam})
      },
      orderDetail () {
        this.$router.go({
          name: 'orderpayment',
          query: this.pageParam})
      }
    },
    components: {
      'btn-footer': Btn
    }
  }
</script>

<style scoped>
.item-success{
	margin-top:15px ;
}
.pay_success{
	text-align: center;
	line-height:40px;
	margin-top:20px ;
}
.pay_success p:nth-child(1){
	font-size: 20px;
	font-weight: 700;
}
.pay_success p:nth-child(2) span{
	font-size: 16px ;
	font-weight: 700;
}
.pay_success p:nth-child(3){
	font-size:20px ;
	font-weight: 700;
}
 .btn-footer-1{
    position: fixed;
    bottom:55px;
    left: 5%;
    width: 90%;
    border-radius:10px;
    padding: 10px 0;
    background-color: #F6BA35;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }
  .btn-footer-2{
  	 position: fixed;
    bottom:0;
    left: 5%;
    width: 90%;
    border-radius:10px;
    padding: 10px 0;
    background-color:#7FC782;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }
  .pay_mon{
  	width: 90%;
		margin: 0 auto;
		font-size: 16px;
  }
</style>
