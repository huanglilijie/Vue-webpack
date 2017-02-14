<template>
  <div class="item">
  	<img src="/static/paysuccess-img.jpg"/>
    <div class="car-style"> 车型信息：{{ rst.pname }}</div>
    <div class="car-style2"> 
    	<p>经销商信息：</p>
    	<p>
    		<div>{{ rst.dealer }}</div> 
    		<div class="phontnum">{{ rst.photonum }}</div>
    	</p>
    </div>
    <!--<div> {{ rst.price }}</div>-->
    <router-view></router-view>
  </div>
</template>

<script>
  let data = {
    id: '',
    token: '',
    rst: {}
  }

  export default {
    name: 'item',
    data () {
      return data
    },
    created () {
      this.id = this.$route.params.id
      this.token = this.$route.params.token

      // 向服务器请求数据，返回结果如下
      this.rst = {pname: 'smarty two', dealer: '北京波士瑞达', price: '666', photonum: '010-232323'}
    }
  }
</script>

<style scoped>
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
