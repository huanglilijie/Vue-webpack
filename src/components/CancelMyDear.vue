<template>
  <div class="wrap-cancelmydear">
  	<p>smart和远方怎能少了你...</p>
    <div>
      <img src="/static/images/car-img.png" alt="" />
    </div>
    <a class="continue" onclick="window.history.go(-1)">继续宠爱之旅</a>
    <a class="abandon" @click="refund">确认放弃</a>
  </div>
</template>
<script>
  import Config from '../../config/config'
  export default {
    name: 'cancelmydear',
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
      refund () {
        this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.reservationId + '/cancel').then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.$router.go({name: 'refundsubmit', query: {reservationId: this.reservationId}})
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      toBeContinue () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style type="text/css">
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
  .wrap-cancelmydear{
    background: url(/static/images/bg-img.png) no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
  }
  .wrap-cancelmydear p{
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    padding-top: 15vh;
  }
  .wrap-cancelmydear div{
    width: 80%;
    margin: 0 auto;
    margin-top: 10vh;
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
