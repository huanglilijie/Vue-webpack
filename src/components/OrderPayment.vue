<template>
  <div class="wrap">
    <div class="top">
      <div>
          <p>已支付</p>
          <div><img src="/static/images/headset.png" alt="" /></div>    
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
          <div>2017-1-03</div>    
        </li>
        <li class="car-message clearfloat">
          <label for="">车型信息:</label>
          <div>全新smart forfour 4门4座车</div>
        </li>
        <li class="car-message clearfloat">
          <label for="">经销商信息:</label>
          <div>
            <p>{{dealer[0].name}}</p>
            <p>{{dealer.telephone}}</p>
          </div>
        </li>
        <li class="car-message clearfloat">
          <label for="">订单金额:</label>
          <div>{{product.price}}元</div>
        </li>
      </ul>
      <p class="text"><span>已成功预订</span><span>即刻开启筹款</span></p>
      <p class="text1">距离活动结束还有<span>{{dates}}</span>天</p>
      <p class="text">快去筹款吧！</p>
      <div class="btn-more">
        <input type="button" value="创建我的宠爱之旅"/>
        <input type="button" value="放弃宠爱之旅"/>
      </div>
    </div>    
  </div>
</template>
<script>
  export default {
    name: 'payment',
    data () {
      var nd = new Date()
      var ld = new Date('2017-04-30')
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      if (dates <= 0) {
        dates = 0
      }
      return {
        updateTime: '',
        reservationId: '123',
        orderStatus: '',
        product: [{
          id: '',
          createTime: '',
          status: '',
          price: '123'
        }],
        customerId: '',
        dealer: [{
          name: '一直加班公司',
          telephone: '010-888888',
          totalAmount: ''
        }],
        payment: [{
          amount: '',
          payStatus: '',
          payChannel: ''
        }],
        dates: dates
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
      text-align: left;
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
        border-bottom: none;
    }
    
    .text{
        width: 85%;
        margin: 0 auto;
        font-size: 2.0rem;
        text-align: center;
        font-weight: 600;
        margin-top: 20px;
        margin-bottom: 20px;
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
        font-size: 1.2rem;
        margin: 0 auto;
        text-align: center;            
    }
    .text1 span{
        font-size: 2.0rem;
        font-weight: 600;    
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
        width:100%;
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