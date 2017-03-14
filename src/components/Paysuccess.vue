<template>
  <div id="pay-success">
  	<div class="pay-successbg">
  		<!--<img class="smart-familyimg" src="/static/paysuccess-car.png">-->
  	</div>
    <!--<img class="smart-familybtn" src="/static/family-btn.png">-->
  </div>
</template>
<script>
export default {
  name: 'pay-successs'
}
</script>
<style>
*{
	margin: 0;
	padding: 0;	
}
html,body{
	font-family: "微软雅黑";
}
#pay-success {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.pay-successbg{
	width: 100%;
	height: 423px;
	background-image: url(/static/images/paysuccess-bg.png);
	background-repeat: no-repeat;
	background-size: 100% 100%;
	/*background-size: cover;*/
}
.smart-familyimg{
	width: 100%;
}
.smart-familybtn{
	width: 50%;
	position: absolute;
	bottom: 41%;
	left:25% ;
}
</style>
