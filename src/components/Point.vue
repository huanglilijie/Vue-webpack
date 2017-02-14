<template>
  <div id="app">
    <img class="wechat-logo" src="/static/wechat-logo.png">
    <p>只支持微信打开呦~</p>
    <a href="###" class="btn" >点击跳转微信</a>
    <p>如果跳转失败，请您点击“复制链接”按钮</p>
    <p>并换其他浏览器尝试唤起微信</p>
    <a href="###" class="btn btn-last">复制链接</a>
    <router-view v-if="aa"></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
*{
	margin: 0;
	padding: 0;
}
html,body{
	font-family: "微软雅黑";
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.wechat-logo{
	display:block;
	width:40%;
	margin: 0 auto;

}
#app p:nth-child(2){	
		font-size:10px ;
		margin: 0 auto;
		margin-top: 20px;	
}
.btn{
	display: block;
	width: 90%;
	margin: 0 auto;
	height: 40px;
	line-height: 40px;
	background-color: #1AAC19;
	border-radius: 5px;
	color: #fff;
	text-decoration: none;
	font-weight: 700;
	letter-spacing: 2px;
	font-size: 16px;
	margin-top: 30px;
}
#app p:nth-child(4),#app p:nth-child(5){
		width:70%;
		margin:0 auto;
		font-size: 12px;
		margin-top: 30px;
}
#app p:nth-child(5){
	margin-top: 5px;
}
.btn-last{
	width: 40%;
	margin: 0 auto;
	margin-top: 20px;
	background-color: #CCCCCC;
}
</style>
