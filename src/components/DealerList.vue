<template lang="html">
  <div class="wrap-dealerlist">
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
            <span>{{totalamount}}</span><span>元</span>
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
    <div class="rest" v-if="totalamount > 0">
      <h2>距离活动结束还有<span style="font-size:2.0rem">{{dates}}</span>天</h2>
      <p> -------- 已有<span>{{lists.length}}</span>位好友为你筹款 --------</p>
      <ul>
          <li v-for="item in lists">
              <div class="tuxiang"><img :src="item.wechat.headImgUrl" alt=""></div>
              <div>
                  <span class="nickname">{{item.wechat.nickName}}</span>
                  <span class=" money_collecting"> 为你筹款<span>{{item.amount}}元</span></span>
                  <span class="time_date">{{item.md}}</span>
                  <span class="time_time">{{item.hm}}</span>
              </div>

          </li>
      </ul>
    </div>
    <div class="rest" v-else>
      <h2>距离活动结束还有<span style="font-size:2.0rem">{{dates}}</span>天</h2>
      <p> -------- 还没有好友为你筹款 --------</p>
      <p>加油哦，快去分享吧！大礼包在等着你</p>
    </div>
    <hr style="width: 90%;margin:0 auto;" v-show="totalamount > 0">
    <div class="submit-dealer1">
        <input class="heart" type="button" value="心满意足" @click="submit()">
        <div class="more_input_dealerlist">
            <input type="button" value="查看详情" @click="viewDetails()">
            <input type="button" value="再撒个娇" @click="pumpshow()">
        </div>
    </div>
    <div class="mask" v-if = "mask">
      <div class="mask_1" @click="pumpshow()">
      </div>
      <div class="mask_2">
        <img src="/static/images/mask.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import Config from '../../config/config'
import Golab from '../libs/golab'
export default {
  data () {
    return {
      rotate: 0,
      shu: 7000,
      isfirst: false,
      mask: false,
      totalamount: 0,
      lists: [],
      dates: 0
    }
  },
  created () {
  },
  ready () {
    // 判断是不是创建邀请函第一次进入页面
    var isfirst = this.$route.query.isfirst
    if (isfirst) {
      this.$set('mask', isfirst)
    }
    this.getfunds()
  },
  methods: {
    // 页面跳转穿参数
    submit () {
      var totalamount = this.totalamount
      if (totalamount === 0) {
        this.$router.go({name: 'endfundraising'})
      } else if (totalamount > 1000) {
        this.$router.go({name: 'completefundraising', query: {totalamount: this.totalamount}})
      } else if (totalamount > 0 && totalamount < 1000) {
        this.$router.go({name: 'smallfundrais', query: {totalamount: this.totalamount}})
      }
    },
    viewDetails () {
      this.$router.go({name: 'orderfundraising'})
    },
    pumpshow () {
      this.mask = !this.mask
    },
    getfunds () {
      // 根据订单号获取筹款明细
      this.$http.get(Config.API_ROOT + 'ecommerce/order/' + '111' + '/funds')
      .then((response) => {
        var data = response.data
        var totalamount = 0
        for (var i in data) {
          totalamount += data[i].amount
          var cdate = new Date(data[i].createTime)
          var month = cdate.getMonth() + 1
          var date = cdate.getDate()
          var hours = cdate.getHours()
          var minutes = cdate.getMinutes()
          month = month < 10 ? '0' + month : month
          date = date < 10 ? '0' + date : date
          hours = hours < 10 ? '0' + hours : hours
          minutes = minutes < 10 ? '0' + minutes : minutes
          data[i].md = [month, date].join('-')
          data[i].hm = [hours, minutes].join(':')
        }
        this.$set('lists', data)
        this.$set('totalamount', totalamount)
        var self = this
        var n = totalamount / 31
        // console.log(n)
        setInterval(function () {
          self.rotate++
          if (self.rotate > n) {
            self.rotate = n
          }
        }, 20)
      }).catch((response) => {
        console.log(response)
      }
    )
      // 获取活动剩余天数
      var nd = new Date()
      var ld = new Date(Golab.endDate)
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      if (dates <= 0) {
        dates = 0
      }
      this.$set('dates', dates)
    }
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
.wrap-dealerlist{
    width: 100%;
    background:url('/static/images/bg.png') no-repeat #fff;
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
.submit-dealer1{
    width:90%;
    margin: 0 auto;
}
.submit-dealer1 input{
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
.more_input_dealerlist{overflow: hidden;padding:30px 0;}

.more_input_dealerlist input{
    width:48%;
    background-color: #599c2f;
    border-radius: 5px;
    -webkit-appearance : none ;
}
.more_input_dealerlist input:nth-child(1){float: left}
.more_input_dealerlist input:nth-child(2){float: right}
/*蒙板*/
.mask_1{
    background-color:rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    text-align: center;
}
.mask_2{
    width: 100%;
    position: fixed;
    top: 5vh;
    z-index: 20;
    text-align: center;
}
.mask_2 img{
    width:80%;
}
</style>
