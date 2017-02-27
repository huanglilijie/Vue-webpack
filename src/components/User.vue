<template>
  <div class="user">
    <validator name ="validation_info">
      <div class="form-group">
        <label>* 你的姓名</label>
        <div>
          <input v-model="username" v-validate:username="{required : true}" type="text" initial="off" detect-change="off">
          <span v-if="userText">请填写您的姓名</span>
        </div>
      </div>  
      <div class="form-group">
        <label>* 手机号码</label>
        <div>
          <input v-model.number="phone" name= "phone" v-validate:phone="['phone']" type="number" initial="off" detect-change="off">
          <button v-if="time == 0" :class="['code', {'codeLight': islight}]" @click="getCode()" id ="timeBtn" :disabled ='isdisable'>{{text}}</button>
          <span v-if="time != 0" class="code" id="timeText">{{time}}s</span>
          <span v-if="phoneText">{{tel}}</span>
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
          <span>我同意</span><a>活动用户协议</a>
          <input type="checkbox" class= "input-checkbox" name="" v-model="state" />
        </p>
      </div>
    </validator>
    <btn-footer is-item-selected="selectedItem" >这就是我</btn-footer>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  let data = {
    id: '',
    username: '',
    phone: '',
    telCode: '',
    price: 0,
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
    errormeg: '',
    state: false,
    isChinaMobile: '',
    isChinaUnion: '',
    isChinaTelcom: '',
    isOtherTelphone: '',
    pageParam: {}
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
    ready: function () {
      this.isChinaMobile = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/
      this.isChinaUnion = /^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/
      this.isChinaTelcom = /^(?:133|153|177|18[019])\d{8}$/
      this.isOtherTelphone = /^170([059])\d{7}$/
      // 获取页面传参
      var carCode = this.$route.query.carCode
      var carName = this.$route.query.carName
      var carIntentionFee = this.$route.query.carIntentionFee
      var dealerName = this.$route.query.dealerName
      var dealerCode = this.$route.query.dealerCode
      var dealerTelephone = this.$route.query.dealerTelephone
      var param = {
        carCode: carCode,
        carName: carName,
        carIntentionFee: carIntentionFee,
        dealerName: dealerName,
        dealerCode: dealerCode,
        dealerTelephone: dealerTelephone
      }
      this.$set('pageParam', param)
    },
    props: {
      second: {
        type: Number,
        default: 60
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
        // console.log('开始了')
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000)
        } else {
          this.disabled = false
        }
      },
      getCode () {
        if (!this.userText && !this.phoneText) {
          this.$http.get(Config.API_ROOT + 'ecommerce/user/captcha', {mobile: this.phone}).then((response) => {
            if (response.data != null) {
              this.$set('returnCode', response.data)
              this.start()
            }
          }).catch((response) => {
            console.log(response)
          })
        }
      },
      // 选中后页面跳转
      submit () {
        // 这里发送请求带服务器验证表单的有效性
        // 服务器验证成功后返回token，防止重复请求
        // const _token = '91482180'
        if (this.username === '') {
          this.userText = true
        }
        if (this.phone === '') {
          this.phoneText = true
        }
        if (this.telCode.length < 1) {
          this.errormeg = '请填写验证码'
          this.codeText = true
        } else {
          if (!/^\d{6}$/.test(this.telCode)) {
            this.errormeg = '验证码不正确'
            this.codeText = true
          }
        }
        if (!this.userText && !this.phoneText && !this.codeText) {
          if (!this.state) {
            this.$alert('请先阅读活动用户协议')
            return false
          }
          this.$http.get(Config.API_ROOT + 'ecommerce/user/register', {mobile: this.phone, captcha: this.telCode, realName: this.username, openid: Golab.openid}).then((response) => {
              // 验证码校验是否通过
            // console.log(response)
            if (response.ok) {
              this.pageParam.userName = this.username
              this.pageParam.userPhone = this.phone
              this.$router.go({name: 'itempayinfo', query: this.pageParam})
            } else {
              this.errormeg = '验证码不正确'
              this.codeText = true
            }
          }).catch((response) => {
            console.log(response)
          })
          /* this.$router.go({name: 'itempayinfo', query: {id: this.id, username: this.username, phone: this.phone, price: this.price}})*/
        }
      }
    },
    computed: {
      text: function () {
        return this.againClick ? '重新获取' : '发送验证码'
      },
      tel: function () {
        return this.phone.length < 1 ? '请填写您的手机号码' : '不是一个有效的手机号码'
      },
      code: function () {
        return this.errormeg
      }
    },
    watch: {
      phone: function () {
        if (this.phone.length >= 11) {
          if (this.isChinaMobile.test(this.phone) || this.isChinaUnion.test(this.phone) || this.isChinaTelcom.test(this.phone) || this.isOtherTelphone.test(this.phone)) {
            this.phoneText = false
            this.isdisable = false
            this.islight = !this.isdisable
          } else {
            this.phoneText = true
            this.isdisable = true
            this.islight = !this.isdisable
          }
        } else {
          this.phoneText = false
          this.isdisable = true
          this.islight = !this.isdisable
        }
      },
      username: function () {
        if (this.username.length > 0) {
          this.userText = false
        }
      },
      telCode: function () {
        if (this.telCode.length > 0) {
          this.codeText = false
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
