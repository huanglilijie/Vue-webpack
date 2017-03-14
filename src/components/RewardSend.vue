<template>
  <title>打赏</title>
  <div class="wrap-reward">
    <div class="content">
      <div class="top">
        <p>一千不多，一元不少</p>
        <p>心意送到，梦想开启</p>
        <input v-model="reward" name="reward" class="text-big" type="number"></input>
        <p>王比尔还差{{realMoney}}元就将达到筹款上限
        <br />不要给多了哟！</p>
      </div>
    </div>
    <div class="reward-bottom">
      <ul class="pay-style">
        <li>
          <span></span>
          <input type="radio" value="alipay" name="pay" v-model="paytype"/>
        </li>
        <li>
          <span></span>
          <input type="radio" value="wechat" name="pay" v-model="paytype"/>
        </li>
      </ul>

      <div class="agreen">我同意 <a href="#" @click="pumpshow2()">打赏规则</a>
        <input type="checkbox" id="consent" v-model="state" />
      </div>
      <a class="btn" @click="submit">送出心意</a>
      <div v-if='checks'>
        <div class="pump">
          <p>别把TA宠坏了，{{realMoney}}元足矣。</p>
          <a @click="pumpshow()">知道了，就给{{realMoney}}</a>
        </div>
        <div class="mask" @click="makshow"></div>
      </div>
    </div>
  </div>
  <div class="ciry-beyond" v-if="ciry">
    <div class="content">
      <div class="content_title">
        <h2>打赏规则</h2>
      </div>
      <div class="content_word">
        <p>好友打赏是指用户在支付意向金开启活动后，分享活动 链接到朋友圈或好友对话中，邀请好友以打赏的形式支持该用户的购车计划。好友打赏的款项会在活动结束并购车时抵扣购车款。</p>
        <p>好友打赏款项将托管在杭州驭缘网络科技有限公司（以下简称驭缘网络）支付宝/微信账号，驭缘网络为北京梅赛德斯-奔驰销售服务有限公司正式授权的本次活动运营方。</p>
        <p>好友打赏具体有以下几点说明：</p>
        <p>（一）好友打赏方式： 本次活动支持微信或支付宝支付；</p>
        <p>（二）好友打赏金额： 单笔打赏金额上限为8800元，且用户总筹款不超过8800元；</p>
        <p>（三）好友打赏退还规则： </p>
        <p>1.	若用户未到店核销进行购车，可随时申请退款，审核通过后，平台会将好友打赏款项退还到好友支付时所使用的第三方平台帐号；<br/>
        2.	退款到账时间请参考第三方支付平台的处理时间；<br/>
        3.	若用户已与经销商签署购车协议并完成核销后发生违约，因好友打赏款项已作为购车款转入经销商账户，好友打赏款项的处置将由用户与经销商双方协调解决，活动方将不参与。
        </p>
      </div>
    </div>
    <a class="btn1" @click="pumpshow2()">知道了</a>
  </div>
</template>
<script>
  import Golab from '../libs/golab'
  import Config from '../../config/config'
  import Btn from '../elements/btn-footer'
  export default {
    name: 'rewardsend',
    data () {
      return {
        paytype: '',
        selectedItem: null,
        state: false,
        checks: false,
        payFlag: true,
        money: 0,
        realMoney: 0,
        moneyRule: '',
        reward: 0,
        orderId: '',
        useropenid: '',
        ciry: false,
        carname: null,
        dealercode: null
      }
    },
    components: {
      'btn-footer': Btn
    },
    created () {
    },
    ready: function () {
      this.moneyRule = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/
      this.orderId = this.$route.query.orderId
      this.useropenid = this.$route.query.useropenid
      this.carname = this.$route.query.carname
      this.dealercode = this.$route.query.dealercode
      // 可以获取支付后回调链接的值，如果code为200则支付成功。
      var errmsg = this.$route.query.err_msg
      var totalfee = this.$route.query.total_fee
      if (errmsg) {
        if (errmsg === '操作成功') {
          this.$router.go({name: 'rewardarrive', query: {'orderId': this.orderId, 'reward': totalfee, 'useropenid': this.useropenid}})
        } else {
          this.$alert(errmsg)
        }
      }
      this.initFundDetail()
    },
    methods: {
      pumpshow () {
        this.reward = this.realMoney
        this.checks = !this.checks
        this.submit()
      },
      pumpshow2 () {
        this.ciry = !this.ciry
      },
      makshow () {
        var self = this
        self.checks = !self.checks
      },
      initFundDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.orderId + '/funds').then((response) => {
          if (response.data != null) {
            var data = response.data
            var totalamount = 0
            for (var i in data) {
              totalamount = totalamount + data[i].amount
            }
            var realMoney = (Golab.gradeamount_4 - totalamount).toFixed(2)
            this.$set('realMoney', realMoney)
            console.log('realMoney' + this.realMoney)
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      submit () {
        if (!this.selectedItem) {
          this.$alert('请选择支付方式')
          return false
        }
        if (!this.state) {
          this.$alert('请先阅读打赏规则')
          return false
        }
        // 实时校验金额是否大于剩余金额
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.orderId + '/funds').then((response) => {
          if (response.data != null) {
            var data = response.data
            var totalamount = 0
            for (var i in data) {
              totalamount = totalamount + data[i].amount
            }
            var realMoney = (Golab.gradeamount_4 - totalamount).toFixed(2)
            this.$set('realMoney', realMoney)
            console.log('realMoney' + this.realMoney)
          }
          if (this.reward > this.realMoney) {
            this.$set('checks', true)
            return false
          } else {
            // 支付
            this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.sessionStorage.getItem('openid') + '/fund/' + this.orderId + '/payment', {subject: '支付意向金', body: this.carname, limit_pay: this.paytype, total_fee: this.reward, return_url: 'http://192.168.6.122/rewardsend?orderId=' + this.orderId + '&useropenid=' + this.useropenid + '&carname=' + this.carname, dealer_code: this.dealercode}).then((response) => {
              console.log(response)
              console.log(response.data)
              window.open(response.data)
            }).catch((response) => {
              console.log(response)
            })
            // this.$router.go({name: 'rewardarrive', query: {'orderId': this.orderId, 'reward': this.reward, 'useropenid': this.useropenid}})
          }
        }).catch((response) => {
          console.log(response)
        })
        // this.initFundDetail()
        console.log(this.reward)
        console.log(this.realMoney)
        // 如果输入的金额等于剩余金额,那么筹款结束
        // if (this.reward.toFixed(2) === this.realMoney.toFixed(2)) {
        //   this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.orderId + '/funded', {}).then((response) => {
        //     if (response.status === 200) {
        //       this.$router.go({name: 'rewardarrive', query: {'orderId': this.orderId, 'reward': this.reward}})
        //     }
        //   }).catch((response) => {
        //     console.log(response)
        //   })
        // } else {
        //   this.$router.go({name: 'rewardarrive', query: {'orderId': this.orderId, 'reward': this.reward}})
        // }
      }
    },
    watch: {
      paytype () {
        this.selectedItem = true
      }
    }
  }
</script>
<style>
  .reward-bottom{
    position: fixed;
    width: 100%;
    bottom: 0;
    background: #fff;
  }
  .wrap-reward {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
  }
  .wrap-reward .content {
    width: 100%;
    background: url(/static/images/imgtitle-bg.png) no-repeat #fff;
    background-size: 100% 100%;
    min-height: 60%;
    padding-top: 20%;
    padding-bottom: 60%;
  }
  .wrap-reward .content .top {
    width: 90%;
    margin: 0 auto;
    background: url(/static/images/center-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 30px 0;
    min-height: 150px;
  }
  .wrap-reward .content .top p {
    text-align: center;
    font-size: .48rem;
    color: #FFFFFF;
  }
  .wrap-reward .content .top .text-big {
    width: 80%;
    margin: 0 auto;
    font-size: .98rem;
    color: #F4DA9F;
    padding: 10px;
    display: inherit;
    background: none;
    border: none;
    text-align: center;
    height: 1.15rem;
    border-bottom: .03rem solid #fff;
    outline: medium;
  }
  .wrap-reward .content .top p:last-child {
    margin-top: 10px;
  }
  .wrap-reward .pay-style {
    width: 100%;
  }
  .wrap-reward .pay-style li {
    overflow: hidden;
    border-bottom: 1px solid #F1F1F5;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wrap-reward .pay-style li span {
    background: url(/static/images/alipay.png) no-repeat center left;
    background-size: contain;
    width: 26%;
    height: 1rem;
    float: left;
  }
  .wrap-reward .pay-style li input {
    float: right;
    display: block;
    width: 20px;
    border-radius: 10px;
    height: 20px;
    color: red;
  }
  .wrap-reward .pay-style li:first-child {
    border-top: 1px solid #F1F1F5;
  }
  .wrap-reward .pay-style li:last-child span {
    background: url(/static/images/wechat.png) no-repeat center;
    background-size: contain;
    width: 26%;
    height: .8rem;
    float: left;
  }
  .wrap-reward .agreen {
    text-align: center;
    margin-top: 10px;
    height: 20px;
    font-size: .35rem;
  }
  .wrap-reward .agreen a {
    color: #000000;
  }
  .wrap-reward .agreen #consent {
    vertical-align: middle;
    margin: auto;
  }
  .wrap-reward .btn {
    display: block;
    margin: 0 auto;
    width: 90%;
    height: 1.64rem;
    line-height: 1.64rem;
    text-align: center;
    background-color: #F6BA38;
    border-radius: .2rem;
    margin: .35rem auto;
    color: #FFFFFF;
    font-size: .6rem;
    text-decoration: none;
  }
  /*@media (min-height: 730px) {
    .wrap .btn{
      position: fixed;
      bottom: 10px;
      width: 90%;
      left: 5%;
    }
  }*/
  .wrap-reward .mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 2;
  }
  .wrap-reward .pump{
    background: url(/static/pump.png) no-repeat;
    background-size: 100% 100%;
    min-height: 100px;
    padding-top:35%;
    position: fixed;
    top: 8vh;
    width: 80%;
    left: 10%;
    z-index: 3;
  }
  .wrap-reward .pump p{
    text-align: center;
    font-size: .6rem;
    font-weight: bold;
  }
  .wrap-reward .pump a{
    font-size: .6rem;
    text-align: center;
    display: inherit;
    margin: .5rem auto;
    width: 6.22rem;
    height: 1.64rem;
    line-height: 1.64rem;
    border: .05rem dashed #fff;
  }
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
</style>
