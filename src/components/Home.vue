<template>
  <div id="smart-family">
    <img class="smart-familyimg" src="/static/smart-faimily.jpg">
    <template v-if=true>
      <img class="smart-familybtn" src="/static/family-btn.png" @click="submit()">
    </template>
    <template v-else>
      <em class="smart-familybtn">活动结束啦!</em>
    </template>
    
  </div>
  
</template>

<script>
export default {
  name: 'smart-family',
  methods: {
    submit () {
      this.$router.go({path: '/lists/'})
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
