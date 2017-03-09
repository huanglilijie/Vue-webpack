<template>
  <div class="wrap-reward">
    <div class="content">
      <div class="top">
        <p>一千不多，一元不少</p>
        <p>心意送到，梦想开启</p>
        <input v-model="reward" name="reward" class="text-big"></input>
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
            var realMoney = Golab.gradeamount_4 - totalamount
            this.$set('realMoney', realMoney.toFixed(2))
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
  .wrap-reward .pump p:last-child{
    width: 60%;
    margin: 0 auto;
    margin-top: 10px;
    border:2px dashed #FFFFFF ;
    padding: 13px;
  }
</style>
