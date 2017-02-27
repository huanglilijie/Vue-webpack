<template>
  <div class="wrap">
  	<p>smart和远方怎能少了你...</p>
    <div>
      <img src="/static/images/car-img.png" alt="" />
    </div>
    <a href="###" class="continue" @click="toBeContinue">继续宠爱之旅</a>
    <a href="###" class="abandon" @click="refundSubmit">确认放弃</a>
  </div>
</template>
<script>
  export default {
    name: 'cancelmydear',
    data () {
    },
    methods: {
      refundSubmit () {
        this.$router.go({name: 'refundsubmit'})
      },
      toBeContinue () {
        this.$router.go({name: 'home'})
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
  .wrap{
    background: url(/static/images/bg-img.png) no-repeat;
    background-position: center;
    background-size: cover;
    height: 100%;
  }
  .wrap p{
    text-align: center;
    font-size: 1.6rem;
    font-weight: 600;
    padding-top: 15vh;
  }
  .wrap div{
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