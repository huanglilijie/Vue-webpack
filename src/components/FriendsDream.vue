<template>
  <title></title>
  <div class="wrap">
    <div class="top">
      <img src="/static/images/imgtitle.jpg"/>
    </div>
    <div class="content">
      <div class="friendC-title">
        <img :src="headImgUrl" />
      </div>
      <p class="text text-top">嘿！我打算买一辆</p>
      <p class="text1">{{product[0].name}}</p>
      <p class="text">开着它<br/>和可爱又美好的你一起去远方旅行</p>
      <p class="text">宠爱我一次<br/>为了答谢你，我会：</p>
      <div class="text-bg">{{memo}}</div>
      <p class="text-bottom">----------已有{{friendsSum}}位好友为我筹款-----------</p>
      <a class="btn" @click="rewardSend">发个红包宠爱他</a>
      <a class="btn btn-bottom" @click="newDream">创建我的宠爱之旅</a>
    </div>
    <!-- {{memo}} -->
  </div>
</template>
<script>
  import Config from '../../config/config'
  import Vue from 'vue'
  import SetWechatTitle from '../libs/setWechatTitle.js'
  export default {
    data () {
      return {
        useropenid: '',
        orderId: '',
        headImgUrl: '',
        nickName: '',
        uid: '',
        product: [{
          id: '',
          createTime: '',
          name: '',
          price: '',
          intentionFee: ''
        }],
        dealer: [{
          name: '',
          telephone: '',
          totalAmount: '',
          code: ''
        }],
        payment: [{
          amount: '',
          payStatus: '',
          payChannel: ''
        }],
        memo: '',
        friendsSum: ''
      }
    },
    ready: function () {
      var useropenid = this.$route.query.useropenid
      this.$set('useropenid', useropenid)
      this.initWeChatInfo()
    },
    methods: {
      rewardSend () {
        this.$router.go({name: 'rewardsend', query: {orderId: this.orderId, useropenid: this.useropenid, carname: this.product[0].name, dealercode: this.dealer[0].code, nickName: this.nickName}})
      },
      newDream () {
        this.$router.go({name: 'home'})
      },
      initWeChatInfo () {
        this.$http.get(Config.API_ROOT + 'ecommerce/user/wechat-user/' + this.useropenid).then((response) => {
          if (response.data != null) {
            // 获取用的MME-TOKEN，自动结束筹款操作订单的时候需要用到
            console.log(response.headers)
            console.log(response.headers.map['MME-TOKEN'])
            if (response.headers.map['MME-TOKEN']) {
              console.log(response.headers.map['MME-TOKEN'][0])
              window.localStorage.setItem('MME-TOKEN', response.headers.map['MME-TOKEN'][0])
              Vue.http.headers.common['MME-TOKEN'] = response.headers.map['MME-TOKEN'][0]
            }
            console.log(response.data)
            this.headImgUrl = response.data.headImgUrl
            this.nickName = response.data.nickName
            this.uid = response.data.uid
            this.initOrderDetail()
            SetWechatTitle(this.nickName + '的梦想')
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      initOrderDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/customers/' + this.uid + '/orders').then((response) => {
          if (response.data != null) {
            console.log(response.data)
            console.log(response.data.product)
            console.log(response.data.dealer)
            this.product[0].name = response.data.product.name
            this.dealer[0].code = response.data.dealer.code
            this.memo = response.data.memo
            this.orderId = response.data.reservationId
            this.initFundDetail()
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      initFundDetail () {
        this.$http.get(Config.API_ROOT + 'ecommerce/order/' + this.orderId + '/funds').then((response) => {
          if (response.data != null) {
            var data = response.data
            this.friendsSum = data.length
            console.log(data)
          }
        }).catch((response) => {
          console.log(response)
        })
      }
    }
  }
</script>
<style>
  .top img {
    display: block;
    width: 100%;
  }
  .wrap {
    width: 100%;
    height: 100%;
  }
  .wrap .top {
    width: 100%;
  }
  .wrap .content {
    width: 100%;
    background: url(/static/images/img-bg.jpg) no-repeat;
    background-position: center;
    background-size: cover;
    min-height: calc(background);
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .wrap .content .friendC-title{
    width: 100%;
    background: url(/static/images/friendlongbg.png) no-repeat;
    background-position: center;
    background-size: 100%;
    height: 1rem;
    padding:.8rem 0;
    position: relative;
  }
  .wrap .content .friendC-title img {
    display: inline-block;
    width: 2.19rem;
    height: 2.19rem;
    border: .18rem solid #f6ba35;
    border-radius: 2rem;
    position: absolute;
    top: 0rem;
    left: 10%;
  }
  .wrap .content p {
    width: 70%;
    margin: 0 auto;
    text-align: left;
  }
  .wrap .content .text {
    margin-bottom: 8px;
    font-size: .45rem;
    font-weight: 600;
  }
  .wrap .content .text-top {
    margin-top: 8px;
  }
  .wrap .content .text1 {
    margin-bottom: 8px;
    font-size: .6rem;
    font-weight: 600;
  }
  .wrap .content .text-bg {
    text-align: center;
    margin: 0 auto;
    width: 90%;
    height: 2.35rem;
    background: url(/static/images/text-bg.jpg) no-repeat;
    background-size: 100% 100%;
    background-position: center;
    line-height: 2.4rem;
    font-weight: bold;
    font-size: .45rem;
    text-align: center;
    font-weight: 600;
  }
  .wrap .content .text-bottom {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: .4rem;
  }
  .wrap .content .btn {
    width: 90%;
    margin: 0 auto;
    display: block;
    height: 1.64rem;
    background-color: #F6BA38;
    border-radius: 5px;
    text-decoration: none;
    line-height: 1.64rem;
    text-align: center;
    font-size: .5rem;
    font-weight: bold;
    color: #ffffff;
    letter-spacing: 2px;
  }
  .wrap .content .btn-bottom {
    margin-top: 10px;
    background-color: #599C31;
  }
</style>
