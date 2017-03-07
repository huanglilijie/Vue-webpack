<template>
  <div class="wrap">
    <img src="/static/images/title-img.jpg"/>
    <div class="content">
	  <p class="text">活动已经结束<br />smart和远方要有，生活还要继续</p>
	  <img src="/static/images/think.png" alt="" class="think-man"/>
	  <p class="text1">奔驰世界，无限精彩<br />https://estore.mercedes-benz.com.cn</p>
	  <a href="###" class="btn">再见</a>
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
  .wrap{
    width: 100%;
    height: 100%;				
  }
  .content{
    box-sizing: content-box;
    background: url(/static/images/content-bg.jpg) no-repeat;
    width: 100%;
    background-size: 100% 100%;
    padding-top: 6%;
    min-height:calc(background);
    padding-bottom:10px;
  }
  .content p{
    text-align: center;
  }
  .text{
    font-size: 1.3rem;
    font-weight: bold;
  }
  .think-man{
    width: 50%;
    margin: 0 auto;
    margin-top: 10px;
  }
  .btn{
    width: 90%;
    margin: 0 auto;
    display: block;
    text-decoration: none;
    color: #FFFFFF;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #F6BA38;
    margin-top: 10px;
    font-size: 1.5rem;
    border-radius: 5px;
  }
  .text1{
    margin-top: 10px;
  }
</style>