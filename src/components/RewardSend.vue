<template>
  <div class="wrap">
    <div class="content">
      <div class="top">
        <p>一千不多，一元不少</p>
        <p>心意送到，梦想开启</p>
        <input v-model="reward" name="reward" class="text-big"></input>
        <p>王比尔还差{{realMoney}}元就将达到筹款上限
        <br />不要给多了哟！</p>
      </div>
    </div>
    <div>
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
    </div>			
    <div class="agreen">我同意 <a href="">打赏规则</a>
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
        orderId: ''
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
      this.initFundDetail()
    },
    methods: {
      pumpshow () {
        this.reward = this.realMoney
        this.checks = !this.checks
        this.submit()
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
            this.$set('realMoney', Golab.gradeamount_4 - totalamount.toFixed(2))
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
        this.initFundDetail()
        console.log(this.reward)
        console.log(this.realMoney)
        // 判断输入的金额 是否大于剩余筹款金额
        if (this.reward > this.realMoney) {
          this.$set('checks', true)
          return false
        }
        // 如果输入的金额等于剩余金额,那么筹款结束
        if (this.reward === this.realMoney) {
          this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.orderId + '/funded', {}).then((response) => {
            if (response.status === 200) {
              this.$router.go({name: 'rewardarrive', query: {'orderId': this.orderId, 'reward': this.reward}})
            }
          }).catch((response) => {
            console.log(response)
          })
        } else {
          this.$router.go({name: 'rewardarrive', query: {'orderId': this.orderId, 'reward': this.reward}})
        }
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
  * {
    margin: 0;
    padding: 0;
  }
  html,body {
    font-size: 12px;
    font-family: "微软雅黑";
    width: 100%;
    height: 100%;
  }
  ul,li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
  }
  @media (max-width: 350px) {
    html,body {
      font-size: 10px !important;
    }
  }
  .wrap {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
  }
  .wrap .content {
    width: 100%;
    background: url(/static/images/imgtitle-bg.png) no-repeat;
    background-size: 100% 100%;
    min-height: 60%;
    padding-top: 20%;
  }
  .wrap .content .top {
    width: 90%;
    margin: 0 auto;
    background: url(/static/images/center-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 30px 0;
    min-height: 150px;
  }
  .wrap .content .top p {
    text-align: center;
    font-size: 1.4rem;
    color: #FFFFFF;
  }
  .wrap .content .top .text-big {
    width: 80%;
    margin: 0 auto;
    font-size: 2.4rem;
    color: #F4DA9F;
    padding: 10px;
    border-bottom: 2px solid #FFFFFF;
  }
  .wrap .content .top p:last-child {
    margin-top: 10px;
  }
  .wrap .pay-style {
    width: 100%;
  }
  .wrap .pay-style li {
    overflow: hidden;
    border-bottom: 1px solid #F1F1F5;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .wrap .pay-style li span {
    background: url(/static/images/alipay.png) no-repeat;
    background-size: contain;
    width: 20%;
    height: 20px;
    float: left;
  }
  .wrap .pay-style li input {
    float: right;
    display: block;
    width: 20px;
    border-radius: 10px;
    height: 20px;
    color: red;
  }
  .wrap .pay-style li:first-child {
    border-top: 1px solid #F1F1F5;
  }
  .wrap .pay-style li:last-child span {
    background: url(/static/images/wechat.png) no-repeat;
    background-size: contain;
    width: 20%;
    height: 20px;
    float: left;
  }
  .wrap .agreen {
    text-align: center;
    margin-top: 10px;
    height: 20px;
    font-size: 1.2rem;
  }
  .wrap .agreen a {
    color: #000000;
  }
  .wrap .agreen #consent {
    vertical-align: middle;
    margin: auto;
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
  .wrap .btn {
    display: block;
    margin: 0 auto;
    width: 90%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #F6BA38;
    border-radius: 5px;
    margin-top: 10px;
    color: #FFFFFF ;
    font-size: 1.6rem;
    text-decoration: none;
  }
  @media (min-height: 730px) {
    .wrap .btn{
      position: fixed;
      bottom: 10px;
      width: 90%;
      left: 5%;
    }
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 2;
  }
  .pump{
    background: url(/static/images/pump-bg.png) no-repeat;
    background-size: 100% 100%;
    min-height: 100px;
    padding-top:35%;
    position: absolute;
    top: 8vh;
    width: 80%;
    left: 10%;
    z-index: 3;
  }
  .pump p{
    text-align: center;
    font-size: 1.4rem;
    font-weight: bold;
  }
  .pump p:last-child{
    width: 60%;
    margin: 0 auto;
    margin-top: 10px;
    border:2px dashed #FFFFFF ;
    padding: 13px;
  }
</style>