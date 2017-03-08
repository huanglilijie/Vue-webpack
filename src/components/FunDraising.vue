<template lang="html">
  <div class="wrap-fundraising">
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
      <div class="rest">
          <h1>筹款结束</h1>
          <p> -------- 已有<span>{{lists.length}}</span>位好友为你筹款 --------</p>
          <ul>
              <li v-for="item in lists">
                  <div class="tuxiang"><img :src="item.wechat.headImgUrl" alt=""></div>
                  <div>
                      <span class="nickname">{{item.wechat.nickName}}</span>
                      <span class="money_collecting"> 为你筹款{{item.amount}}元</span>
                      <span class="time_date">{{item.md}}</span>
                      <span class="time_time">{{item.hm}}</span>
                  </div>
              </li>
          </ul>
          <h1>距离活动结束还有 <span>{{dates}}</span> 天</h1>
      </div>
      <div class="submit">
          <div class="more_input_fundrais">
              <input type="button" value="查看详情" @click="viewDetails()">
              <div class="share"  @click="pumpshow()">
                <span>邀请好友参与</span>
                <span>“全家宠爱”</span>
              </div>
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
      isfirst: false,
      mask: false,
      totalamount: 0,
      lists: [],
      dates: 0,
      orderId: ''
    }
  },
  created () {
    var isfirst = this.$route.query.isfirst
    var orderId = this.$route.query.orderId
    if (isfirst) {
      this.$set('mask', isfirst)
    }
    this.$set('orderId', orderId)
  },
  ready () {
    this.getfunds()
  },
  methods: {
    viewDetails () {
      this.$router.go({name: 'orderfundraisingend', query: {orderId: this.orderId}})
    },
    pumpshow () {
      this.mask = !this.mask
    },
    getfunds () {
      // 根据订单号获取筹款明细
      this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.orderId + '/funds')
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
        if (totalamount !== 0) {
          totalamount = totalamount.toFixed(2)
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
      })
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
    /*background: #fff;*/
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
.wrap-fundraising{
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
  font-size: .6rem;
  color: white;
}
.money{
    width: 20%;
    height: 30px;
    line-height: 30px;
    color: #ffd201;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    margin-left: -10%;
    bottom: 15%;
}
.money span:nth-child(1){
    font-size: .4rem;
}
.money span:nth-child(2){
    font-size: .36rem;
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
  font-size: .36rem;
}
.list ul li:nth-child(2){
    background: url("/static/images/car2.png") no-repeat;
    background-size: contain;
    float: right;
    font-size: .36rem;
}
.list ul li:nth-child(3){
    background: url("/static/images/car3.png") no-repeat;
    background-size: contain;
    float: left;
    font-size: .36rem;
}
.rest{
    text-align:center;
    width:90%;
    margin: 0 auto;
    padding-bottom: 10px;
}
.rest h1{
  margin:20px 0;
  font-size: .6rem;
  font-weight: 500;
}
.rest h2{
  padding:10px 0;
}
.rest p{
  font-size: .4rem;
  padding-bottom: 10px;
  font-weight: 500;
}
.rest ul li{
    overflow: hidden;
    border-bottom: 1px dashed #D5D5D5;
    font-size: .36rem;
}
.rest ul li div{
    height:1.49rem;
    line-height:1.49rem;
}
.rest ul li div:nth-child(1){
  float: left;
  /*margin-left: 2.5%;*/
  width: 20%;
  height: 100%;
}
.rest ul li div:nth-child(1) img{
    vertical-align: middle;
    border-radius: 1rem;
    width: 1.11rem;
    height: 1.11rem;
}
.rest ul li div:nth-child(2){
    width:80%;
    text-align: left;
    float: right;
    font-size: .36rem;
}
.rest ul li div:nth-child(2) span{
    overflow: hidden;
}
.submit-dealer1{
    width:90%;
    margin: 0 auto;
}
.submit input{
    border: none;
    height:60px;
    color:#FFFFFF;
}
.heart{
    width:100%;
    background-color: #f6ba35;
    border-radius: 10px;
    margin-top: 30px;
     -webkit-appearance : none ;
}
.more_input_fundrais{overflow: hidden;padding:0 0 30px 0;margin:0 auto;width: 90%;}

.more_input_fundrais input{
    font-size:.5rem;
    width:48%;
    background-color: #F6BA38;
    border-radius: .1rem;
    -webkit-appearance : none ;
    line-height: 1.65rem;
}
.more_input_fundrais>div{
    height:60px;
   width:48%;
     color:#FFFFFF;
    background-color: #F6BA38;
     font-size:.5rem;
    border-radius: .1rem;
    -webkit-appearance : none ;
    text-align: center;
}
 .more_input_fundrais>div span{
  display: block;
  height: 30px;
  line-height: 30px;
 }
.more_input_fundrais input:nth-child(1){float: left}
.more_input_fundrais>div:nth-child(2){float: right}
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
/*好友信息详细style*/
.nickname{
  display: inline-block;
  width: 20%;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.money_collecting{
  width: 40%;
  display: inline-block;
  text-align: center;
}
.time_date{
  width: 15%;
  display: inline-block;
  text-align: center;
}
.time_time{
  width: 15%;
  display: inline-block;
  text-align: center;
}
</style>
