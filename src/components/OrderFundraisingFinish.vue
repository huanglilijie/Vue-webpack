<template>
  <div class="wrap">
    <div class="top">
	  <div>
	    <p>已拥有万千宠爱</p>
	    <div><img src="/static/images/headset.png" alt="" /></div>
	  </div>
	  <p>* 感谢您对奔驰的支持</p>
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
    <div class="benz-location">
      <p>奔驰世界，无限精彩</p>
      <p>https://estore.mercedes-benz.com.cn</p>
    </div>
  </div>
  <div class="btn-more">
    <input type="button" value="我的宠爱值"/>
    <input type="button" value="再见"/>
  </div>
</template>
<script>
  import Golab from '../libs/golab'
  import Config from '../../config/config'
  export default {
    name: 'orderfundraisingfinish',
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
        totalamount: 0,
        present: ''
      }
    },
    ready: function () {
      this.initOrderDetail()
      this.initOrderAmount()
    },
    methods: {
      initOrderDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders').then((response) => {
          if (response.data != null) {
            var cdate = new Date(response.data.createTime)
            var year = cdate.getFullYear()
            var month = cdate.getMonth() + 1
            var date = cdate.getDate()
            this.createTime = [year, month, date].join('-')
            this.product[0].name = response.data.product.name
            this.reservationId = response.data.reservationId
            this.product[0].intentionFee = response.data.product.intentionFee
            this.dealer[0].name = response.data.dealer.name
            this.dealer[0].telephone = response.data.dealer.telephone
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
    background-color: #fff
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
	  height: 88%;
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
	.benz-location{
		margin: 0 auto;
		overflow: hidden;
		margin-top: 20px;
		text-align: center;
		font-weight: 600;
		font-size: 1.2rem;
	}
	.btn-more{
		margin: 0 auto;
		margin-top: 50px;
		padding-bottom: 20px;

	}
	.btn-more input{
		display: block;
		-webkit-appearance : none ;
		padding: 15px 0;
		font-size: 1.5rem;
		font-weight: 600;
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
