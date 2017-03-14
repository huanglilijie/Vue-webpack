<template>
  <div class="wrap">
    <div class="content">
      <div class="content_titlepad">
        <h2>上牌城市的说明</h2>
      </div>
      <div class="line"></div>
      <div class="content_word">
        <p>为了保证服务质量，请您购车后在该活动中提
交意向金时选定的上牌城市上牌，如您选择在
购车经销商所在城市以外的地区上牌，具体事
宜请于该经销商协商。</p>
      </div>
    </div>
    <a class="btn">知道了</a>
  </div>
</template>
<style>
html,body{
    font-family: "微软雅黑";
    width:100%;
    height:100%;
    background-color: #fff;
    }
.wrap{
  width:100%;
  height:100%;
  background: url('/static/images/wherebg.png') no-repeat;
  background-size:100%;
  padding-top: 50px;

}
.content{
  width:80%;
  min-height:90%;
  margin: 0 auto;
  background: url('/static/images/pumpbg.png') no-repeat;
  background-size: 100%;
  box-sizing: border-box;
  padding-top:35% ;
}
.line{
  width:100%;
  height:0px;
  border-bottom: 2px white dashed;
  margin: 10px auto;
}
.content_titlepad{
  text-align: center;
}

.content_word{
  box-sizing: border-box;
  padding: 0px 10px;
}

.btn{
  display: block;
  width: 90%;
  left: 5%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 1.5rem;
  text-decoration: none;
  color: #FFFFFF;
  position: fixed;
  bottom: 10px;
  border-radius: 10px;
  background-color: #F6BA38;
}
</style>
