<template>
  <title>我的宠爱之旅</title>
  <div class="wrap-orderpayment">
    <div class="toporderpayment">
      <div>
          <p>已支付</p>
          <div><img src="/static/images/headset.png" @click = "openUrl" /></div>
      </div>
      <p>恭喜，你已成功参与smart购车筹款活动，快分享给全家人，
赢得他们的宠爱，2000元购车补贴在等着你哦！</p>
    </div>
    <div class="car-style">
      <ul>
        <li class="car-message clearfloat">
          <label for="">订单编号:</label>
          <div>{{reservationId}}</div>
        </li>
        <li class="car-message clearfloat">
          <label for="">预定时间:</label>
          <div>{{createTime}}</div>
        </li>
        <li class="car-message clearfloat">
          <label for="">车型信息:</label>
          <div>{{pageParam.carName}}</div>
        </li>
        <li class="car-message clearfloat">
          <label for="">经销商信息:</label>
          <div>
            <p>{{dealer[0].name}}</p>
            <p>{{dealer[0].telephone}}</p>
          </div>
        </li>
        <li class="car-message clearfloat">
          <label for="">订单金额:</label>
          <div>{{product[0].intentionFee}}元</div>
        </li>
      </ul>
      <p class="text">已成功预订 即刻开启筹款</p>
      <p class="text1">距离活动结束还有<span>{{dates}}</span>天</p>
      <p class="text">快去筹款吧！</p>
      <div class="btn-more">
        <input type="button" @click="jump" value="创建我的宠爱之旅"/>
        <input type="button" @click="cancelMyDear" value="放弃宠爱之旅"/>
      </div>
    </div>
  </div>
</template>
<script>
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  export default {
    name: 'orderpayment',
    data () {
      var nd = new Date()
      var ld = new Date(Golab.endDate)
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      if (dates <= 0) {
        dates = 0
      }
      return {
        createTime: '',
        reservationId: '',
        product: [{
          id: '',
          price: '',
          intentionFee: ''
        }],
        customerId: '',
        dealer: [{
          name: '',
          telephone: '',
          totalAmount: ''
        }],
        payment: [{
          amount: '',
          payStatus: '',
          payChannel: ''
        }],
        dates: dates,
        pageParam: {}
      }
    },
    ready: function () {
      this.initOrderDetail()
    },
    created () {
      var orderId = this.$route.query.orderId
      var carName = this.$route.query.carName
      var carIntentionFee = this.$route.query.carIntentionFee
      var param = {
        orderId: orderId,
        carName: carName,
        carIntentionFee: carIntentionFee
      }
      this.$set('pageParam', param)
    },
    methods: {
      initOrderDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders').then((response) => {
          console.log(response)
          if (response.data != null) {
            console.log(response.data)
            var cdate = new Date(response.data.createTime)
            var year = cdate.getFullYear()
            var month = cdate.getMonth() + 1
            var date = cdate.getDate()
            this.createTime = [year, month, date].join('-')
            this.reservationId = response.data.reservationId
            this.product[0].intentionFee = response.data.product.intentionFee
            this.dealer[0].name = response.data.dealer.name
            this.dealer[0].telephone = response.data.dealer.telephone
            this.payment[0].amount = response.data.payment.amount
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      cancelMyDear () {
        this.$router.go({name: 'cancelmydear', query: {'reservationId': this.reservationId}})
        /* this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.orderId + '/cancel/').then((response) => {
          if (response.data != null) {
            this.$router.go({
              name: 'cancelmydear',
              query: {'reservationId': this.reservationId}})
          }
        }).catch((response) => {
          console.log(response)
        })*/
      },
      jump () {
        this.$router.go({
          name: 'createmydear',
          query: this.pageParam})
      },
      openUrl () {
        window.open(Golab.customerUrl)
      }
    }
  }
</script>
<style>
  * {
      margin: 0;
      padding: 0;
    }
    html,
    body {
      font-family: "微软雅黑";
      background: #fff
    }
    ul,li{
        list-style: none;
    }
    .wrap-orderpayment {
      width: 100%;
      height: 80%;
      background: #ffffff;
    }
    .wrap-orderpayment .toporderpayment {
      width: 90%;
      margin: 0 auto;
      padding: 15px 0;
      text-align: center;
      border-bottom: 1px solid #000000;
    }
    .wrap-orderpayment .toporderpayment p {
      margin-top: 5px;
      font-size: .35rem;
      font-weight: 500;
      text-align: left;
    }
    .wrap-orderpayment .toporderpayment div {
      vertical-align: middle;
      position:relative;
    }
    .wrap-orderpayment .toporderpayment div p {
      width: 100%;
      margin:0;
      text-align: center;
      font-size: .7rem;
      font-weight: 600;
      padding-bottom: .2rem;
    }
    .wrap-orderpayment .toporderpayment div div {
      width: 10%;
      display: inline-block;
      margin-left: 10px;
      position: absolute;
      top:0;
      right:25%;
    }
    .wrap-orderpayment .toporderpayment div div img {
      width: 100%;
    }
    .car-style{
        width: 90%;
        margin: 0 auto;
    }
    .clearfloat:after{
        display:block;
        clear:both;
        content:"";
        visibility:hidden;
        height:0
    }
    .car-message{
        border-bottom: 1px dashed #000000;
        font-size: .35rem;
        padding: 10px 0;
        font-weight: 500;
    }
    .car-message>label{
        float: left;
        letter-spacing: 1px;
    }
    .car-message>div{
        float: left;
        letter-spacing: 1px;
    }
    .car-style li:last-child{
        border-bottom: none;
    }

    .text{
        width: 85%;
        margin: 0 auto;
        font-size: .72rem;
        text-align: center;
        font-weight: 500;
        margin: .5rem auto 0;
        /*margin-top: .5rem;*/
        overflow: hidden;
    }
    .text span:first-child{
        float: left;
    }
    .text span:last-child{
        float: right;
    }
    .text1{
        width: 80%;
        font-size: .4rem;
        margin: 0 auto;
        text-align: center;
    }
    .text1 span{
        font-size: 1.2rem;
        font-weight: 600;
        padding:0 .2rem;
    }
    .btn-more{
            position: fixed;
            bottom:.36rem;
            left: 5%;
            width: 90%;
            border-radius:10px;
            font-size: .5rem;
    }
    .btn-more input{
        display: block;
        -webkit-appearance : none ;
        padding: 10px 0;
        font-size: .5rem;
        width:100%;
        background-color: #F6BA38;
        border-radius: .2rem;
        -webkit-appearance : none ;
        border: none;
        margin: 0 auto;
        color: #FFFFFF;
        font-weight: 600;
    }
    .btn-more input:first-child{
        margin-bottom: 10px;
    }
    .btn-more input:last-child{
        background-color: #969DA3;
    }

</style>
