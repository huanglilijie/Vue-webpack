<template>
  <div class="wrap">
    <img src="/static/images/imgtitle.jpg"/>
    <div class="content">
      <div class="content-pic">感谢可爱又美好的你<br />我的smart已在路上
      </div>
      <div class="btn-finish">
        <div class="btn-group">
          <a @click="newDream">创建我的宠爱之旅</a>
          <a @click="closepage">再见</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import wx from 'wx'
  import SetWechatTitle from '../libs/setWechatTitle.js'
  export default {
    data () {
      return {
        nickName: ''
      }
    },
    ready: function () {
      var nickName = this.$route.query.nickName
      this.$set('nickName', nickName)
      SetWechatTitle(this.nickName + '的梦想之旅')
    },
    methods: {
      newDream () {
        this.$router.go({name: 'home'})
      },
      closepage () {
        wx.closeWindow()
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
    width: 85%;
    margin: 0 auto;
    text-align: right;
    background: url(/static/images/text-bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center bottom;
    min-height: 3rem;
    padding-top: 30%;
    padding-right: 12%;
    font-size: .5rem;
    color: #ffffff;
    margin-bottom: 30%;
  }
  .btn-finish{
    width: 100%;
    background: #fff;
  }
  .btn-group{
    width: 90%;
    margin: 0 auto;
    position: fixed;
    left: 5%;
    bottom: 0;
  }
  .btn-group a{
    width: 48%;
    display: block;
    text-decoration: none;
    color: #FFFFFF;
    height: 1.64rem;
    line-height: 1.64rem;
    text-align: center;
    background-color: #F6BA38;
    font-size: .5rem;
    border-radius: .2rem;
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
