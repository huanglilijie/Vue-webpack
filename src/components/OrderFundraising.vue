<template>
  <div class="wrap">
	<div class="top">
	  <div>
		<p>宠爱ing</p>
		<div><img src="/static/images/headset.png" alt="" /></div>	
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
		  <div>{{carName}}</div>
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
		  <div>元</div>
		</li>
		<li class="car-message clearfloat">
		  <label for="">当前获得礼包:</label>
		  <div>元补贴 </div>
		</li>
	  </ul>
	</div>
  </div>
  <div class="btn-more">
	<input type="button" value="我的宠爱值"/>
	<input type="button" @click="cancelMyDear" value="放弃宠爱之旅"/>
  </div>
</template>
<script>
  import Config from '../../config/config'
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
        payment: [{
          amount: '',
          payStatus: '',
          payChannel: ''
        }],
        userid: '123',
        carName: ''
      }
    },
    ready: function () {
      this.initOrderDetail()
    },
    created () {
      this.carName = this.$route.query.carName
    },
    methods: {
      initOrderDetail () {
        this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + '123' + '/orders/' + '234' + '/funding/').then((response) => {
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
            this.dealer[0].name = response.data.dealer.name
            this.dealer[0].telephone = response.data.dealer.telephone
            this.payment[0].amount = response.data.payment.amount
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      cancelMyDear () {
        this.$router.go({name: 'cancelmydear'})
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
	  height: 100%;
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
	.wrap {
	  width: 100%;
	  height: 80%;
	  background: #ffffff;
	}
	.wrap .top {
	  width: 90%;
	  margin: 0 auto;
	  padding: 15px 0;
	  text-align: center;
	  border-bottom: 1px solid #000000;
	}
	.wrap .top p {
	  margin-top: 5px;
	  font-size: 1.2rem;
	  font-weight: 600;
	}
	.wrap .top div {
	  vertical-align: middle;
	}
	.wrap .top div p {
	  height: 30px;
	  line-height: 30px;
	  font-size: 1.8rem;
	  font-weight: 600;
	  display: inline-block;
	}
	.wrap .top div div {
	  width: 10%;
	  display: inline-block;
	  margin-left: 10px;
	}
	.wrap .top div div img {
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
		font-size: 1.2rem;
		padding: 10px 0;
		font-weight: 600;
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
		/*width: 100%;*/
		margin: 0 auto;
		margin-top: 50px;
		padding-bottom: 20px;
	}
	.btn-more input{
		display: block;
		-webkit-appearance : none ;
		padding: 15px 0;
		font-size: 1.5rem;
		width:90%;
		background-color: #F6BA38;
		border-radius: 5px;
		-webkit-appearance : none ;
		border: none;
		margin: 0 auto;
		color: #FFFFFF;
	}
	.btn-more input:first-child{
		margin-bottom: 10px;
	}
	.btn-more input:last-child{
		background-color: #969DA3;
	}
</style>