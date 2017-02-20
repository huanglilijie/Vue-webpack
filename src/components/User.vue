<template>
  <div class="user">
    <validator name ="validation_info">
      <div class="form-group">
        <label>* 你的姓名</label>
        <div>
          <input v-model="username" v-validate:username="{required : true}" type="text" initial="off" detect-change="off">
          <span v-if="userText">还未填写姓名</span>
        </div>
      </div>
      <div class="form-group">
        <label>* 手机号码</label>
        <div>
          <input v-model.number="phone" name= "phone" v-validate:phone="['phone']" type="number" initial="off" detect-change="off">
          <button v-if="time == 0" class="code" @click="getCode()" id ="timeBtn">{{text}}</button>
          <span v-if="time != 0" class="code" id="timeText">{{time}}s</span>
          <span v-if="$validation_info.phone.invalid ||  phoneText">{{tel}}</span>
        </div>
      </div>
      <div class="form-group">
        <label>* 手机验证码</label>
        <div>
          <input v-model="telCode" name= "telCode" v-validate:telCode="{required : true}">
          <span v-if="codeText">{{code}}</span>
        </div>
      </div>
      <div class="bottom-content">
        <p><span id="">奔驰世界，无限精彩</span><img src="/static/headset.png" alt="" /></p>
        <p>https://estore.mercedes-benz.com.cn</p>
      </div>
    </validator>
    <btn-footer is-item-selected="selectedItem" >这就是我</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'

  var data = {
    id: '',
    returnCode: '',
    selectedItem: null,
    time: 0,
    showBut: { time: 0
    },
    againClick: false,
    userText: false,
    phoneText: false,
    codeText: false,
    username: '',
    phone: '',
    price: '',
    telCode: ''
  }
  export default {
    name: 'user',
    data () {
      return data
    },
    created () {
      this.id = this.$route.query.id
      this.price = this.$route.query.price
    },
    components: {
      'btn-footer': Btn
    },
    props: {
      second: {
        type: Number,
        default: 20
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      run: function () {
        this.$emit('run')
      },
      start: function () {
        this.time = this.second
        this.timer()
      },
      stop: function () {
        this.time = 0
        this.disabled = false
      },
      timer: function () {
        this.againClick = true
        console.log('开始了')
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000)
        } else {
          this.disabled = false
        }
      },
      getCode () {
        if (!this.$validation_info.username.modified) {
          this.userText = true
        } else {
          this.userText = false
        }
        if (!this.$validation_info.phone.modified || this.$validation_info.phone.invalid) {
          this.phoneText = true
        } else {
          this.phoneText = false
        }
        if (!this.userText && !this.phoneText) {
          this.start()
        }
      },
      // 选中后页面跳转
      submit () {
        if (!this.$validation_info.username) {
          this.userText = true
        }
        if (!this.$validation_info.phone) {
          this.phoneText = true
        }
        if (!this.$validation_info.telcode) {
          this.codeText = true
        }
        if (this.userText || this.phoneText || this.codeText) {
          return false
        } else {
          this.$router.go({name: 'itempayinfo', query: {username: this.username, phone: this.phone, id: this.id, price: this.price}})
        }
        // 这里发送请求带服务器验证表单的有效性
        // 服务器验证成功后返回token，防止重复请求
        // const _token = '91482180'
        // 如果服务器请求失败，执行其他操作
      }
    },
    computed: {
      text: function () {
        return this.againClick ? '重新获取' : '发送验证码'
      },
      tel: function () {
        return this.phone.length < 1 ? '请输入您的手机号码' : '不是一个有效的手机号码'
      },
      code: function () {
        return this.telCode.length < 1 ? '请输入您的验证码' : '手机验证码已过期，请重新获取'
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
