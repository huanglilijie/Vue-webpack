<template>
  <title>心意已送到</title>
  <div class="wrap-reward">
    <div class="content">
      <div class="top">
        <p>您的心意{{pageParam.reward}}元已成功送达</p>
        <p>TA的smart已在路上，你的呢</p>
      </div>
    </div>
    <div class="reward-bottom">
    <a class="btn" @click="rewardSend">再宠一次</a>
    <div class="form-group">
      <a @click="newDream">创建我的宠爱之旅</a>
      <a @click="friendHome">返回</a>
    </div>
  </div>
    <div v-if='pageParam.pageFlag'>
      <div class="pump">
        <p v-if='isinactivity'>您的好友已经达到宠爱额度</p>
        <p v-else>活动已结束</p>
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
        pageParam: {},
        isinactivity: true
      }
    },
    ready: function () {
      var reward = this.$route.query.reward
      var orderId = this.$route.query.orderId
      var useropenid = this.$route.query.useropenid
      console.log(reward)
      var param = {
        reward: reward,
        orderId: orderId,
        pageFlag: false,
        useropenid: useropenid
      }
      this.$set('pageParam', param)
      this.closeFundraising()
    },
    created () {
    },
    methods: {
      closeFundraising () {
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.pageParam.orderId + '/funds').then((response) => {
          if (response.data != null) {
            var data = response.data
            var totalamount = 0
            for (var i in data) {
              totalamount = totalamount + data[i].amount
            }
            if (totalamount.toFixed(2) >= Golab.gradeamount_4.toFixed(2)) {
              // 筹款已达最高限额，自动结束筹款
              // 注意操作订单需要MME-TOKEN,在好友进入邀请函首页，已获取
              this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.pageParam.orderId + '/funded', {}).then((response) => {
                if (response.status === 200) {
                  this.$router.go({name: 'rewardarrive', query: {'orderId': this.orderId, 'reward': this.reward}})
                }
              }).catch((response) => {
                console.log(response)
              })
            }
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      newDream () {
        this.$router.go({name: 'home'})
      },
      rewardSend () {
        var self = this
        // 判断活动日期
        var nd = new Date()
        var ld = new Date(Golab.endDate)
        var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
        // 活动已结束
        if (dates <= 0) {
          this.$set('isinactivity', false)
          this.pageParam.pageFlag = !this.pageParam.pageFlag
          setTimeout(function () {
            self.$router.go({name: 'friendsactivityend'})
          }, 2000)
        } else {
          // 判断筹款是否已完成
          this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.pageParam.orderId + '/funds').then((response) => {
            if (response.data != null) {
              var data = response.data
              var totalamount = 0
              for (var i in data) {
                totalamount = totalamount + data[i].amount
              }
              if (totalamount.toFixed(2) >= Golab.gradeamount_4.toFixed(2)) {
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
        }
      },
      friendHome () {
        var self = this
        // 判断活动日期
        var nd = new Date()
        var ld = new Date(Golab.endDate)
        var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
        // 活动已结束
        if (dates <= 0) {
          this.$set('isinactivity', false)
          this.pageParam.pageFlag = !this.pageParam.pageFlag
          setTimeout(function () {
            self.$router.go({name: 'friendsactivityend'})
          }, 2000)
        } else {
          // 判断筹款是否已完成
          this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.pageParam.orderId + '/funds').then((response) => {
            if (response.data != null) {
              var data = response.data
              var totalamount = 0
              for (var i in data) {
                totalamount = totalamount + data[i].amount
              }
              if (totalamount.toFixed(2) >= Golab.gradeamount_4.toFixed(2)) {
                this.pageParam.pageFlag = !this.pageParam.pageFlag
                setTimeout(function () {
                  self.$router.go({name: 'friendsdreamfinish'})
                }, 2000)
              } else {
                this.$router.go({name: 'friendsdream', query: this.pageParam})
              }
            }
          }).catch((response) => {
            console.log(response)
          })
        }
      }
    }
  }
</script>
<style>
.reward-bottom{
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #fff;
}
  .wrap-reward {
    width: 100%;
    height: 100%;
    padding-bottom: 10px;
  }
  .wrap-reward .content {
    width: 100%;
    background: url(/static/images/imgtitle-bg.png) no-repeat #fff;
    background-size: 100% 100%;
    min-height: 60%;
    padding-top: 20%;
    padding-bottom: 60%;
  }
  .wrap-reward .content .top {
    width: 90%;
    margin: 0 auto;
    background: url(/static/images/center-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    padding: 30px 0;
    min-height: 150px;
  }
  .wrap-reward .content .top p {
    text-align: center;
    font-size: .48rem;
    color: #FFFFFF;
  }
  .wrap-reward .content .top .text-big {
    width: 80%;
    margin: 0 auto;
    font-size: .98rem;
    color: #F4DA9F;
    padding: 10px;
    display: inherit;
    background: none;
    border: none;
    text-align: center;
    height: 1.15rem;
    border-bottom: .03rem solid #fff;
    outline: medium;
  }
  .wrap-reward .content .top p:last-child {
    margin-top: 10px;
  }
  .wrap-reward .btn {
    display: block;
    margin: 0 auto;
    width: 90%;
    height: 1.64rem;
    line-height: 1.64rem;
    text-align: center;
    background-color: #F6BA38;
    border-radius: .2rem;
    margin: .35rem auto;
    color: #FFFFFF;
    font-size: .6rem;
    text-decoration: none;
  }
  .wrap-reward .form-group{
    width: 90%;
    margin: 0 auto;
    margin-top:10px;
    margin-bottom: 10px;
    overflow: hidden;
  }
  .wrap-reward .form-group a{
    display: block;
    text-decoration: none;
    height: 1.64rem;
    width: 45%;
    line-height: 1.64rem;
    text-align: center;
    color: #FFFFFF;
    font-size: .5rem;
    background-color:#599C31;
    float: left;
    border-radius: .2rem;
  }
  .wrap-reward .form-group a:last-child{
    float: right;
  }
    /*@media screen and (min-height: 600px) {
      .wrap-reward .content {
        width: 100%;
        background: url(/static/images/imgtitle-bg.png) no-repeat;
        background-size: 100% 100%;
        min-height: 70%;
        padding-top: 20%;
      }
      .wrap-reward .form-group{
        position: fixed;
        bottom: 0;
        width: 90%;
        left: 5%;
      }
      .wrap-reward .btn{
        position: fixed;
        bottom: 70px;
        width: 90%;
        left: 5%;
      }
    }*/
  .wrap-reward .mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 2;
  }
  .wrap-reward .pump{
    background: url(/static/images/pump-bg.png) no-repeat;
    background-size: 100% 100%;
    min-height: 100px;
    padding-top:35%;
    position: fixed;
    top: 8vh;
    width: 80%;
    left: 10%;
    z-index: 3;
  }
  .wrap-reward .pump p{
    text-align: center;
    font-size: .6rem;
    font-weight: bold;
  }
  .wrap-reward .pump a{
    font-size: .6rem;
    text-align: center;
    display: inherit;
    margin: .5rem auto;
    width: 6.22rem;
    height: 1.64rem;
    line-height: 1.64rem;
    border: .05rem dashed #fff;
  }
</style>
