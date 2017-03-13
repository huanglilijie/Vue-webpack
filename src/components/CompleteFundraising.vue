<template lang="html">
  <div class="wrap1">
      <div class="content">
          <h1>您已筹得<span>{{pageParam.totalamount}}</span>元</h1>
          <p>将获得{{howMoney}}元购车补贴</p>
      </div>
      <div class="content_btn">
          <input type="button" value="OK , 我的smart已在路上" @click="submit()">
          <input type="button" value="还不够，再多宠爱我一点" onclick="window.history.go(-1)">
      </div>
  </div>
</template>
<script>
  import Golab from '../libs/golab'
  import Config from '../../config/config'
  export default {
    name: '',
    data () {
      return {
        pageParam: {},
        howMoney: {}
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
      var packageamount1 = Golab.packageamount_1
      var packageamount2 = Golab.packageamount_2
      var packageamount3 = Golab.packageamount_3
      var gradeamount1 = Golab.gradeamount_1
      var gradeamount2 = Golab.gradeamount_2
      var gradeamount3 = Golab.gradeamount_3
      var gradeamount4 = Golab.gradeamount_4
      if (totalamount < Golab.gradeamount_1) {
        this.$set('howMoney', 0)
      } else if (totalamount >= gradeamount1 && totalamount < gradeamount2) {
        this.$set('howMoney', packageamount1)
      } else if (totalamount >= gradeamount2 && totalamount < gradeamount3) {
        this.$set('howMoney', packageamount2)
      } else if (totalamount >= gradeamount3 && totalamount <= gradeamount4) {
        this.$set('howMoney', packageamount3)
      }
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
  .wrap1{
      width:100%;
      height:100%;
      background: url("/static/images/redpacket.png") no-repeat;
      background-size:100%;
      position: absolute;
  }
  .content{
    padding-top: 50px;
  }
  .content h1{
    font-size: 1.05rem;
    color:#fff;
    text-align: center;
  }
  .content p{
      margin: 0 auto;
      text-align: center;
      line-height: 30px;
      width:80%;
      height:30px;
      background:url("/static/images/title-bg.png") no-repeat;
      background-size: 100%;
      font-size: .7rem;
      color:#fff;
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
