<template>
  <title>我的宠爱之旅</title>
  <div class="wrap-orderfundraising">
	<div class="toporderf">
	  <div>
		<p>宠爱ing</p>
		<div ><img src="/static/images/headset.png" @click = "openUrl" /></div>
	  </div>
	  <p>* 您可以提前完成筹款并与经销商沟通</p>
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
  </div>
  <div class="btn-more">
	<input type="button" value="我的宠爱值" @click="viewMyDear()"/>
	<input type="button" @click="cancelMyDear" value="放弃宠爱之旅"/>
  </div>
</template>
<script>
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  export default {
    name: 'orderfundraising',
    data () {
      return {
        createTime: '',
        reservationId: '',
        orderStatus: '',
        product: [{
          id: '',
          createTime: '',
          name: '',
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
        totalamount: 0,
        present: '',
        orderId: ''
      }
    },
    ready: function () {
      this.initOrderDetail()
      this.initOrderAmount()
    },
    created () {
      var orderId = this.$route.query.orderId
      this.orderId = orderId
    },
    methods: {
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
            this.reservationId = response.data.reservationId
            this.product[0].intentionFee = response.data.product.intentionFee
            this.product[0].name = response.data.product.name
            this.dealer[0].name = response.data.dealer.name
            this.dealer[0].telephone = response.data.dealer.telephone
            this.payment[0].amount = response.data.payment.amount
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      initOrderAmount () {
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.orderId + '/funds').then((response) => {
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
      cancelMyDear () {
        this.$router.go({
          name: 'cancelmydear',
          query: {'reservationId': this.reservationId}})
      },
      viewMyDear () {
        this.$router.go({name: 'dealerlist', query: {orderId: this.reservationId}})
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
	  width: 100%;
	  /*height: 100%;*/
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
	.wrap-orderfundraising {
	  width: 100%;
	  height: 80%;
	  background: #ffffff;
	}
	.wrap-orderfundraising .toporderf {
	  width: 90%;
	  margin: 0 auto;
	  padding: 15px 0;
	  text-align: center;
	  border-bottom: 1px solid #000000;
	}
	.wrap-orderfundraising .toporderf p {
	  margin-top: 5px;
	  font-size: .35rem;
	  font-weight: 500;
	}
	.wrap-orderfundraising .toporderf div {
	  vertical-align: middle;
    position:relative;
	}
	.wrap-orderfundraising .toporderf div p {
    width: 100%;
    margin:0;
    text-align: center;
    font-size: .7rem;
    font-weight: 600;
    padding-bottom: .2rem;
  	}
	.wrap-orderfundraising .toporderf div div {
    width: 10%;
    display: inline-block;
    margin-left: 10px;
    position: absolute;
    top:0;
    right:25%;
	}
	.wrap-orderfundraising .toporderf div div img {
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
	.btn-more input:first-child{
		margin-bottom: 10px;
	}
	.btn-more input:last-child{
		background-color: #969DA3;
	}
</style>
