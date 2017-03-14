<template>
  <title>我的宠爱之旅</title>
  <div class="orderfundraisingfinish">
    <div class="top">
	    <div>
	      <p>已拥有万千宠爱</p>
	      <div><img src="/static/images/headset.png" @click = "openUrl" /></div>
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
    <input type="button" value="再见" @click="closepage"/>
  </div>
</template>
<script>
  import Golab from '../libs/golab'
  import Config from '../../config/config'
  import wx from 'wx'
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
      closepage () {
        wx.closeWindow()
      },
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
      },
      openUrl () {
        window.open(Golab.customerUrl)
      }
    }
  }
</script>
<style>
	.orderfundraisingfinish {
	  width: 100%;
	  height: 88%;
	}
	.orderfundraisingfinish .top {
    width: 90%;
    margin: 0 auto;
    padding: 15px 0;
    text-align: center;
    border-bottom: 1px solid #000000;
	}
	.orderfundraisingfinish .top p {
    margin-top: 5px;
    font-size: .35rem;
    font-weight: 500;
	}
	.orderfundraisingfinish .top div {
    vertical-align: middle;
    position:relative;
	}
	.orderfundraisingfinish .top div p {
    width: 100%;
    margin:0;
    text-align: center;
    font-size: .7rem;
    font-weight: 600;
    padding-bottom: .2rem;
	}
	.orderfundraisingfinish .top div div {
    width: 10%;
    display: inline-block;
    margin-left: 10px;
    position: absolute;
    top:0;
    right:15%;
	}
	.orderfundraisingfinish .top div div img {
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
		font-size: .35rem;
		padding: 10px 0;
		font-weight: 500;
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
    margin-left:.5rem;
    line-height: .7rem;
    font-size:.35rem;
  }
  .write-code input {
    display: inline-block;
    -webkit-appearance: none;
    width: 3rem;
    height: .76rem;
    border: none;
    background-color: #599C31;
    color: #FFFFFF;
    border-radius:.2rem;
    font-size: .35rem;
    float: right;
  }
  .write-code span {
    display: inline-block;
    -webkit-appearance: none;
    width: 3rem;
    height: .76rem;
    line-height: .76rem;
    text-align: center;
    border: none;
    background-color: rgb(150,157,163);
    color: #FFFFFF;
    border-radius: .2rem;
    font-size: .35rem;
    float: right;
  }
  .btn-more {
    position: fixed;
    bottom:.36rem;
    left: 5%;
    width: 90%;
    border-radius:10px;
    font-size: .5rem;
  }
  .btn-more input {
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
  .btn-more input:first-child {
    margin-bottom: 10px;
  }
  .btn-more input:last-child {
    background-color: #969DA3;
  }
  .benz-location{
    margin: 0 auto;
    overflow: hidden;
    margin-top: .8rem;
    text-align: center;
    font-weight: 600;
    font-size: .35rem;
  }

</style>
