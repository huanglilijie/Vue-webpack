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

    <div class="ciry-beyond" v-if="ciry">
      <div class="content">
        <div class="content_title">
          <h2>意向金规则</h2>
        </div>
        <div class="content_word">
          <p>意向金是指用户在参加本次活动时，在选定商品后支付的用于表明购买该活动商品的意向的金额。</p>
          <p>用户在提交活动意向订单时，需要完成意向金在线支付，请在支付前仔细确认所购车型名称、型号、联系方式、购买人姓名、经销商等信息。用户支付意向金后，意向金将托管在杭州驭缘网络科技有限公司（以下简称驭缘网络）支付宝/微信账号，驭缘网络为北京梅赛德斯-奔驰销售服务有限公司正式授权的本次活动运营商。</p>
          <p>用户在线支付意向金后，会收到核销码。用户到店后与经销商达成购车意向、签订购车合同并支付购车余额时，需向经销商提供核销码进行核销。在核销码成功验证后，用户支付的意向金、好友打赏款项 、购车补贴  将转入经销商账户并抵扣车款，核销后，活动方和平台将不再介入用户和经销商之间的购车交易。</p>
          <p>用户与经销商签订购车协议是用户和经销商之间建立的合同关系，仅对用户和经销商之间发生法律效力，本次活动方不作为合同任一方，不享有该合同约定的权利且不承担合同约定的义务。因合同和产品质量问题所产生的纠纷，用户应自行与经销商进行协商解决。</p>
          <p>意向金的管理如下：</p>
          <p>（一）意向金金额计算： 本次活动意向金金额为666元；</p>
          <p>（二）意向金支付流程： 用户需在30分钟内活动结束前支付意向金，否则系统将自动取消该活动意向订单；</p>
          <p>（三）意向金退还规则： </p>
          <p>1.	若用户未核销，可随时申请退款，退款审核通过后，意向金、好友打赏款项将退还到客户和好友支付时所使用的第三方支付平台帐号；<br/>
            2.	意向金和好友所筹款项退款到账时间请参考第三方支付平台；<br/>
            3.	若用户已与经销商签署购车协议并完成核销后发生违约，因意向金已作为购车款转入经销商账户，意向金的处置由用户与经销商双方自行协调解决，活动方将不参与该意向金的处置协商；<br/>
            4.	用户需在选定的城市上牌，如果由于用户未在已选定的城市上牌而导致无法交车，该责任由用户自行承担，经销商有权取消该订单，用户应自行与经销商协商意向金的处置。
          </p>
          <p>（四）意向金发票规则：</p>
          <p>1.	用户在线支付意向金后，活动方作为意向金的暂时监管方  ，无法为意向金单独开具发票；<br/>
            2.	在用户与经销商成功进行购车交易后，意向金将作为定金的一部分抵扣购车款，经销商开具给用户的发票将包含意向金。
          </p>
        </div>
      </div>
      <a class="btn1" @click="pumpshow2()">知道了</a>
    </div>

   	<p class="agreen">
   		<span>我同意</span><a @click="pumpshow2 ()">意向金规则</a><input type="checkbox" v-model="state"/>
   	</p>
    <!-- <btn-footer :is-item-selected="selectedItem">开启宠爱之旅</btn-footer> -->
    <div v-if='checks'>
      <div class="mask"></div>
      <div class="pump">
        <img src="/static/pump.png"/>
        <p>你确定这样做吗?</p>
        <a class="mask-reselect" @click="pumpshow()">再考虑一下</a>
        <a class="mask-submit" @click="reselect()">确定</a>
      </div>
    </div>
    <a class="btn submit" :is-item-selected="selectedItem" @click='submit'>开启宠爱之旅</a>
    <a class="btn reselect" @click="pumpshow()">重新选择</a>
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
        ciry: false,
        code: null,
        checks: false
      }
    },
    components: {
      'btn-footer': Btn
    },
    ready () {
      // 获取页面传参
      var orderId = this.$route.query.orderId
      var carName = this.$route.query.carName
      var carIntentionFee = this.$route.query.carIntentionFee
      var dealerName = this.$route.query.dealerName
      var dealerTelephone = this.$route.query.dealerTelephone
      var dealerCode = this.$route.query.dealerCode
      var code = this.$route.query.code
      console.log(orderId)
      // 可以获取支付后回调链接的值，如果code为200则支付成功。
      var errmsg = this.$route.query.err_msg
      console.log(code)
      // this.$alert(code)
      var param = {
        orderId: orderId,
        carName: carName,
        carIntentionFee: carIntentionFee,
        dealerName: dealerName,
        dealerTelephone: dealerTelephone,
        dealerCode: dealerCode
      }
      this.$set('pageParam', param)
      if (errmsg) {
        if (errmsg === '操作成功') {
          this.$router.go({path: '/item/itemSuccess', query: this.pageParam})
        } else {
          this.$alert(errmsg)
        }
      }
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
      reselect () {
        // 调用取消订单接口
        this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.pageParam.orderId + '/cancel', {}).then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.$router.go({name: 'home'})
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      pumpshow () {
        this.checks = !this.checks
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
            this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.pageParam.orderId + '/payment', {subject: '支付意向金', body: this.pageParam.carName, limit_pay: this.paytype, total_fee: this.pageParam.carIntentionFee, return_url: 'http://192.168.6.122/item/itempay?carIntentionFee=' + this.pageParam.carIntentionFee + '&carName=' + this.pageParam.carName + '&dealerCode=' + this.pageParam.dealerCode + '&dealerName=' + this.pageParam.dealerName + '&dealerTelephone=' + this.pageParam.dealerTelephone + '&orderId=' + this.pageParam.orderId + '&testpay=test', dealer_code: this.pageParam.dealerCode}).then((response) => {
              console.log(response)
              console.log(response.data)
              window.open(response.data)
            }).catch((response) => {
              console.log(response)
            })
            // this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.pageParam.orderId + '/payment', {subject: '支付意向金', body: this.pageParam.carName, limit_pay: this.paytype, total_fee: this.pageParam.carIntentionFee, return_url: 'http://192.168.6.122/item/itempay', dealer_code: this.pageParam.dealerCode}).then((response) => {
            //   console.log(response)
            //   console.log(response.data)
            //   window.open(response.data)
            // }).catch((response) => {
            //   console.log(response)
            // })
            // 页面跳转
            // this.$router.go({
            //   path: '/item/itemSuccess',
            //   query: this.pageParam
            // })
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
	margin-top: .2rem;
  padding-bottom: 2.5rem
}
.item_pay_money p{
	text-align: center;
	font-size:.45rem;
}
/*.item_pay_money p:nth-child(2){
	margin-top: 5px;
}*/
.item_pay_money p:nth-child(2) span{
	font-size:1.5rem;
	font-weight: 700;
}
.item_pay_money p:nth-child(3){
	font-size:.35rem;
	/*margin-top: 5px;*/
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
  font-size: .35rem
}
.agreen input{
	width: 15px;
	height: 15px;
}
.agreen a{
  text-decoration: underline;
}
/*上牌城市遮罩*/
.ciry-beyond {
  width: 100%;
  /*height: 100%;*/
  background: url(/static/images/wherebg.png) no-repeat #fff;
  background-size: 100%;
  /*padding-top: 50px;*/
  position: absolute;
  top: 0;
  z-index: 10;
}
.ciry-beyond .content {
  width: 80%;
  /*min-height: 90%;*/
  margin: 0 auto;
  /*background: url(/static/images/pumpbg.png) no-repeat;*/
  background-size: 100%;
  box-sizing: border-box;
  padding-top: 10%;
  padding-bottom: 25%;
}
.ciry-beyond .btn1{
  position: fixed !important;
  bottom: 0;
  width: 100%;
  padding: 15px 0;
  background-color: #f6ba38;
  font-size: 18px;
  text-align: center;
  color: #fff;
}
.ciry-beyond .content_title{
  text-align: center;
  background: url(/static/images/pumptop.png) no-repeat center;
  height: 4.5rem;
  background-size: 100% 100%;
  line-height: 8rem;
}
.ciry-beyond .content_word{
  box-sizing: border-box;
  padding: 0px 10px;
  background: url(/static/images/pumpbottom.png) no-repeat bottom;
  background-size: 100%;
  background-color: #f6ba35;
  border-top: 2px white dashed;
  padding-top: 5%;
  padding-bottom: 10%;
}
.ciry-beyond .content_title h2{
  font-size: .45rem;
}
.ciry-beyond .content_word p{
  font-size: .4rem;
  padding: .1rem;
}
.btn{
  display: block;
  width: 90%;
  text-align: center;
  font-size: 18px;
  text-decoration: none;
  padding:10px 0;
  color: #FFFFFF;
  border-radius: 10px;
}
.reselect{
  position: fixed;
  bottom: 10px;
  background-color: #969DA3;
  left: 5%;
}
.submit{
  position: fixed;
  bottom: 65px;
  background-color: #F6BA38;
  left: 5%;
  margin-top: 20px;
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
  top: 20vh;
  font-size: .5rem
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
.mask-reselect{
  margin-top: 10px;
  background-color: #FBE3AE;
}
.mask-submit{
  margin-top: 70px;
}
</style>
