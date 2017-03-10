<template>
  <div class="orderrefunded">
    <div class="orderrefundedtop">
      <div class="unsubscribe">
      	<p>{{state}}</p>
      	<img src="/static/images/headset.png" alt="" />
      </div>
     	<p>{{stateDetail}}</p>
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
      	  <div>{{product[0].name}}</div>
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
      	<li class="car-message clearfloat">
      	  <label for="">筹款金额:</label>
      	  <div>{{totalamount}}元</div>
      	</li>
      	<li class="car-message clearfloat">
      	  <label for="">获得礼包:</label>
      	  <div>{{present}}</div>
      	</li>
      </ul>
    </div>
  </div>
  <div class="btn-more">
    <!-- <input v-if="refunded" type="button" value="重启宠爱之旅" @click="gohome()"/> -->
    <input type="button" value="再见" @click="closepage"/>
  </div>
</template>
<script>
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  import wx from 'wx'
  export default {
    name: 'orderrefunded',
    data () {
      return {
        state: '',
        stateDetail: '',
        createTime: '',
        reservationId: '',
        orderStatus: '',
        product: [{
          id: '',
          createTime: '',
          status: '',
          price: '',
          intentionFee: '',
          name: ''
        }],
        customerId: '',
        dealer: [{
          name: '',
          telephone: '',
          totalAmount: ''
        }],
        totalamount: 0,
        present: '',
        refunded: false
      }
    },
    ready: function () {
      this.initOrderDetail()
      this.initOrderAmount()
    },
    created () {
      this.reservationId = this.$route.query.reservationId
    },
    methods: {
      closepage () {
        wx.closeWindow()
      },
      initOrderDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders').then((response) => {
          if (response.data != null) {
            console.log(response.data)
            console.log(response.data.product)
            console.log(response.data.dealer)
            var cdate = new Date(response.data.createTime)
            var year = cdate.getFullYear()
            var month = cdate.getMonth() + 1
            var date = cdate.getDate()
            this.createTime = [year, month, date].join('-')
            console.log(response.data.orderStatus)
            console.log(response.data.orderStatus === 'REFUNDING')
            if (response.data.orderStatus === 'REFUNDING') {
              this.refunded = false
              this.state = '退订中'
              this.stateDetail = '* 客服正在处理您的退订申请，请耐心等待'
            } else {
              this.refunded = true
              this.state = '已退订'
              this.stateDetail = '您 的订单退款已成功受理，意向金将返还到您原支付账户,请在14个工作日内注意查收.'
            }
            this.reservationId = response.data.reservationId
            this.product[0].intentionFee = response.data.product.intentionFee
            this.dealer[0].name = response.data.dealer.name
            this.dealer[0].telephone = response.data.dealer.telephone
            this.product[0].name = response.data.product.name
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      initOrderAmount () {
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.reservationId + '/funds').then((response) => {
          var data = response.data
          var totalamount = 0
          for (var i in data) {
            totalamount += data[i].amount
          }
          if (totalamount !== 0) {
            totalamount = totalamount.toFixed(2)
          }
          var present
          if (totalamount < Golab.gradeamount_1) {
            present = '无'
          }
          if (totalamount < Golab.gradeamount_2 && totalamount >= Golab.gradeamount_1) {
            present = Golab.packageamount_1 + '元'
          }
          if (totalamount < Golab.gradeamount_3 && totalamount >= Golab.gradeamount_2) {
            present = Golab.packageamount_2 + '元'
          }
          if (totalamount >= Golab.gradeamount_3) {
            present = Golab.packageamount_3 + '元'
          }
          this.$set('totalamount', totalamount)
          this.$set('present', present)
        }).catch((response) => {
          console.log(response)
        })
      },
      gohome () {
        this.$router.go({name: 'home'})
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
    background: #ffffff;
    background-color: #fff;
  }
  ul,li{
    list-style: none;
  }
  @media (max-width: 350px) {
    html,
    body {
      font-size: 10px !important;
    }
  }
  .orderrefunded {
    width: 100%;
    height: 80%;
    background: #ffffff;
  }
  .orderrefunded .orderrefundedtop {
    width: 90%;
    margin: 0 auto;
    padding: 15px 0;
    text-align: center;
    border-bottom: 1px solid #000000;
  }
  .orderrefunded .unsubscribe img{
    width: 10%;
    display: inline-block;
    margin-left: 10px;
    position: absolute;
    top:0;
    right:25%;
  }
  .orderrefunded .orderrefundedtop p {
    margin-top: 5px;
    font-size: .35rem;
    font-weight: 500;
    text-align: left;
  }
  .orderrefunded .orderrefundedtop div {
    vertical-align: middle;
    position:relative;
  }
  .orderrefunded .orderrefundedtop div p {
    width: 100%;
    margin:0;
    text-align: center;
    font-size: .7rem;
    font-weight: 600;
    padding-bottom: .2rem;
  }
  .orderrefunded .orderrefundedtop div div {
    width: 10%;
    display: inline-block;
    margin-left: 10px;
  }
  .orderrefunded .orderrefundedtop div div img {
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
    border-bottom: 1px solid #000000;
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
  .btn-more input:last-child{
    background-color: #969DA3;
    /*margin-bottom: 40px;*/
  }
  .btn-more input:first-child{
    background-color: #F6BA38;
    margin-bottom: 10px;
  }
</style>
