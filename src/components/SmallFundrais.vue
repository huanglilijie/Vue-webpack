<template lang="html">
  <title>完成筹款</title>
  <div class="wrap2">
      <div class="content_title">
          <h2>您已筹得{{pageParam.totalamount}}元</h2>
          <p>但尚没有达到可以获取补贴</p>
          <p>您确定要放弃了吗？再坚持一下吧。</p>
      </div>
      <div class="content_img">
          <img src="/static/images/circle.png" alt="">
      </div>
      <div class="content_btn">
          <input type="button" value="还不够，离梦想再进一步" onclick="window.history.go(-1)">
          <input type="button" value="OK , 确认完成" @click="submit()">
      </div>
  </div>
</template>

<script>
  import Config from '../../config/config'
  export default {
    name: '',
    data () {
      return {
        pageParam: {}
      }
    },
    created () {
      // 获取页面传参
      var totalamount = this.$route.query.totalamount
      var orderId = this.$route.query.orderId
      var param = {
        totalamount: totalamount,
        orderId: orderId
      }
      this.$set('pageParam', param)
    },
    methods: {
      submit () {
        this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.pageParam.orderId + '/funded', {}).then((response) => {
          console.log(response)
          if (response.status === 200) {
            this.$router.go({name: 'fundraising', query: this.pageParam})
          }
        }).catch((response) => {
          console.log(response)
        })
      },
      goback () {
        this.$router.go({name: 'dealerlist'})
      }
    }
  }
</script>

<style lang="css">
html,body{
    margin:0;
    padding: 0;
    font-family: 微软雅黑;
}
.wrap2{
    width:100%;
    background: url("/static/images/bg-over.png") no-repeat #fff;
    background-size: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
}
.content_title{
  padding-top: 80px;
}
.content_title h2{
  font-size: .72rem;
  font-weight: 600;
  letter-spacing:.1rem;
}
.content_title p{
  font-size: .48rem;
  font-weight: 500;
}

.content_img{margin-top: 30px;}
.content_img img{
    width:40%;
    display: block;
    margin: 0 auto;
}
.content_btn{
    width: 90%;
   position: fixed;
   bottom: 30px;
   left: 5%;
}
.content_btn input{
  width: 100%;
  height: 1.6rem;
  border: none;
  border-radius: 0.2rem;
  color: white;
  font-size: .5rem;
  -webkit-appearance: none;
  cursor: pointer;
  line-height: 1.6rem;
  font-weight: 600;
}
.content_btn input:nth-child(1){
    background-color: #f6ba35;
    margin-bottom: 10px;
}
.content_btn input:nth-child(2){
    background-color: #969da3;
}
</style>
