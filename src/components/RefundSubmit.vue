<template>
  <div class="wrap-refundsubmit">
    <p>您的订单退款申请已提交，<br />
    请耐心等待客服处理！</p>
    <a class="continue" @click="orderDetail">查看详情</a>
    <a class="abandon" @click="closepage">再见</a>
  </div>
</template>
<script>
  import wx from 'wx'
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
      closepage () {
        wx.closeWindow()
      },
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
    font-family: "微软雅黑";
    width: 100%;
    height: 100vh;
  }
  ul,li{
    list-style: none;
  }
  .wrap-refundsubmit{
    background: url(/static/images/bg2-img.jpg) no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
  }
  .wrap-refundsubmit p{
    width: 70%;
    margin:0 auto;
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
    padding-top: 15vh;
    color: #FFFFFF;
    font-size:.4rem;
  }
  .abandon,.continue{
    position: fixed;
    height: 1.6rem;
    text-decoration: none;
    width: 90%;
    left: 5%;
    line-height: 1.6rem;
    text-align: center;
    color: #ffffff;
    font-size: .5rem;
    border-radius:5px;
  }
  .abandon{
    bottom: .38rem;
    background-color: #969DA3;
  }
  .continue{
    bottom: 2.3rem;
    background-color: #F6BA38;
  }
</style>
