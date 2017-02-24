<template>
  <div class="wrap">
	<div class="top">
	  <div>
		<p>宠爱之旅完成</p>
		<div><img src="/static/images/headset.png" alt="" /></div>
		</div>
		<p>* 请尽快到店提车拿礼包</p>
	  </div>
	  <div class="car-style">
		<ul>
		  <li class="car-message clearfloat">
			<label for="">订单编号:</label>
			<div>BJ08318129201</div>
		  </li>
		  <li class="car-message clearfloat">
			<label for="">预定时间:</label>
			<div>2017-1-03</div>
		  </li>
		  <li class="car-message clearfloat">
			<label for="">车型信息:</label>
			<div>全新smart forfour 4门4座车</div>
		  </li>
		  <li class="car-message clearfloat">
			<label for="">经销商信息:</label>
			<div>
			  <p>北京波士瑞达</p>
			  <p>010-88587676</p>
			</div>
		  </li>
		  <li class="car-message clearfloat">
			<label for="">订单金额:</label>
			<div>666元</div>
		  </li>
		  <li class="car-message clearfloat">
			<label for="">当前筹款金额:</label>
			<div>800元</div>
		  </li>
		  <li class="car-message clearfloat">
			<label for="">当前获得礼包:</label>
			<div>1000元补贴 </div>
		  </li>
		</ul>
	</div>
	<div class="write-code">
	  <div>如果您忘记了核销码，点此重新发送</div>
	  <input type="button" value="重新发送核销码" class="resend" />
	</div>
  </div>
  <div class="btn-more">
	<input type="button" value="我的宠爱值" />
	<input type="button" value="放弃宠爱之旅" />
  </div>
</template>
<script>
</script>
<style scoped>
	* {
		margin: 0;
		padding: 0;
	}
	html,
	body {
		font-size: 12px;
		font-family: "微软雅黑";
		width: 100%;
		height: 100%;
	}	
	ul,
	li {
		list-style: none;
	}
	@media (max-width: 350px) {
		html,
		body {
			font-size: 10px !important;
		}
	}
	.wrap {
		width: 100%;
		height: 88%;
	}
	.wrap .top {
		width: 90%;
		margin: 0 auto;
		padding: 15px 0;
		text-align: center;
		border-bottom: 1px solid #000000;
	}
	.wrap .top p {
		margin-top: 5px;
		font-size: 1.2rem;
		font-weight: 600;
	}
	
	.wrap .top div {
		vertical-align: middle;
	}
	.wrap .top div p {
		height: 30px;
		line-height: 30px;
		font-size: 1.8rem;
		font-weight: 600;
		display: inline-block;
	}
	.wrap .top div div {
		width: 10%;
		display: inline-block;
		margin-left: 10px;
	}
	.wrap .top div div img {
		width: 100%;
	}
	.car-style {
		width: 90%;
		margin: 0 auto;
	}
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	.car-message {
		border-bottom: 1px dashed #000000;
		font-size: 1.2rem;
		padding: 10px 0;
		font-weight: 600;
	}
	.car-message>label {
		float: left;
		letter-spacing: 1px;
	}
	.car-message>div {
		float: left;
		letter-spacing: 1px;
	}
	.car-style li:last-child {
		border-bottom: 1px solid #000000;
	}
	.write-code {
		width: 92%;
		margin: 0 auto;
		overflow: hidden;
		margin-top: 20px;
	}
	.write-code div {
		float: left;
		height: 30px;
		line-height: 30px;
	}
	.write-code input {
		display: inline-block;
		-webkit-appearance: none;
		width: 100px;
		height: 30px;
		border: none;
		background-color: #599C31;
		color: #FFFFFF;
		border-radius: 5px;
		font-size: 10px;
		float: right;
	}
	.btn-more {
		/*width: 100%;*/
		margin: 0 auto;
		margin-top: 50px;
		padding-bottom: 20px;
	}
	.btn-more input {
		display: block;
		-webkit-appearance: none;
		padding: 15px 0;
		font-size: 1.5rem;
		width: 90%;
		background-color: #F6BA38;
		border-radius: 5px;
		-webkit-appearance: none;
		border: none;
		margin: 0 auto;
		color: #FFFFFF;
	}
	.btn-more input:first-child {
		margin-bottom: 10px;
	}
	.btn-more input:last-child {
		background-color: #969DA3;
	}
</style>