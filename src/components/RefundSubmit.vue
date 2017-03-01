<template>
  <div class="wrap">
    <p>您的订单退款申请已提交，<br />
    请耐心等待客服处理！</p>
    <a href="" class="continue" @click="orderDetail">查看详情</a>
    <a href="" class="abandon">再见</a>
  </div>
</template>
<script>
  export default {
    name: 'refundsubmit',
    data () {
      return {
        reservationId: ''
      }
    },
    created () {
      var reservationId = this.$route.query.reservationId
      this.$set('reservationId', reservationId)
    },
    methods: {
      orderDetail () {
        this.$router.go({name: 'orderrefunded', query: {reservationId: this.reservationId}})
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
    height: 100vh;
  }
  ul,li{
    list-style: none;
  }
  img{
    display: block;
    width: 100%;
  }
  @media (max-width: 350px) {
    html,
    body {
      font-size: 10px !important;
    }
  }
  .wrap{
    background: url(/static/images/bg2-img.jpg) no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
  }
  .wrap p{
    width: 58%;
    margin: 0 auto;
    text-align: left;
    font-size: 1.4rem;
    font-weight: 600;
    padding-top: 15vh;
    color: #FFFFFF;
  }
  .abandon,.continue{
    position: fixed;
    height: 50px;
    text-decoration: none;
    width: 90%;
    left: 5%;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
    font-size: 1.6rem;
    border-radius: 5px;
  }
  .abandon{
    bottom: 10px;	
    background-color: #969DA3;
  }
  .continue{				
    bottom: 70px;			
    background-color: #F6BA38;				
  }
</style>