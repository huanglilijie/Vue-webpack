<template>

</template>
<script>
  import Config from '../../config/config'
  // import Golab from '../libs/golab'
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
      var url = '/wechatagent/sns/oauth2/access_token?appid=wx836245eaa68afe48&secret=3ef552561e4249a982bfcf5fb9d46b73&code=' + code + '&grant_type=authorization_code'
      this.$http.get(url)
        .then((response) => {
          this.data = response.body
          var accesstoken = this.data.access_token
          var openid = this.data.openid
          // 使用access_token获取用户信息
          var userInfoUrl = '/wechatagent/sns/userinfo?access_token=' + accesstoken + '&openid=' + openid
          this.$http.get(userInfoUrl)
            .then((response) => {
              this.data = response.body
              // console.log(Golab.openid)
              // if (openid != null) {
              //   Golab.openid = openid
              // }
              // console.log('openid:' + Golab.openid)
              // 需要判断后台是否已经存储了用户信息，若存储则不再存储
              this.$http.get(Config.API_ROOT + 'ecommerce/user/wechat-user/' + openid).then((response) => {
                // 已经存储了用户信息
                window.sessionStorage.setItem('openid', openid)
                if (state === 'pagechoose') {
                  // 分享链接打开授权
                  var useropenid = window.sessionStorage.getItem('useropenid')
                  var useruid = window.sessionStorage.getItem('useruid')
                  this.$router.go({name: 'pagechoose', query: {useropenid: useropenid, useruid: useruid}})
                } else {
                  // 活动主页打开授权
                  this.$router.go({name: 'index'})
                }
              }).catch((response) => {
                console.log(response)
                // 将获取的用户微信信息，存储到后台
                this.$http.post(Config.API_ROOT + 'ecommerce/user/wechat-user', {'openid': this.data.openid, 'city': this.data.city, 'country': this.data.country, 'headImgUrl': this.data.headimgurl, 'nickName': this.data.nickname, 'province': this.data.province, 'sex': this.data.sex}).then((response) => {
                  console.log(response.ok)
                  window.sessionStorage.setItem('openid', openid)
                  if (state === 'pagechoose') {
                    // 分享链接打开授权
                    var useropenid = window.sessionStorage.getItem('useropenid')
                    var useruid = window.sessionStorage.getItem('useruid')
                    this.$router.go({name: 'pagechoose', query: {useropenid: useropenid, useruid: useruid}})
                  } else {
                    // 活动主页打开授权
                    this.$router.go({name: 'index'})
                  }
                }).catch((response) => {
                  console.log(response)
                })
              })
            }).catch((response) => {
              this.$alert('获取微信用户信息失败')
            })
          this.$dispatch('wx-user-info', this.data)
        }).catch((response) => {
          this.$alert('获取access_token失败')
        })
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
