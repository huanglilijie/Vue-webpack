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

    <div class="ciry" v-if="ciry">
      <div class="content">
        <div class="content_title">
          <h2>意向金规则</h2>
        </div>
        <div class="line"></div>
        <div class="content_word">
          <p>意向金规则文案待定</p>
        </div>
      </div>
      <a class="btn1" @click="pumpshow2()">知道了</a>
    </div>

   	<p class="agreen">
   		<span>我同意</span><a @click="pumpshow2 ()">意向金规则</a><input type="checkbox" v-model="state"/>
   	</p>
    <btn-footer :is-item-selected="selectedItem">开启宠爱之旅</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  import Golab from '../libs/golab'
  import Config from '../../config/config'
  export default {
    name: 'item-pay',
    data () {
      return {
        paytype: '',
        selectedItem: null,
        state: false,
        pageParam: {},
        ciry: false
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
      var dealerCode = this.$route.query.dealerCode
      var uid = this.$route.query.uid
      var param = {
        orderId: orderId,
        carName: carName,
        carIntentionFee: carIntentionFee,
        dealerName: dealerName,
        dealerTelephone: dealerTelephone,
        uid: uid,
        dealerCode: dealerCode
      }
      this.$set('pageParam', param)
    },
    watch: {
      paytype () {
        this.selectedItem = true
      }
    },
    methods: {
      pumpshow2 () {
        this.ciry = !this.ciry
      },
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
        // 400单校验
        this.$http.get(Config.API_ROOT + 'ecommerce/orders-number')
        .then((response) => {
          var ordersNumber = response.data
          if (ordersNumber >= Golab.activequota) {
            this.$router.go({path: '/listsfullquota/'})
          } else {
            // 这里发起支付请求
            // 请求成功后跳转到下个路由
            // 注意要使用token防止重复下单
            // 需要调用支付接口
            console.log(this.paytype)
            this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.pageParam.orderId + '/payment', {subject: '支付意向金', body: this.pageParam.carName, limit_pay: this.paytype, total_fee: this.pageParam.carIntentionFee, return_url: 'http://192.168.6.122:1080/reservation', dealer_code: this.pageParam.dealerCode}).then((response) => {
              console.log(response)
              console.log(response.data)
              window.open(response.data)
              /* this.$router.go({
                path: '/item/itemSuccess',
                query: this.pageParam
              })*/
            }).catch((response) => {
              console.log(response)
            })
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>
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
	margin-top: 10px;
	text-align: center;
	vertical-align: middle;
  margin-bottom: 50px;
}
.agreen input{
	width: 15px;
	height: 15px;
}
.agreen a{
  text-decoration: underline;
}
/*上牌城市遮罩*/
.ciry {
  width: 100%;
  height: 100%;
  background: url(/static/images/wherebg.png) no-repeat #fff;
  background-size: 100%;
  padding-top: 50px;
  position: fixed;
  top: 0;
  z-index: 10;
}
.content {
  width: 80%;
  min-height: 90%;
  margin: 0 auto;
  background: url(/static/images/pumpbg.png) no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  padding-top: 35%;
}
.btn1{
  position: fixed !important;
  bottom: 0;
  width: 100%;
  padding: 15px 0;
  background-color: #f6ba38;
  font-size: 18px;
  text-align: center;
  color: #fff;
}
.line{
  width:100%;
  height:0px;
  border-bottom: 2px white dashed;
  margin: 10px auto;
}
.content_title{
  text-align: center;
}
.content_word{
  box-sizing: border-box;
  padding: 0px 10px;
}
</style>
