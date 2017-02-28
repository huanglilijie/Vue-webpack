<template lang="html">
  <div class="wrap1">
      <div class="content">
          <h1>您已筹得<span>{{pageParam.totalamount}}</span>元</h1>
          <p>将获得{{howMoney}}元购车补贴</p>
      </div>
      <div class="content_btn">
          <input type="button" value="OK , 我的smart已在路上" @click="submit()">
          <input type="button" value="还不够，再多宠爱我一点" @click="goback()">
      </div>
  </div>
</template>
<script>
import Golab from '../libs/golab'
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
    console.log(totalamount)
    var param = {
      totalamount: totalamount
    }
    this.$set('pageParam', param)
    var packageamount1 = Golab.packageamount_1
    var packageamount2 = Golab.packageamount_2
    var packageamount3 = Golab.packageamount_3
    var gradeamount1 = Golab.gradeamount_1
    var gradeamount2 = Golab.gradeamount_2
    var gradeamount3 = Golab.gradeamount_3
    var gradeamount4 = Golab.gradeamount_4
    if (totalamount < 1000) {
      this.$set('howMoney', 0)
    } else if (totalamount >= gradeamount1 && totalamount < gradeamount2) {
      this.$set('howMoney', packageamount1)
    } else if (totalamount >= gradeamount2 && totalamount < gradeamount3) {
      this.$set('howMoney', packageamount2)
    } else if (totalamount >= gradeamount3 && totalamount <= gradeamount4) {
      this.$set('howMoney', packageamount3)
    } else {
      this.$set('howMoney', 100)
    }
  },
  methods: {
    submit () {
      this.$router.go({name: 'fundraising'})
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
    width:100%;
    height:100%;
}
@media (max-width: 350px) {
  html,body {
    font-size: 10px !important;
    }
  }
h1{color:white;}
  .wrap1{
      width:100%;
      height:100%;
      background: url("/static/images/redpacket.png") no-repeat;
      background-size:100%;
  }
div{text-align: center;}
  .content{
    padding-top: 50px;
  }
  .content p{
      margin: 0 auto;
      text-align: center;
      line-height: 30px;
      width:80%;
      height:30px;
      background:url("/static/images/title-bg.png") no-repeat;
      background-size: 100%;
      font-size: 1.5rem;
  }
  .content_btn{
      width: 90%;
      position: fixed;
      bottom: 30px;
      left:5%;
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
