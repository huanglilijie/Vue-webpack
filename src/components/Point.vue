<template>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <title></title>
  <div class="wrap-point">
    <div class="content">
        <p class="text-bg">>>smart&nbsp;&nbsp;全家宠爱 !</p>
        <img src="/static/images/cloud.png" alt=""  class="cloud"/>
        <p class="text">发起我的筹款，集全家宠爱于一身</p>
        <div class="line"></div>
        <p class="text">还能享受smart购车大礼包</p>
        <div class="code">
            <img src="/static/images/ma.png" />
        </div>
        <p class="text1">亲，活动只能于微信端参与<br />
            微信长按识别或扫描二维码呗</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style type="text/css">
html,
body {
    font-family: "微软雅黑";
    width: 100%;
    height: 100%;
}
.code img {
    display: block;
    width: 100%;
}
.wrap-point{
    width: 100%;
    height: 100%;
    background-color: #F6BA38;
}
.wrap-point .content .text-bg{
    text-align: center;
    font-weight: bold;
    font-size:1.01rem;
    color: #ffffff;
    padding-top: 20%;
}
.wrap-point .cloud{
    width: 98%;
    margin: 0 auto;
    margin-top: 10px;
}
.wrap-point .content .text{
    width: 80%;
    margin: 0 auto;
    text-align: left;
    font-size:.59rem;
    color: #ffffff;
    margin-bottom: 5px;
}
.wrap-point .content .line{
    width: 80%;
    margin: 0 auto;
    height: 0;
    border-bottom: 1px dashed #FFFFFF;
    margin-bottom: 5px;
}
.code{
    box-sizing: border-box;
    width: 80%;
    margin: 0 auto;
    background: url(/static/images/ma-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding:15% 25% 20%;
    margin-top: 20px;
}
.content .text1{
    width: 80%;
    margin: 0 auto;
    text-align: center;
    font-size: .5rem;
    color: #333;
    margin-top: .65rem;
    font-weight: 600;
}
@media (max-height: 480px) {
    .wrap{
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    background-color: #F6BA38;
}
}

</style>
