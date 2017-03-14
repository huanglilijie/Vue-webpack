<template>
  <body>
    <div class="item">
    	<div class="no1-img">
        <img src="/static/images/paysuccess-img.jpg"/>
    	</div>
      <div class="if-erj">
        <span><img src="/static/images/headset.png" @click="openUrl" ></span>
      </div>
      <div class="car-style"> 车型信息：{{ pageParam.carName }}</div>
      <div class="car-style2">
      	<!-- <p>经销商信息：</p>
      	<p>
      		<div>{{ pageParam.dealerName }}</div>
      		<div class="phontnum">{{ pageParam.dealerTelephone }}</div>
      	</p> -->
        <p><i>经销商信息：</i><span>{{ pageParam.dealerName }}</span></p>
        <p><i></i><span>{{ pageParam.dealerTelephone }}</span></p>
      </div>
      <router-view></router-view>
    </div>
  </body>
</template>

<script>
  import Golab from '../libs/golab'
  let data = {
    id: '',
    token: '',
    pageParam: {}
  }
  export default {
    name: 'item',
    data () {
      return data
    },
    created () {
      // 获取页面传参,页面跳转的时候，父子路由都可以获取页面的参数
      var carName = this.$route.query.carName
      var dealerName = this.$route.query.dealerName
      var dealerTelephone = this.$route.query.dealerTelephone
      var param = {
        carName: carName,
        dealerName: dealerName,
        dealerTelephone: dealerTelephone
      }
      this.$set('pageParam', param)
    },
    methods: {
      openUrl () {
        window.open(Golab.customerUrl)
      }
    }
  }
</script>

<style scoped>
  .item{
    background-color: #fff;
    position: relative;
    /*height: 100%;*/
  }
	.no1-img{
		width: 100%;
	}
  .no1-img img{
		width: 100%;
	}
	.car-style{
    width: 90%;
    margin: 0 auto;
    padding:.3rem 0;
    border-bottom: .01rem dashed #000000;
    font-size: .4rem;
	}
	.car-style2{
		width: 90%;
		margin: 0 auto;
		border-bottom: .01rem dashed #000000;
		padding: .3rem 0 0;
		font-size:.4rem;
		overflow:hidden;
	}
  .car-style2 p{
      height: .8rem;
    font-size:.4rem;
  }
  .car-style2 p i{
    font-style: normal;
    width: 25%;
    display: inline-block;
    float: left;
  }
  .car-style2 p span{
    width: 75%;
    display: inline-block;
    float: right;
  }
	.phontnum{
		margin-left: 100px;
	}
  .if-erj span img{
    position: absolute;
    width: 1rem;
    top: .3rem;
    right: 1rem;
  }
</style>
