<template lang="html">
  <div class="wrap">
      <div class="clock">
          <div class="loveresult">宠爱值：</div>
          <div class="clock">
            <div class="clock-bg">
              <img src="/static/images/clock.png" alt="">
              <div style="width:95%;margin:0 auto;height:auto;">
                <img src="/static/images/pointer.png" alt="" class="zhizhen" :style="{transform:'rotate('+rotate+'deg)'}">
              </div>
            </div>
            <div class="money">
                <span>{{shu}}</span><span>元</span>
            </div>
          </div>
      </div>
      <div class="list">
          <ul>
              <li>1.筹款达到1000-2999时，会补贴1000元</li>
              <li>2.筹款达到3000-4999时，会补贴1500元</li>
              <li>3.筹款达到5000-8800时，会补贴2000元</li>
          </ul>
      </div>
      <div class="rest">
          <h2>距离活动结束还有<span style="font-size:2.0rem">8</span>天</h2>
          <p> -------- 已有<span>1</span>位好友为你筹款 --------</p>
          <ul>
              <li>
                  <div class="tuxiang"><img src="/static/images/mayun.png" alt=""></div>
                  <div>
                      <span class="nickname">Dan</span>
                      <span class=" money_collecting"> 为你筹款<span>200元</span></span>
                      <span class="time_date">01-15</span>
                      <span class="time_time">11:35</span>
                  </div>

              </li>
          </ul>
      </div>
      <hr style="width: 90%;margin:0 auto;">
      <div class="submit">
          <input class="heart" type="button" value="心满意足">
          <div class="more_input">
              <input type="button" value="查看详情">
              <input type="button" value="再撒个娇">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rotate: 0,
      shu: 7000
    }
  },
  ready () {
    var self = this
    var i = self.shu / 31
    setInterval(function () {
      self.rotate++
      if (self.rotate > i) {
        self.rotate = i
      }
    }, 20)
  },
  methods: {
  }
}
</script>

<style lang="css">
html,body,ul{
    margin:0;
    padding: 0;
    font-family: 微软雅黑;
    font-size: 12px;
}
 @media (max-width: 350px) {
html,body {
font-size: 10px !important;
}
}
.clock-bg{
  position: relative;
  width: 75%;
  border-radius: 50%;
  margin:0 auto;
  background-position: center;
  background-size: 100%;
}
.clock-bg img:first-child{
  width: 100% !important;
}
  .zhizhen{
    position: absolute;
    width:100% !important;
    top:0;
    left:0;
}
ul{list-style: none}
.wrap{
    width: 100%;
    background:url('/static/images/bg.png') no-repeat;
    background-size: 100%;
    padding-top: 10px;
}
.clock{
    width:95%;
    margin:0px auto;
    text-align: center;
    position: relative;
}
.clock img{
    width:75%;
}
.loveresult{
    width:30% ;
    height:30px;
    line-height: 30px;
    background:url("/static/images/loveresult.png") no-repeat;
    background-size: 100% 100%;
    font-size: 1.3rem;
    color: white;
}
.money{
    width: 20%;
    height: 30px;
    line-height: 30px;
    background-color: red;
    color: #ffd201;
    background: url("/static/images/numbg.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    margin-left: -10%;
    bottom: 15%;
}
.money span:nth-child(1){
    font-size: 1.5rem;
}
.list{
    margin-top: 30px;
}
.list ul{
    width:90%;
    margin: 0 auto;
    overflow: hidden;
}
.list ul li{
    width:97%;
   height:30px;
    line-height: 30px;
    text-indent:60px;
    margin-top: 8px;
}
.list ul li:nth-child(1){
    background: url("/static/images/car1.png") no-repeat;
    background-size: contain;
    float: left;
}
.list ul li:nth-child(2){
    background: url("/static/images/car2.png") no-repeat;
    background-size: contain;
    float: right;

}
.list ul li:nth-child(3){
    background: url("/static/images/car3.png") no-repeat;
    background-size: contain;
    float: left;
}
.rest{
    text-align:center;
    width:90%;
    margin: 0 auto;
    padding-bottom: 10px;
}
.rest h2{
  padding:10px 0;
}
.rest p{
  padding-bottom: 10px;
}
.rest ul li{
    overflow: hidden;
}
.rest ul li div{
    height:40px;
    line-height: 40px;
}
.rest ul li div:nth-child(1){
    width:10%;
    float: left;
    margin-left: 2.5%;
}
.rest ul li div:nth-child(1) img{
    border-radius: 50%;
    height: 100%;
}
.rest ul li div:nth-child(2){
    width:80%;
    text-align: center;
    float: right;
}
.rest ul li div:nth-child(2) span{
    margin:0 2.5%;
}
.submit{
    width:90%;
    margin: 0 auto;
}
.submit input{
    border: none;
    font-size: 1.5rem;
    height:50px;
    color:white;
}
.heart{
    width:100%;
    background-color: #f6ba35;
    border-radius: 10px;
    margin-top: 30px;
     -webkit-appearance : none ;
}
.more_input{overflow: hidden;margin:30px 0;}

.more_input input{
    width:48%;
    background-color: #599c2f;
    border-radius: 5px;
    -webkit-appearance : none ;
}
.more_input input:nth-child(1){float: left}
.more_input input:nth-child(2){float: right}
</style>
