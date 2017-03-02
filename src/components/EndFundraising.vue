<template lang="html">
  <div class="wrap3">
      <div class="content_title">
          <h2>您还没有筹到款</h2>
          <p>不要灰心？再接再厉吧。</p>
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
      console.log(totalamount)
      var param = {
        totalamount: totalamount,
        orderId: orderId
      }
      this.$set('pageParam', param)
    },
    methods: {
      submit () {
        this.$http.post(Config.API_ROOT + 'ecommerce/customers/' + window.localStorage.getItem('uid') + '/orders/' + this.orderId + '/refund').then((response) => {
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
    font-size: 12px;
}
.wrap3{
    width:100%;
    background: url("/static/images/bg-over.png") no-repeat;
  background-size: 100%;
  padding-bottom: 80%;

}
div{text-align: center;}
.content_title{
  padding-top: 80px;
}

.content_img{margin-top: 30px;}
.content_img img{
    width:40%;
}
.content_btn{
    width: 90%;
   position: fixed;
   bottom: 30px;
   left: 5%;
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
