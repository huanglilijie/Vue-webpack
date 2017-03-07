<template>
  <div class="wrap">
    <img src="/static/images/imgtitle.jpg"/>
    <div class="content">
      <div class="content-pic">感谢可爱又美好的你<br />我的smart已在路上
      </div>
      <div class="btn-group">
        <a @click="newDream">创建我的宠爱之旅</a>
        <a>再见</a>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      newDream () {
        this.$router.go({name: 'home'})
      }
    }
  }
</script>
<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,body {
    font-size: 12px;
    font-family: "微软雅黑";
    width: 100%;
    height: 100%;
  }
  ul,li {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
  }
  @media (max-width: 350px) {
    html,body {
      font-size: 10px !important;
    }
  }
  .wrap{
    width: 100%;
    height: 100%;
  }
  .content{
    background: url(/static/images/content-bg.jpg) no-repeat;
    width: 100%;
    background-size: 100% 100%;
    padding-top: 20%;
    padding-bottom: 10%;
    min-height: calc(background);
  }
  .content-pic{
    width: 80%;
    margin: 0 auto;
    text-align: right;
    background: url(/static/images/text-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center bottom; 
    min-height: 100px;
    padding-top: 30%;
    padding-right: 12%;
    font-size: 1.2rem;
    color: #ffffff;
  }
  .btn-group{
    width: 90%;
    margin: 0 auto;
    margin-top: 40px;
  }
  .btn-group a{
    width: 48%;
    display: block;
    text-decoration: none;
    color: #FFFFFF;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #F6BA38;
    font-size: 1.3rem;
    border-radius: 5px;
    margin-bottom: 30px;
  }
  .btn-group a:first-child{
    float: left;
  }
  .btn-group a:last-child{
    float: right;
    background-color: #599C31;
  }
</style>