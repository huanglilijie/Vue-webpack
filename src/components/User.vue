<template>
  <div class="user">
    <div class="form-group">
      <label>* 你的姓名</label>
      <div>
        <input v-model="username" type="text">
      </div>
    </div>
    <div class="form-group">
      <label>* 手机号码</label>
      <div>
        <input v-model.number="phone" type="number">
        <a class="code" @click="getCode()">发送验证码</a>
      </div>
    </div>
    <div class="form-group">
      <label>* 手机验证码</label>
      <div>
        <input v-model="code" type="text">
      </div>
    </div>
    <div class="bottom-content">
    	<p><span id="">奔驰世界，无限精彩</span><img src="/static/headset.png" alt="" /></p>
    	<p>https://estore.mercedes-benz.com.cn</p>
    </div>
    <btn-footer is-item-selected="selectedItem">这就是我</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'

  let data = {
    id: '',
    username: '',
    phone: '',
    code: '',
    selectedItem: null
  }

  const ifValid = function ($this) {
    if ($this.username && $this.phone && $this.code) {
      $this.selectedItem = true
      return true
    }
    $this.selectedItem = null
    return false
  }

  export default {
    name: 'user',
    data () {
      return data
    },
    created () {
      this.id = this.$route.params.id
    },
    components: {
      'btn-footer': Btn
    },
    methods: {
      getCode () {
      },
      // 选中后页面跳转
      submit () {
        // 这里发送请求带服务器验证表单的有效性
        // 服务器验证成功后返回token，防止重复请求
        // const _token = '91482180'
        this.$router.go({path: '/item/itempay'})
        // 如果服务器请求失败，执行其他操作
        // .....
      }
    },
    watch: {
      username () {
        ifValid(this)
      },
      phone () {
        ifValid(this)
      },
      code () {
        // 验证验证码
        ifValid(this)
      }
    }
  }
</script>

<style scoped>
  .form-group {
    margin: 40px 12% 0 12%;
  }
  .form-group > div {
    margin-top: 5px;
    position: relative;
  }
  .form-group input {
    width: 100%;
    height: 50px;
    border-width: 0;
    font-size: 20px;
    padding: 0 5px;
    outline: none;
  }
   .bottom-content{
   	margin-top: 40px;
   }
  .bottom-content p{
  	text-align: center;
  	font-weight: 600;
  	font-size: 14px;
  }
  .bottom-content p:first-child img{
  	margin-left: 15px;
  	display: inline-block;
  	width: 10%;
  }
  .code {
    height: 48px;
    width: 100px;
    position: absolute;
    right: -8px;
    top: 1px;
    background-color: rgb(150,157,163);
    text-align: center;
    line-height: 48px;
    color: #fff;
    border-radius: 3px;
  }
</style>
