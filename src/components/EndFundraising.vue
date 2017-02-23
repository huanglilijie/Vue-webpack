<template lang="html">
  <div class="wrap">
      <div class="content_title">
          <h2>您还没有筹到款</h2>
          <p>不要灰心？再接再厉吧。</p>
      </div>
      <div class="content_img">
          <img src="/static/images/circle.png" alt="">
      </div>
      <div class="content_btn">
          <input type="button" value="还不够，离梦想再进一步">
          <input type="button" value="OK , 确认完成">
      </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="css">
html,body{
    margin:0;
    padding: 0;
    font-family: 微软雅黑;
    font-size: 12px;
}
.wrap{
    width:100%;
    background: url("/static/images/bg-over.png") no-repeat;
  background-size: 100%;
  padding-bottom: 80%;

}
div{text-align: center;}
.content_title{
  padding-top: 80px;
}

.content_img{margin-top: 30px;}
.content_img img{
    width:40%;
}
.content_btn{
    width: 90%;
   position: fixed;
   bottom: 30px;
   left: 5%;
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
