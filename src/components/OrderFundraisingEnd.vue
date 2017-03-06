<template>
  <div class="orderFundraisingend">
    <div class="orderFundraisingendtop">
      <div>
        <p>宠爱之旅完成</p>
        <div><img src="/static/images/headset.png" alt="" /></div>
      </div>
      <p>* 请尽快到店提车拿礼包</p>
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
          <label for="">当前筹款金额:</label>
          <div>{{totalamount}}元</div>
        </li>
        <li class="car-message clearfloat">
          <label for="">当前获得礼包:</label>
          <div>{{present}}</div>
        </li>
      </ul>
    </div>
    <div class="write-code">
      <div>如果您忘记了核销码，点此重新发送</div>
      <input v-if="resendtime == 0" type="button" value="重新发送核销码" class="resend" @click ="resendCode" :disabled ='isdisable'/>
      <span v-if="resendtime != 0" class="resend" id="timeText">{{resendtime}}s</span>
    </div>
  </div>
  <div class="btn-more">
    <input type="button" value="我的宠爱值" @click="viweMyDear()"/>
    <input type="button" @click="cancelMyDear" value="放弃宠爱之旅"/>
  </div>
</template>
<script>
  import Golab from '../libs/golab'
  import Config from '../../config/config'
  export default {
    name: 'orderfundraisingend',
    data () {
      return {
        resendtime: 0,
        createTime: '',
        reservationId: '',
        orderStatus: '',
        product: [{
          id: '',
          createTime: '',
          name: '',
          status: '',
          price: '',
          intentionFee: ''
        }],
        customerId: '',
        dealer: [{
          name: '',
          telephone: '',
          totalAmount: ''
        }],
        totalamount: 0,
        present: ''
      }
    },
    ready: function () {
      this.initOrderDetail()
      this.initOrderAmount()
    },
    created () {
      this.reservationId = this.$route.query.orderId
    },
    props: {
      second: {
        type: Number,
        default: 60
      }
    },
    methods: {
      start: function () {
        this.resendtime = this.second
        this.timer()
      },
      timer: function () {
        if (this.resendtime > 0) {
          this.resendtime--
          setTimeout(this.timer, 1000)
        } else {
          this.disabled = false
        }
      },
      initOrderDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders').then((response) => {
          if (response.data != null) {
            var cdate = new Date(response.data.createTime)
            var year = cdate.getFullYear()
            var month = cdate.getMonth() + 1
            var date = cdate.getDate()
            this.createTime = [year, month, date].join('-')
            this.reservationId = response.data.reservationId
            this.product[0].name = response.data.product.name
            this.product[0].intentionFee = response.data.product.intentionFee
            this.dealer[0].name = response.data.dealer.name
            this.dealer[0].telephone = response.data.dealer.telephone
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
      cancelMyDear () {
        this.$router.go({
          name: 'cancelmydear',
          query: {'reservationId': this.reservationId}})
      },
      viweMyDear () {
        this.$router.go({name: 'fundraising', query: {orderId: this.reservationId}})
      },
      resendCode () {
        this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.reservationId + '/redeem-code').then((response) => {
          if (response) {
            this.start()
          }
        }).catch((response) => {
          console.log(response)
        })
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
    font-size: 12px;
    font-family: "微软雅黑";
    width: 100%;
    /*height: 100%;*/
    background-color: #fff
  }
  ul,
  li {
    list-style: none;
  }
  @media (max-width: 350px) {
    html,
    body {
      font-size: 10px !important;
    }
  }
  .orderFundraisingend {
    width: 100%;
    height: 88%;
  }
  .orderFundraisingend .orderFundraisingendtop {
    width: 90%;
    margin: 0 auto;
    padding: 15px 0;
    text-align: center;
    border-bottom: 1px solid #000000;
  }
  .orderFundraisingend .orderFundraisingendtop p {
    margin-top: 5px;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .orderFundraisingend .orderFundraisingendtop div {
    vertical-align: middle;
  }
  .orderFundraisingend .orderFundraisingendtop div p {
    height: 30px;
    line-height: 30px;
    font-size: 1.8rem;
    font-weight: 600;
    display: inline-block;
  }
  .orderFundraisingend .orderFundraisingendtop div div {
    width: 10%;
    display: inline-block;
    margin-left: 10px;
  }
  .orderFundraisingend .orderFundraisingendtop div div img {
    width: 100%;
  }
  .car-style {
    width: 90%;
    margin: 0 auto;
  }
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
  .car-message {
    border-bottom: 1px dashed #000000;
    font-size: 1.2rem;
    padding: 10px 0;
    font-weight: 600;
  }
  .car-message>label {
    float: left;
    letter-spacing: 1px;
  }
  .car-message>div {
    float: left;
    letter-spacing: 1px;
  }
  .car-style li:last-child {
    border-bottom: 1px solid #000000;
  }
  .write-code {
    width: 92%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 20px;
  }
  .write-code div {
    float: left;
    height: 30px;
    line-height: 30px;
  }
  .write-code input {
    display: inline-block;
    -webkit-appearance: none;
    width: 100px;
    height: 30px;
    border: none;
    background-color: #599C31;
    color: #FFFFFF;
    border-radius: 5px;
    font-size: 10px;
    float: right;
  }
  .write-code span {
    display: inline-block;
    -webkit-appearance: none;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: none;
    background-color: rgb(150,157,163);
    color: #FFFFFF;
    border-radius: 5px;
    font-size: 10px;
    float: right;
  }
  .btn-more {
	/*width: 100%;*/


    margin: 0 auto;
    margin-top: 50px;
    padding-bottom: 20px;
  }
  .btn-more input {
    display: block;
    -webkit-appearance: none;
    padding: 15px 0;
    font-size: 1.5rem;
    width: 90%;
    background-color: #F6BA38;
    border-radius: 5px;
    -webkit-appearance: none;
    border: none;
    margin: 0 auto;
    color: #FFFFFF;
  }
  .btn-more input:first-child {
    margin-bottom: 10px;
  }
  .btn-more input:last-child {
    background-color: #969DA3;
  }
</style>
