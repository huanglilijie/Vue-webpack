<template>
  <div class="item-success">
    <p class="pay_mon">支付订金：{{rst.price}} 元</p>
    <div class="pay_success">
    	<p>已成功预订 即可开启筹款</p>
	    <p>距离活动结束还有<span>8</span>天</p>
	    <p>快去筹款吧！</p>
	  </div>
	  <div>
	 		<p class="btn-footer-1" @click="jump">马上行动</p>
	 		<p class="btn-footer-2">查看详情</p>
	  </div>
    
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  export default {
    name: 'item-success',
    data () {
      return {}
    },
    created () {
      this.id = this.$route.params.id
      this.token = this.$route.params.token

      // 向服务器请求数据，返回结果如下
      this.rst = {pname: 'smarty two', dealer: '北京波士瑞达', price: '666', photonum: '010-232323'}
    },
    methods: {
      jump () {
        this.$router.go({name: 'createmydear'})
      }
    },
    components: {
      'btn-footer': Btn
    }
  }
</script>

<style scoped>
.item-success{
	margin-top:15px ;
}
.pay_success{
	text-align: center;
	line-height:40px;
	margin-top:20px ;
}
.pay_success p:nth-child(1){
	font-size: 20px;
	font-weight: 700;
}
.pay_success p:nth-child(2) span{
	font-size: 16px ;
	font-weight: 700;
}
.pay_success p:nth-child(3){
	font-size:20px ;
	font-weight: 700;
}
 .btn-footer-1{
    position: fixed;
    bottom:55px;
    left: 5%;
    width: 90%;
    border-radius:10px;
    padding: 10px 0;
    background-color: #F6BA35;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }
  .btn-footer-2{
  	 position: fixed;
    bottom:0;
    left: 5%;
    width: 90%;
    border-radius:10px;
    padding: 10px 0;
    background-color:#7FC782;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }
  .pay_mon{
  	width: 90%;
		margin: 0 auto;	
		font-size: 16px;
  }
</style>
