<template lang="html">
  <div class="wrap">
      <div class="content">
          <h1>您已筹得<span>8800</span>元</h1>
          <p>将获得2000元购车补贴</p>
      </div>
      <div class="content_btn">
          <input type="button" value="OK , 我的smart已在路上">
          <input type="button" value="还不够，再多宠爱我一点">
      </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="css">
html,body{
    margin:0;
    padding: 0;
    font-family: 微软雅黑;
    font-size: 12px;
    width:100%;
    height:100%;
}
@media (max-width: 350px) {
  html,body {
    font-size: 10px !important;
    }
  }
h1{color:white;}
  .wrap{
      width:100%;
      height:100%;
      background: url("/static/images/redpacket.png") no-repeat;
      background-size:100%;
  }
div{text-align: center;}
  .content{
    padding-top: 50px;
  }
  .content p{
      margin: 0 auto;
      text-align: center;
      line-height: 30px;
      width:80%;
      height:30px;
      background:url("/static/images/title-bg.png") no-repeat ;
      background-size: 100%;
      font-size: 1.5rem;
  }
  .content_btn{
      width: 90%;
      position: fixed;
      bottom: 30px;
      left:5%;
  }
  .content_btn input{
      width: 100%;
      height:50px;
      border:none;
      border-radius: 10px;
      color: white;
      font-size: 1.5rem;
      -webkit-appearance: none;
      cursor: pointer;
  }
  .content_btn input:nth-child(1){
      background-color: #f6ba35;
      margin-bottom: 10px;
  }
  .content_btn input:nth-child(2){
      background-color: #969da3;
  }
</style>
