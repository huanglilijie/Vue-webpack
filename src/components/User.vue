<template>
  <title>告诉我们你是谁</title>
  <body>
    <div class="user">
      <p class="top-title">
        为了提供更好的服务,请认真填写姓名和联系方式
      </p>
      <validator name ="validation_info">
        <div class="form-group">
          <!-- <label>* 你的姓名</label> -->
          <div>
            <input v-model="username" v-validate:username="{required : true}" type="text" initial="off" detect-change="off" placeholder="* 姓名">
            <span v-if="userText">请填写您的姓名</span>
          </div>
        </div>
        <div class="form-group">
          <!-- <label>* 手机号码</label> -->
          <div>
            <input v-model.number="phone" name= "phone" v-validate:phone="['phone']" type="number" initial="off" detect-change="off" placeholder="* 手机号码">
            <button v-if="time == 0" :class="['code', {'codeLight': islight}]" @click="getCode()" id ="timeBtn" :disabled ='isdisable'>{{text}}</button>
            <span v-if="time != 0" class="code" id="timeText">{{time}}s</span>
            <span v-if="phoneText || $validation_info.phone.invalid">{{tel}}</span>
          </div>
        </div>
        <div class="form-group">
          <!-- <label>* 手机验证码</label> -->
          <div>
            <input v-model="telCode" name= "telCode" v-validate:telCode="{required : true}" placeholder="* 手机验证码">
            <span v-if="codeText">{{code}}</span>
          </div>
        </div>
        <div class="ciry-beyond" v-if="ciry">
          <div class="content">
            <div class="content_title">
              <h2>活动用户协议</h2>
            </div>
            <div class="content_word">
              <p>欢迎使用北京梅赛德斯-奔驰销售服务有限公司（以下简称“梅赛德斯-奔驰公司或奔驰”）通过本次活动提供的基于互联网和移动互联网的相关服务（以下简称“网络服务”）并感谢您对本次活动的关注与参与。本用户服务协议（“本协议”）由用户（“用户”）与梅赛德斯-奔驰公司订立，并适用于活动中提供的所有网络服务。</p>
              <p>第一条	本协议的说明</p>
              <p>（一）本活动的交易仅限于注册参加活动的用户。用户在在参加活动后，即表示用户完全接受本协议项下的全部条款，本协议即构成对梅赛德斯-奔驰公司及用户双方之间具有法律约束力的正式文件。<br/>
              （二）用户在使用活动中提供的网络服务前有义务仔细阅读本协议。用户在此不可撤销地承诺，若其使用活动中提供的网络服务，将视为用户同意并接受本协议全部条款的约束，此后用户不得以未阅读本协议或对本协议有任何误解为由，主张本协议无效或要求撤销本协议。<br/>
              （三）根据国家法律法规变化及活动的运营需求，梅赛德斯-奔驰公司可随时修改本协议的任何条款，并不定期更新活动规则。<br/>
              （五）本活动仅面向中国境内居民，因此活动中的所有信息仅服务于中国市场。
              </p>
              <p>第二条	商品信息</p>
              <p>用户明确知悉并同意，活动中的商品信息随时有可能发生变动，梅赛德斯-奔驰公司可对此不作特别通知。梅赛德斯-奔驰公司将尽合理的商业努力，使活动中展示的商品参数、说明等商品信息尽可能准确、详尽、完整，但受限于互联网技术的发展水平及梅赛德斯-奔驰公司的业务经营趋势等因素的限制，活动的商品信息可能会有一定的滞后性或误差，商品信息以经销商确认为准，用户对此情形已充分知悉并完全理解。<br/>
              活动中显示的金额均为厂商建议零售价。经销商可能会根据市场情况，自行决定车辆的实际售价。本活动不参与任何影响最终实际销售价格的制定或交涉。
              </p>
              <p>第三条	知识产权声明</p>
              <p>（一）奔驰提供的网络服务中包含的全部信息（包括但不限于任何文本、图片、音频、视频、数据、标识、数据编辑、商标等）以及为提供服务而使用的任何软件等均受知识产权和相关法律保护。未经奔驰的事先书面同意，用户不得以任何方式复制、转发、分享或以其他方式使用奔驰提供的网络服务中包含的任何信息，否则，奔驰将依法追究其法律责任。用户以个人和非商业目的使用奔驰的网络服务的情况除外。<br/>
              （二）任何单位或个人认为奔驰提供的网络服务中包含的信息涉嫌侵犯其合法权益的，应该及时向奔驰提出书面权利通知，并提供身份证明、权属证明、具体链接（URL）及详细侵权情况证明等必要证明资料。奔驰在确认上述法律文件的基础上将会依法尽快处理。
              </p>
              <p>第四条	用户个人隐私声明</p>
              <p>本网站将依据本隐私权政策和相关法律规定收集、使用和披露用户个人信息，用户在浏览本次活动以及使用本活动的特定服务之前，请务必仔细阅读隐私权相关政策。用户参加本活动，即视为用户同意本隐私权政策并同意本活动根据本隐私权政策收集、使用、披露用户的个人信息。本隐私权政策主要包括但不限于以下内容：奔驰向用户收集哪些信息；奔驰如何使用这些信息；奔驰在何种情况下披露这些信息以及用户的选择。</p>
              <p>（一）信息收集。用户提供的信息。用户在未参与活动时，奔驰不要求提供任何个人信息。用户参加活动时，在用户同意并确认的基础上，奔驰可能会以线上 或线下表格  的形式要求用户提供如下个人资料和信息：</p>
              <p>姓名、手机号码<br/>
                奔驰自动收集的信息。不管用户是否填写过，奔驰可能会自动收集浏览页面用户的以下信息：<br/>
                •用户浏览器类型、操作系统类型、宽带类型、浏览器语言等；<br/>
                •用户IP地址及该地址可能显示的用户地理位置；<br/>
                •用户在本网站内浏览过的页面；<br/>
                •用户访问本网站时发出的访问请求及其日期、时间和引荐网址（如有）；<br/>
                •通过Cookie标注用户浏览器的唯一性和在本网站的账户信息（包括用户访问本网站的各项活动、浏览习惯、消费习惯、账户信息等）；用户可以选择修改浏览器设置拒绝cookie，如果用户拒绝了cookie，此时用户可能无法使用依赖于cookie才能提供的本活动服务或功能；<br/>
                •奔驰可能会使用浏览器网络存储（包括 HTML 5）和应用程序数据缓存等机制，在用户设备上收集和存储用户所浏览过的网页信息；<br/>
                •当用户使用本网站提供的具有定位功能的服务时，奔驰可能会收集并处理用户实时位置的信息，奔驰还可能使用各种技术进行定位。<br/>
                本隐私权政策不适用于任何向用户提供服务的第三方主体（包括但不限于可能向本网站披露信息的第三方）。
                </p>
              <p>（二）信息使用。奔驰将用户信息发给经销商，以便与用户联系。仅在必要的情况下（用户未注册过MME商城https://estore.mercedes-benz.com.cn）时，将用户信息同步注册到MME商城且奔驰对其风险概不负责。</p>
              <p>（三）未成年人信息保护。用户是不具备完全民事权利能力和完全民事行为能力的自然人的，用户应先取得其家长或法定监护人的同意方可参加本次活动。同时，本活动希望用户不要向奔驰提供任何个人信息。  </p>
              <p>（四）隐私权声明更新。为反映活动的相关实践及相关服务和法律法规的变化，奔驰会时常更新本隐私权政策。奔驰会在修订本隐私权政策时，并在其更新文首载入“生效日期”，用户应定期查阅。用户继续参加本活动，即视为用户同意本隐私权政策的更新。</p>
              <p>（五）问题与投诉。用户对本隐私权政策或个人信息保护有任何问题的，可通过活动客服与我们联系。我们会尽最大努力在合理时间内回复用户。</p>
              <p>•法律法规或司法与政府部门要求根据人民法院、政府机关或法律法规的要求奔驰向其披露用户信息。<br/>
              •紧急情况下保护本网站和其他方利益在奔驰面临紧急情况下，为了保护本次活动、员工和用户、本活动合作伙伴和其他公众的合法权利、利益和安全，奔驰可能会披露用户信息。<br/>
              •第三方合作伙伴在用户通过活动进行支付时，用户的个人信息可能会提供给相关第三方。<br/>
              奔驰承诺会使用各种信息安全制度、安全技术和程序等措施来尽量保护用户的个人信息不被未经授权地访问、使用或泄露。但奔驰不能向用户绝对保证上述个人信息的安全性与私密性。
              </p>
            </div>
          </div>
          <a class="btn1" @click="pumpshow2()">知道了</a>
        </div>

      </validator>
      <btn-footer is-item-selected="selectedItem" >这就是我</btn-footer>
    </div>
    <div class="bottom-content">
      <p><span id="">奔驰世界，无限精彩</span><img src="/static/headset.png" @click = "openUrl" /></p>
      <p>https://estore.mercedes-benz.com.cn</p>
      <p class="user-agreement">
        <span>我同意</span><a @click="pumpshow2 ()">活动用户协议</a>
        <input type="checkbox" class= "input-checkbox" name="" v-model="state" />
      </p>
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
      },
      openUrl () {
        window.open(Golab.customerUrl)
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
html{
  background-color: #000;
}
.user{
  background: url(/static/images/userBanyellow.png) no-repeat;
  background-size: 100%;
  padding-bottom: 25%;
}
.user .top-title{
  text-align: center;
  padding:2.76rem 0 0;
  font-size:.4rem;
}
  .form-group {
    margin: .7rem 14% 0 14%;
  }
  .form-group > div {
    margin-top: 5px;
    position: relative;
  }
  .form-group input {
    width: 100%;
    height: 1.17rem;
    border-width: 0;
    font-size: .4rem;
    padding-left:.3rem;
    outline: none;
    color:#999;
    line-height: 1.17rem;
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
    height: .98rem;
    width: 2.36rem;
    position: absolute;
    right: -.2rem;
    top: .34rem;
    background-color: rgb(150,157,163);
    text-align: center;
    line-height: .98rem;
    color: #fff !important;
    border-radius: .2rem;
    border:none;
  }
  .codeLight {
    background-color: #F7B835;
  }
  .form-group > div span{
    position: absolute;
    color:red;
    bottom:-.6rem;
    font-size:.4rem
  }
  .user-agreement {
    margin-top: .5rem;
  }
  .user-agreement a{
    color: #000000;
  }
  .user-agreement a{
    text-decoration: underline;
  }
  /*上牌城市遮罩*/
  .ciry-beyond {
    width: 100%;
    /*height: 100%;*/
    background: url(/static/images/wherebg.png) no-repeat #fff;
    background-size: 100%;
    /*padding-top: 50px;*/
    position: absolute;
    top: 0;
    z-index: 10;
  }
  .ciry-beyond .content {
    width: 80%;
    /*min-height: 90%;*/
    margin: 0 auto;
    /*background: url(/static/images/pumpbg.png) no-repeat;*/
    background-size: 100%;
    box-sizing: border-box;
    padding-top: 10%;
    padding-bottom: 25%;
  }
  .ciry-beyond .btn1{
    position: fixed !important;
    bottom: 0;
    width: 100%;
    background-color: #f6ba38;
    font-size: .6rem;
    text-align: center;
    color: #fff;
    height: 1.94rem;
    line-height: 1.94rem;
  }
  .ciry-beyond .content_title{
    text-align: center;
    background: url(/static/images/pumptop.png) no-repeat center;
    height: 4.5rem;
    background-size: 100% 100%;
    line-height: 8rem;
  }
  .ciry-beyond .content_word{
    box-sizing: border-box;
    padding: 0px 10px;
    background: url(/static/images/pumpbottom.png) no-repeat bottom;
    background-size: 100%;
    background-color: #f6ba35;
    border-top: 2px white dashed;
    padding-top: 5%;
    padding-bottom: 10%;
  }
  .ciry-beyond .content_title h2{
    font-size: .45rem;
  }
  .ciry-beyond .content_word p{
    font-size: .4rem;
    padding: .1rem;
  }
</style>
