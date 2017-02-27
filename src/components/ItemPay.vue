<template>
  <div class="item-pay">
  	<div class="item_pay_money">
  		<p>需支付金额</p>
	  	<p><span>{{pageParam.carIntentionFee}}</span>元</p>
	  	<p>订金可抵购车款。取消订单订金退还支付账户.</p>
  	</div>
    <div class="item_pay_way">
      <div class="pay-style">
      	<label><img src="/static/images/alipay.png"/></label><input type="radio" value="alipay" v-model="paytype">
      </div>
      <div class="pay-style">
      	<label><img src="/static/images/wechatpay.png"/></label><input type="radio" value="wechat" v-model="paytype">
      </div>
    </div>
   	<p class="agreen">
   		<span>我同意</span><a href="">意向金规则</a><input type="checkbox" v-model="state"/>
   	</p>
    <btn-footer :is-item-selected="selectedItem">开启宠爱之旅</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  // let rst = {}

  export default {
    name: 'item-pay',
    data () {
      return {
        paytype: '',
        selectedItem: null,
        state: false,
        pageParam: {}
      }
    },
    components: {
      'btn-footer': Btn
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
      // 向服务器请求数据，返回结果如下
      // this.rst = {pname: carName, dealer: dealerName, price: carIntentionFee, photonum: dealerTelephone}
    },
    watch: {
      paytype () {
        this.selectedItem = true
      }
    },
    methods: {
      // 选中后页面跳转
      submit () {
        if (!this.selectedItem) {
          this.$alert('请选择支付方式')
          return false
        }
        if (!this.state) {
          this.$alert('请先阅读意向金规则')
          return false
        }
        // 这里发起支付请求
        // 请求成功后跳转到下个路由
        // 注意要使用token防止重复下单
        // 需要调用支付接口
        this.$router.go({
          path: '/item/itemSuccess',
          query: this.pageParam
        })
      }
    }
  }
</script>

<style>
.item-pay{
	margin-top: 15px;
}
.item_pay_money p{
	text-align: center;
	font-size:18px;
}
.item_pay_money p:nth-child(2){
	margin-top: 5px;
}
.item_pay_money p:nth-child(2) span{
	font-size:30px;
	font-weight: 700;
}
.item_pay_money p:nth-child(3){
	font-size:14px;
	margin-top: 5px;
}
.item_pay_way{
	margin-top: 10px;
}
.item_pay_way>div:nth-child(1){
	overflow: hidden;
	border-top:1px rgba(0,0,0,0.5) solid;
	border-bottom: 1px rgba(0,0,0,0.5) solid;
	height:40px;
	line-height:40px;
}
.item_pay_way>div:nth-child(2){
	border-bottom: 1px rgba(0,0,0,0.5) solid;
		height:40px;
	line-height:40px;
}
.item_pay_way div label input:nth-child(2){
	float: right;
}
.pay-style{
	overflow: hidden;
	vertical-align: middle;
}
.pay-style label{
	float: left;
	width: 20%;
	display: block;
	height: 40px;
	line-height: 40px;
	vertical-align: middle;
	margin-left: 20px;
	margin-top: 5px;
	}
.pay-style>label>img{
		width: 100%;
	}
.pay-style input{
	float: right;
	margin-right: 20px;
	line-height: 40px;
	height: 40px;
	width: 25px;
}
.agreen{
	margin-top: 15px;
	text-align: center;
	vertical-align: middle;
  margin-bottom: 50px;
}
.agreen input{
	width: 15px;
	height: 15px;
}
</style>
