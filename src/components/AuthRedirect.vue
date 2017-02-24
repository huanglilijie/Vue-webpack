<template>
  <weixinauth></weixinauth>
  <p>{{openid}}</p>
  <p>{{nickname}}</p>
  <p>{{sex}}</p>
  <p>{{province}}</p>
  <p>{{city}}</p>
  <p>{{country}}</p>
  <p>{{headimgurl}}</p>
  <p>{{privilege}}</p>
  <p>{{unionid}}</p>
</template>
<script>
  import WeixinAuth from '../elements/WeixinAuth'
  var data = {
  }
  export default {
    name: 'authredirect',
    data () {
      return {
        data
      }
    },
    components: {
      'weixinauth': WeixinAuth
    },
    created: function () {
    },
    beforeCompile: function () {
    },
    compiled: function () {
    },
    ready: function () {
    },
    attached: function () {
    },
    detached: function () {
    },
    beforeDestroy: function () {
    },
    events: {
      'wx-user-info': function (data) {
        this.data = data
      }
    }

  }
</script>

<style scoped>
</style>
