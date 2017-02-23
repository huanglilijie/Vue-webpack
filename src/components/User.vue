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
          <button v-if="time == 0" :class="['code', {'codeLight': islight}]" @click="getCode()" id ="timeBtn" :disabled ='isdisable'>{{text}}</button>
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
        <p class="user-agreement">
          <span>我同意</span><a href="###">活动用户协议</a>
          <input type="checkbox" name="" id="" value="" />
        </p>
      </div>
    </validator>
    <btn-footer is-item-selected="selectedItem" >这就是我</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  import Config from '../../config/config'
  let data = {
    id: '',
    username: '',
    phone: '',
    telCode: '',
    price: '123',
    returnCode: '',
    selectedItem: null,
    time: 0,
    showBut: {
      time: 0
    },
    againClick: false,
    userText: false,
    phoneText: false,
    codeText: false,
    isdisable: true,
    islight: false,
    leastOnce: false
  }
  export default {
    name: 'user',
    data () {
      return data
    },
    created () {
      this.id = this.$route.query.id
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
        if (!this.userText && !this.phoneText) {
          this.$http.get(Config.API_ROOT + 'ecommerce/user/captcha', {params: {mobile: this.phone}}).then((response) => {
            if (response.data != null) {
              this.$set('returnCode', response.data)
              this.start()
            }
          }).catch((response) => {
            console.log(response)
          })
        }
        this.start()
        this.returnCode = '123123'
      },
      // 选中后页面跳转
      submit () {
        // 这里发送请求带服务器验证表单的有效性
        // 服务器验证成功后返回token，防止重复请求
        // const _token = '91482180'
        console.log(this.username)
        console.log(this.returnCode)
        if (this.username === '') {
          this.userText = true
        }
        if (this.phone === '') {
          this.phoneText = true
        }
        if (this.telCode === '') {
          this.codeText = true
        }
        if (this.telCode !== '' && this.returnCode !== '') {
          if (this.telCode === this.returnCode) {
            if (this.time > 0) {
              this.$http.get(Config.API_ROOT + 'ecommerce/user/register', {params: {mobile: this.phone, captcha: this.telCode, realName: this.username, openid: '123456'}}).then((response) => {
                if (response.data != null) {
                  this.$set('returnCode', response.data)
                  this.$router.go({name: 'itempayinfo', query: {id: this.id, username: this.username, phone: this.phone, price: this.price}})
                }
              }).catch((response) => {
                console.log(response)
              })
              this.$router.go({name: 'itempayinfo', query: {id: this.id, username: this.username, phone: this.phone, price: this.price}})
            } else {
              this.codeText = true
            }
          }
        }
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
        return this.telCode.length < 1 ? '请输入您的验证码' : (this.againClick ? '手机验证码已过期，请重新获取' : '请获取验证码')
      }
    },
    watch: {
      phone: function () {
        if (this.phone.length === 11) {
          console.log(this.$validation_info.phone.valid)
          if (this.$validation_info.phone.valid) {
            this.phoneText = false
            this.isdisable = false
            this.islight = !this.isdisable
          }
        } else {
          this.phoneText = false
        }
      },
      username: function () {
        if (this.username.length > 0) {
          this.userText = false
        }
        if (this.phone.length === 11) {
          if (!this.phoneText) {
            this.isdisable = false
            this.islight = !this.isdisable
          }
        } else {
          this.isdisable = true
          this.islight = !this.isdisable
        }
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
  .codeLight {
    background-color: #F7B835;
  }
  .form-group > div span{
    position: absolute;
    color:red;
    bottom:-25px;
  }
  .user-agreement {
    margin-top: 50px;
  }
  .user-agreement a{
    color: #000000;
  }
</style>
