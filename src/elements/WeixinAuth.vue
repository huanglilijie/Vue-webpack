<template>

</template>
<script>
  var data = {
  }
  export default {
    name: 'weixinauth',
    data () {
      return {
        data
      }
    },
    created: function () {
      console.log('建立created')
    },
    beforeCompile: function () {
      console.log('未开始编译beforeCompile')
    },
    compiled: function () {
      console.log('编译完成compiled')
    },
    ready: function () {
      console.log('一切准备好了ready')
      // 获取微信授权后返回的code
      var code = this.$route.query.code
      var state = this.$route.query.state
      console.log('code:' + code)
      console.log('state:' + state)
      // 用code获取access_token
      var url = '/weixindaili/sns/oauth2/access_token?appid=wx836245eaa68afe48&secret=3ef552561e4249a982bfcf5fb9d46b73&code=' + code + '&grant_type=authorization_code'
      this.$http.get(url)
        .then((response) => {
          this.data = response
        }).catch((response) => {
         // this.$alert('获取access_token失败')
        })
      var accesstoken = this.data.access_token
      var openid = this.data.openid
      // this.$alert('accesstoken:'+accesstoken)
      // this.$alert('openid:'+openid)
      // 使用access_token获取用户信息
      var userInfoUrl = '/weixindaili/sns/userinfo?access_token=' + accesstoken + '&openid=' + openid
      this.$http.get(userInfoUrl)
        .then((response) => {
          this.data = response
        }).catch((response) => {
          this.$alert('获取微信用户信息失败')
        })
      this.$alert(this.data)
      this.$dispatch('wx-user-info', this.data)
    },
    attached: function () {
      console.log('插入DOM成功attached')
    },
    detached: function () {
      console.log('删除DOM成功detached')
    },
    beforeDestroy: function () {
      console.log('销毁前beforeDestroy')
    },
    destroyed: function () {
      console.log('已销毁destroyed')
    }

  }
</script>

<style scoped>
</style>
