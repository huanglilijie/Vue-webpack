<template>
  <div class="wrap">
    <div class="content">
      <div class="top">
        <p>您的心意{{pageParam.reward}}元已成功送达</p>
        <p>TA的smart已在路上，你的呢</p>
      </div>
    </div>
    <a class="btn" @click="rewardSend">在宠一次</a>
    <div class="form-group">
      <a @click="newDream">创建我的宠爱之旅</a>
      <a @click="friendHome">返回</a>
    </div>
    <div v-if='pageParam.pageFlag'>
      <div class="pump">
        <p>您的好友已经达到宠爱额度</p>
      </div>
      <div class="mask"></div>  
    </div> 
  </div>
</template>
<script>
  import Golab from '../libs/golab'
  import Config from '../../config/config'
  export default {
    data () {
      return {
        pageParam: {}
      }
    },
    ready: function () {
      var reward = this.$route.query.reward
      console.log(reward)
      var param = {
        reward: reward,
        pageFlag: false
      }
      this.$set('pageParam', param)
    },
    created () {
    },
    methods: {
      newDream () {
        this.$router.go({name: 'home'})
      },
      rewardSend () {
        var self = this
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.orderId + '/funds').then((response) => {
          if (response.data != null) {
            var data = response.data
            var totalamount = 0
            for (var i in data) {
              totalamount = totalamount + data[i].amount
            }
            if (Golab.gradeamount_4 === totalamount.toFixed(2)) {
              this.pageParam.pageFlag = !this.pageParam.pageFlag
              setTimeout(function () {
                self.$router.go({name: 'friendsdreamfinish'})
              }, 2000)
            } else {
              this.$router.go({name: 'rewardsend', query: this.pageParam})
            }
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      friendHome () {
        var self = this
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.orderId + '/funds').then((response) => {
          if (response.data != null) {
            var data = response.data
            var totalamount = 0
            for (var i in data) {
              totalamount = totalamount + data[i].amount
            }
            if (Golab.gradeamount_4 === totalamount.toFixed(2)) {
              self.$router.go({name: 'friendsdreamfinish'})
            } else {
              self.$router.go({name: 'friendsdream'})
            }
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    }
  }
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
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 2;
  }
  .pump{
    background: url(/static/images/pump-bg.png) no-repeat;
    background-size: 100% 100%;
    min-height: 100px;
    padding-top:35%;
    position: absolute;
    top: 8vh;
    width: 80%;
    left: 10%;
    z-index: 3;
  }
  .pump p{
    text-align: center;
    font-size: 1.4rem;
    font-weight: bold;
  }			
</style>