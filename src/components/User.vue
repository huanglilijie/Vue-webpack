<template>
  <body>
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
            <span v-if="phoneText || $validation_info.phone.invalid">{{tel}}</span>
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
            <span>我同意</span><a @click="pumpshow2 ()">活动用户协议</a>
            <input type="checkbox" class= "input-checkbox" name="" v-model="state" />
          </p>
        </div>

        <div class="ciry" v-if="ciry">
          <div class="content">
            <div class="content_title">
              <h2>上牌城市的说明</h2>
            </div>
            <div class="line"></div>
            <div class="content_word">
              <p>为了保证服务质量，请您购车后在该活动中提
      交意向金时选定的上牌城市上牌，如您选择在
      购车经销商所在城市以外的地区上牌，具体事
      宜请于该经销商协商。</p>
            </div>
          </div>
          <a class="btn1" @click="pumpshow2()">知道了</a>
        </div>

      </validator>
      <btn-footer is-item-selected="selectedItem" >这就是我</btn-footer>
    </div>
  </body>
</template>

<script>
  import Btn from '../elements/btn-footer'
  import Config from '../../config/config'
  import Golab from '../libs/golab'
  import Vue from 'vue'
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
    pageParam: {},
    ciry: false
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
      pumpshow2 () {
        this.ciry = !this.ciry
      },
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
          this.$http.post(Config.API_ROOT + 'ecommerce/user/captcha?action=register', {'mobile': this.phone}).then((response) => {
            console.log(response)
            if (response.data != null) {
              console.log(response.data)
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
          this.$http.post(Config.API_ROOT + 'ecommerce/user/register', {'mobile': this.phone, 'captcha': this.telCode, 'realName': this.username, 'openid': Golab.openid}).then((response) => {
              // 验证码校验是否通过
            console.log(response)
            var data = response.data
            console.log(response.headers)
            console.log(response.headers.map['MME-TOKEN'])
            if (response.headers.map['MME-TOKEN']) {
              console.log(response.headers.map['MME-TOKEN'][0])
              window.localStorage.setItem('MME-TOKEN', response.headers.map['MME-TOKEN'][0])
              Vue.http.headers.common['MME-TOKEN'] = response.headers.map['MME-TOKEN'][0]
            }
            // 将注册获取uid存储
            // Config.uid = data.uid
            window.localStorage.setItem('uid', data.uid)
            if (response.ok) {
              this.pageParam.userName = this.username
              this.pageParam.userPhone = this.phone
              this.pageParam.uid = data.uid
              this.$router.go({name: 'itempayinfo', query: this.pageParam})
            } else {
              this.errormeg = '验证码不正确'
              this.codeText = true
            }
          }).catch((response) => {
            this.errormeg = response.data.message
            this.codeText = true
            console.log(response)
          })
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
body{
  background-color: #000;
}
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
  .user-agreement a{
    text-decoration: underline;
  }
  /*上牌城市遮罩*/
  .ciry {
    width: 100%;
    height: 100%;
    background: url(/static/images/wherebg.png) no-repeat #fff;
    background-size: 100%;
    padding-top: 50px;
    position: fixed;
    top: 0;
    z-index: 10;
  }
  .content {
    width: 80%;
    min-height: 90%;
    margin: 0 auto;
    background: url(/static/images/pumpbg.png) no-repeat;
    background-size: 100%;
    box-sizing: border-box;
    padding-top: 35%;
  }
 .btn1{
    position: fixed !important;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
    background-color: #f6ba38;
    font-size: 18px;
    text-align: center;
    color: #fff;
  }
  .line{
    width:100%;
    height:0px;
    border-bottom: 2px white dashed;
    margin: 10px auto;
  }
  .content_title{
    text-align: center;
  }
  .content_word{
    box-sizing: border-box;
    padding: 0px 10px;
  }
</style>
