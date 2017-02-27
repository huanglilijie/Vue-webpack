<template>
  <div class="item">
  	<img src="/static/paysuccess-img.jpg"/>
    <div class="car-style"> 车型信息：{{ pageParam.carName }}</div>
    <div class="car-style2">
    	<p>经销商信息：</p>
    	<p>
    		<div>{{ pageParam.dealerName }}</div>
    		<div class="phontnum">{{ pageParam.dealerTelephone }}</div>
    	</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>
  .item{
    background-color: #fff;
  }
	.item img:nth-child(1){
		width: 100%;
	}
	.car-style{
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px dashed #000000;
		padding: 5px 0;
		font-size: 16px;
	}
	.car-style2{
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px dashed #000000;
		padding: 10px 0;
		font-size: 16px;
		overflow:hidden;
	}
  .car-style2 p{
      margin:0 auto;
  }
	.car-style2 p:first-child{
		float: left;
	}
	.car-style2 p:last-child{
		float: left;
	}
	.phontnum{
		margin-left: 100px;
	}
</style>
