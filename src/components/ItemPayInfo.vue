<template>
  <div class="item-pay-info" id="item-pay-info">
    <div class="car-style"> 支付定金：{{price}}</div>
    <div class="car-style2">
    <div class="car-style"> 姓名:{{username}}</div>
    <div class="car-style2"></div>
    <div class="car-style"> 联系电话:{{phone}}</div>
    <div class="amount-activity">
      <p>距离活动结束还有<span>{{dates}}</span>天</p>
      <p>美好时光不等待，快支付订金呦!</p>
    </div>
    <div v-if='checks'>
      <div class="mask"></div>
      <div class="pump">
        <img src="/static/pump.png"/>
        <p>你确定这样做吗?</p>
        <a class="mask-reselect" @click="pumpshow()">再考虑一下</a>
        <a class="mask-submit" @click="goBack()">确定</a>
      </div>
    </div>
    <a class="btn submit" @click="submit">确认开启宠爱之旅</a>
    <a class="btn reselect" @click="pumpshow()">重新选择</a>
  </div>
</template>

<script type="text/babel">
  import Config from '../../config/config'
  let rst = {
  }
  export default {
    name: 'item-pay-info',
    data () {
      var nd = new Date()
      var ld = new Date('2017-04-30')
      var dates = Math.ceil((ld.getTime() - nd.getTime()) / (1000 * 60 * 60 * 24)) + 1
      if (dates <= 0) {
        dates = 0
      }
      return {
        paytype: '',
        selectedItem: null,
        afrensh: false,
        username: '',
        phone: '',
        price: '',
        checks: false,
        dates: dates
      }
    },
    components: {
    },
    created () {
      this.id = this.$route.params.id
      this.token = this.$route.params.token
      this.username = this.$route.query.username
      this.phone = this.$route.query.phone
      this.price = this.$route.query.price
      // 向服务器请求数据，返回结果如下
      this.rst = {pname: 'smarty two', dealer: '北京波士瑞达', price: 'this.price', photonum: 'this.phone'}
    },
    watch: {
      paytype () {
        this.selectedItem = true
      }
    },
    methods: {
      // 选中后页面跳转
      submit () {
        this.$http.get(Config.API_ROOT + 'customers/' + this.username + '/orders/', {params: {productId: this.phone, dealerId: this.telCode, contactName: this.username,
          contactMobile: this.phone}}).then((response) => {
            if (response.data != null) {
              this.$set('returnCode', response.data)
              this.$router.go({name: 'itempay', query: {id: this.id, username: this.username, phone: this.phone, price: this.price}})
            }
          }).catch((response) => {
            console.log(response)
          })
        this.$router.go({name: 'itempay', query: {price: this.price, rst: rst}})
      },
      pumpshow () {
        this.checks = !this.checks
      },
      goBack () {
        this.$router.go({name: 'home'})
      }
    }
  }
</script>

<style scoped>
.item-pay{
  margin-top: 15px;
}
li{
  list-style: none;
}
img{
  display: block;
  width: 100%;
}
.car-style{
  width: 90%;
  margin: 0 auto;
  padding:5px 0;
  border-bottom: 1px dashed #000000;
  font-size: 16px;
}
.car-style2{
  width: 100%;
  margin: 0 auto;
  font-size: 16px;
  overflow:hidden;
}
.clearfloat:after{
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0
}
.car-message{
  border-bottom: 1px dashed #000000;
  font-size: 1.2rem;
  padding: 10px 0;
}
.car-message>label{
  float: left;
  letter-spacing: 1px;
}
.car-message>div{
  float: left;
  letter-spacing: 1px;
}
.car-style li:last-child{
  border-bottom: none;
}
.amount-activity{
  padding-bottom: 130px;
  margin: 20px 0;
}
.amount-activity p{
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}
.amount-activity>p>span{
  font-size: 2rem;
}
.amount-activity>p:last-child{
  margin-top: 10px;
  font-size: 1.4rem;
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2;
}
.pump{
  width: 85%;
  margin: 0 auto;
  position: absolute;
  top: 5vh;
  left: 7.5%;
  z-index: 3;
}
.pump p{
  position: absolute;
  width: 80%;
  text-align: center;
  left: 10%;
  top: 17vh;
}
.pump a{
  position: absolute;
  width: 60%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  left: 20%;
  top: 20vh;
  border: 2px dashed #FFFFFF;
  border-radius: 5px;
  text-decoration: none;
  color: #000000;
  font-size: 1.5rem;
  font-weight: 600;

}
.mask-reselect{
  margin-top: 10px;
  background-color: #FBE3AE;
}
.mask-submit{
  margin-top: 70px;
}
.btn{
  display: block;
  width: 90%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 1.5rem;
  text-decoration: none;
  color: #FFFFFF;
  border-radius: 10px;
}
.reselect{
  position: fixed;
  bottom: 10px;
  background-color: #969DA3;
  left: 5%;
}
.submit{
  position: fixed;
  bottom: 70px;
  background-color: #F6BA38;
  left: 5%;
  margin-top: 20px;
}

</style>
