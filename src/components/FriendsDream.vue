<template>
  <div class="wrap">
    <div class="top">
      <img src="/static/images/imgtitle.jpg" alt="" />
    </div>
    <div class="content">
      <img src="/static/images/img-road.png" />
      <p class="text text-top">嘿！我打算买一辆</p>
      <p class="text1">全新smart forfour 4门4座车</p>
      <p class="text">开着它<br/>和可爱又美好的你一起去远方旅行</p>
      <p class="text">宠爱我一次<br/>为了答谢你，我会：</p>
      <div class="text-bg">
	    带你兜风带你飞，带你去见谁谁谁
      </div>
      <p class="text-bottom">----------已有5位好友为我筹款-----------</p>
      <a href="" class="btn">发个红包宠爱他</a>
      <a href="" class="btn btn-bottom">创建我的宠爱之旅</a>
    </div>
  </div>
</template>
<script>
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
    html,
    body {
      font-size: 10px !important;
    }
  }
  .wrap {
    width: 100%;
    height: 100%;
  }
  .wrap .top {
    width: 100%;
  }
  .wrap .content {
    width: 100%;
    background: url(/static/images/img-bg.jpg) no-repeat;
    background-position: center;
    background-size: cover;
    min-height: calc(background);
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .wrap .content img {
    width: 100%;
  }
  .wrap .content p {
    width: 70%;
    margin: 0 auto;
    text-align: left;
  }
  .wrap .content .text {
    margin-bottom: 8px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .wrap .content .text-top {
    margin-top: 8px;
  }
  .wrap .content .text1 {
    margin-bottom: 8px;
    font-size: 1.6rem;
    font-weight: 600;
  }
  .wrap .content .text-bg {
    text-align: center;
    margin: 0 auto;
    width: 90%;
    height: 60px;
    background: url(/static/images/text-bg.jpg) no-repeat;
    background-size: 100% 100%;
    background-position: center;
    line-height: 60px;
    font-weight: bold;
    font-size: 1.25rem;
    text-align: center;
  }
  .wrap .content .text-bottom {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .wrap .content .btn {
    width: 90%;
    margin: 0 auto;
    display: block;
    height: 50px;
    background-color: #F6BA38;
    border-radius: 5px;
    text-decoration: none;
    line-height: 50px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 2px;
  }
  .wrap .content .btn-bottom {
    margin-top: 10px;
    background-color: #599C31;
  }
</style>