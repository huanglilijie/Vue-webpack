<template lang="html">
  <div class="wrap-pc">
    <div class="content-top">
      <ul>
        <li class="content-top-left">
          <img src="/static/images/benz-logo.png" alt="" />
          <img src="/static/images/benz-text.png"/>
        </li>
        <li class="content-top-right">
          <img src="/static/images/smart-logo.png"/>
        </li>
      </ul>
    </div>
    <div class="content-middle">
      <div class="content-middle-box">
        <div class="content-middle-left">
          <img src="/static/images/airballoon.png" class="airballoon"/>
          <img src="/static/images/content-img.png" class="smart-img"/>
          <div class="smart-group">
            <div class="smart-group1">
              <p>生活不只有眼前的路<br />还有smart和远方</p>
              <p>集全家宠爱于一身<br />助力梦想<br />坐拥购车豪礼</p>
            </div>
            <div class="smart-group2">
              <img src="/static/images/wechat-logo.png" alt="" />
              <p>请用微信扫描二维码</p>
            </div>
          </div>
          <img src="/static/images/smart-list.png" alt=""  class="process"/>
          <img src="/static/images/red-car.png" class="car-img"/>
        </div>
        <div class="content-middle-right">
          <ol>
            <li>用户需支付666元订金开启活动，订金将在成功众筹并购车时抵扣购车款。
            </li>
            <li>用户需分享众筹链接到朋友圈或发送给好友，邀请好友以现金红包形式支持该用户购车。众筹款项将于众筹结束并购车时抵扣购车款。
            </li>
            <li>用户邀请帮助自己众筹购车的人数不限，但众筹总金额不超过8800元。
            </li>
            <li>奖励政策: <br/>
             众筹金额大于等于1000元且小于3000元，将获得1000元补贴奖励；<br/>
             众筹金额大于等于3000元且小于5000元，将获得1500元补贴奖励；<br/>
             众筹金额大于等于5000元且小于等于8800元，将获得2000元购车补贴奖励；<br/>
             注：补贴奖励可在购车时抵扣购车款。
            </li>
            <li>用户可在活动期随时结束众筹并购车，结束时众筹款项、订金、补帖（如果有）将于购车时抵扣购车款。如果未手动结束众筹活动到期或筹款额满后，将自动结束众筹，等待用户到店。
            </li>
            <li>用户可在未提车前取消众筹，取消后订金和好友支付的众筹款项将退回帐户，您将无法获得任何补贴。
            </li>
            <li>活动名额仅限400人，支付订金成功后即表示参加。
            </li>
            <li>活动时间：4月1日–4月30日。活动时间到后，所有未筹满款的用户将自动筹款结束。
            </li>
            <li>
          	本活动最终解释权归戴姆勒-奔驰公司所有。
            </li>
          </ol>
        </div>
      </div>
    </div>
    <div class="content-bottom">
       北京梅赛德斯-奔驰销售服务有限公司对本活动享有最终解释权
    </div>
  </div>
</template>

<style media="screen">
.wrap-pc {
  width: 100%;
  height: 100vh;
  min-width: 1366px;
  position: relative;
}
.wrap-pc .content-top {
  height: 90px;
  background-color: #E7A003;
}
.wrap-pc .content-top ul {
  overflow: hidden;
}
.wrap-pc .content-top ul .content-top-left {
  float: left;
  /*line-height: 90px;*/
  margin-left: 20%;
  height: 90px;
  width: 215px;
  position: relative;
}
.wrap-pc .content-top ul .content-top-left img {
  vertical-align: middle;
}
.wrap-pc .content-top ul .content-top-left img:first-child {
  display: inline-block;
  height: 65px;
  position: absolute;
  top: 13px;
}
.wrap-pc .content-top ul .content-top-left img:last-child {
  position: absolute;
    top: 30px;
    right: 0;
}
.wrap-pc .content-top ul .content-top-right {
  position: absolute;
  right: 20%;
  top: 0;
  line-height: 13vh;
  height: 13vh;
}
.wrap-pc .content-middle {
  width: 100%;
  height: 78.778vh;
  background: url(/static/images/pc-bg.jpg) no-repeat;
  background-size: 100% 100%;
  background-position: top top;
}
.wrap-pc .content-middle .content-middle-box {
  width: 54.583%;
  margin: 0 auto;
  overflow: hidden;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left {
  float: left;
  width: 50%;
  height: 78.778vh;
  position: relative;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .airballoon {
  position: absolute;
  top: 15%;
  left: 0%;
  width: 20%;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .smart-img {
  width: 90%;
  margin-top:3.664%;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .smart-group {
  overflow: hidden;
  margin-top: 3.121%;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .smart-group .smart-group1 {
  float: left;
  margin-left: 20%;
  width: 40%;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .smart-group .smart-group1 p {
  margin-bottom: 15px;
  font-size: 16px;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .smart-group .smart-group2 {
  float: right;
  margin-right: 10%;
  width: 30%;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .smart-group .smart-group2 img {
  width: 100%;
  display: block;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .smart-group .smart-group2 p{
  font-size: 12px;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .process {
  width: 90%;
  display: block;
  margin: 0 auto;
}
.wrap-pc .content-middle .content-middle-box .content-middle-left .car-img {
  width: 90%;
  position: absolute;
  right: -4%;
  margin-top: 5px;
}
.wrap-pc .content-middle .content-middle-box .content-middle-right {
  float: right;
  width: 50%;
  height: 78.778vh;
}
.wrap-pc .content-middle .content-middle-box .content-middle-right ol {
  background-color: rgba(249, 207, 114, 0.5);
  padding: 10px 20px;
  padding-left: 30px;
  border-radius: 10px;
  margin-top: 10vh;
  margin-left: 3vh;
}
.wrap-pc .content-middle .content-middle-box .content-middle-right ol li {
  font-size: 12px;
  margin-bottom: 1px;
}
.wrap-pc .content-bottom {
  width: 100%;
  height: 8.896vh;
  background-color: #E7A003;
  font-size: 18px;
  text-align: center;
  line-height: 8.896vh;
}
/*@media screen and (max-width: 1400px){
  html,
body {
  font-size: 10px;
}
.content-middle-right li{
  font-size: 1.2rem !important;
}*/
</style>
