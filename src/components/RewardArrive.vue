<template>
  <div class="wrap">
    <div class="content">
      <div class="top">
        <p>您的心意800元已成功送达</p>
        <p>TA的smart已在路上，你的呢</p>
      </div>
    </div>
    <a href="" class="btn">送出心意</a>
    <div class="form-group">
      <a href="">创建我的宠爱之旅</a>
      <a href="">返回</a>
    </div>
  </div>
</template>
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
  .wrap {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
  }
  .wrap .content {
    width: 100%;
    background: url(/static/images/imgtitle-bg.png) no-repeat;
    background-size: 100% 100%;
    min-height: 70%;
    padding-top: 20%;
  }
  .wrap .content .top {
    width: 90%;
    margin: 0 auto;
    background: url(/static/images/center-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding-top: 50px;
    min-height: 130px;
  }
  .wrap .content .top p {
    text-align: center;
    font-size: 1.6rem;
    color: #FFFFFF;
  }
  .wrap .content .top .text-big {
    width: 80%;
    margin: 0 auto;
    font-size: 2.4rem;
    color: #F4DA9F;
    padding: 10px;
    border-bottom: 2px solid #FFFFFF;
  }
  .wrap .content .top p:last-child {
    margin-top: 10px;
  }
  .wrap .btn {
    display: block;
    margin: 0 auto;
    width: 90%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #F6BA38;
    border-radius: 5px;
    color: #FFFFFF ;
    font-size: 1.3rem;
    text-decoration: none;
  }
  .wrap .form-group{
    width: 90%;
    margin: 0 auto;
    margin-top:10px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .wrap .form-group a{
    display: block;
    text-decoration: none;
    height: 50px;
    width: 45%;
    line-height: 50px;
    text-align: center;
    color: #FFFFFF;
    font-size: 1.3rem;
    background-color:#599C31; 
    float: left;
    border-radius: 5px;			
  }
  .wrap .form-group a:last-child{
    float: right;
  }
  @media screen and (min-height: 600px) {	
    .wrap .content {
      width: 100%;
      background: url(/static/images/imgtitle-bg.png) no-repeat;
      background-size: 100% 100%;
      min-height: 70%;
      padding-top: 20%;
    }	
    .wrap .form-group{
      position: fixed;
      bottom: 0;
      width: 90%;
      left: 5%;
    }
    .wrap .btn{
      position: fixed;
      bottom: 70px;
      width: 90%;
      left: 5%;
    }
  }			
</style>