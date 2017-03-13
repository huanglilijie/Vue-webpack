<template>
  <div class="wrap">
    <img src="/static/images/imgtitle.jpg"/>
    <div class="content">
      <div class="content-pic">
        <p class="p-no1">对不起<br />我的宠爱之旅已退订...</p>
      </div>
      <p class="p-no2">已支付的打赏金额将退回原支付账户<br/>（退款周期请参照第三方支付平台规定）</p>
      <div class="btn-finish">
        <div class="btn-group">
          <a @click="newDream">创建我的宠爱之旅</a>
          <a @click="closepage">再见</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import wx from 'wx'
  export default {
    methods: {
      newDream () {
        this.$router.go({name: 'home'})
      },
      closepage () {
        wx.closeWindow()
      }
    }
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,body {
    font-size: 12px;
    font-family: "微软雅黑";
    width: 100%;
    height: 100%;
  }
  ul,li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
  }
  @media (max-width: 350px) {
    html,body {
      font-size: 10px !important;
    }
  }
  .wrap{
    width: 100%;
    height: 100%;
  }
  .content{
    background: url(/static/images/content-bg.jpg) no-repeat;
    width: 100%;
    background-size: 100% 100%;
    padding-top: 15%;
    padding-bottom: 30%;
    min-height: calc(background);
    display: table;
  }
  .content-pic{
    margin: 0 auto;
    text-align: right;
    background: url(/static/images/text-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center bottom;
    min-height: 3rem;
    padding-top: 30%;
    color: #ffffff;
  }
  .content-pic .p-no1{
    width: 51%;
    float: right;
    text-align: left;
    font-size: .45rem;
    }
  .p-no2{
    width: 80%;
    text-align: center;
    font-size: .35rem;
    display: block;
    margin: 2% auto 1%;
      }
  .btn-finish{
    width: 100%;
    background: #fff;
  }
  .btn-group{
    width: 90%;
    margin: 0 auto;
    position: fixed;
    left: 5%;
    bottom: 0;
  }
  .btn-group a{
    width: 48%;
    display: block;
    text-decoration: none;
    color: #FFFFFF;
    height: 1.64rem;
    line-height: 1.64rem;
    text-align: center;
    background-color: #F6BA38;
    font-size: .5rem;
    border-radius: .2rem;
    margin-bottom: 30px;
  }
  .btn-group a:first-child{
    float: left;
  }
  .btn-group a:last-child{
    float: right;
    background-color: #599C31;
  }
</style>
