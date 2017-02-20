<template>
  <div id="smart-family" v-if="is_in_activity">
    <img class="smart-familyimg" src="/static/smart-faimily.jpg">
      <img class="smart-familybtn" src="/static/family-btn.png" @click="submit()">
  </div>
  <div id="smart-family" v-else>
    <img class="smart-familyimg" src="/static/smart-family-over.jpg"/>
  </div>
</template>

<script>
export default {
  name: 'smart-family',
  methods: {
    submit () {
      console.log(new Date())
      this.$router.go({path: '/lists/'})
    }
  },
  data: function () {
    // 判断是否在活动期内
    var nd = new Date()
    var ld = new Date('2017-04-30')
    if (nd > ld) {
      return {
        is_in_activity: false
      }
    } else {
      return {
        is_in_activity: true
      }
    }
  },
  ready: function () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (!ua.indexOf('micromessenger') < 0) {
      this.$router.go({path: '/point/'})
    }
  }
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
#smart-family {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
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
