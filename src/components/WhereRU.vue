<style scoped>
  .top{
    justify-content: space-around;
    align-items: center;
    height: 1.24rem;
    line-height: 1.24rem;
    position: relative;
  }
  .top img{
    display: block;
    width: 5%;
    position: absolute;
    left: 20px;
    line-height: 40px;
    top: 10px;
  }
  .top a{
    color: #000000;
    font-size: .35rem;
    position: absolute;
    right: 20px;
    line-height: 40px;
    top: 0;
  }
  .top h2{
    font-size: .5rem;
    font-weight: 600;
    width: 20%;
    text-align: center;
    position: absolute;
    left: 40%;
    line-height: 40px;
    top: 0;
  }
  .middle{
    background-color: #F5F5F5;
    padding-bottom: 1.94rem;
  }
  .middle img:first-child{
    width: 100%;
    display: block;
  }
  .select-agency{
    width: 96%;
    margin: 0 auto;
  }
  .select-agency>p:first-child{
    font-size: .4rem;
    font-weight: 600;
    margin-top: .24rem;
  }
  .select-agency ul li{
    width: 100%;
    background-color: #FFFFFF;
    margin: .2rem 0;
    padding: 5px 0;
    display: inline-block;
  }
  .select-agency ul li p{
    width: 94%;
    margin: .03px auto;
    font-size:.35rem;
    padding:0.15rem 0
  }
  .select-agency ul li p .phoneh{
    text-decoration: underline;
  }
  .distance{
    overflow: hidden;
  }
  .distance label{
    float: left;
    font-size:.4rem;
    font-weight: 600;
  }
  .distance span{
    float: right;
    font-size:.35rem;
  }
  .tip{
    text-align: center;
    margin-top: .3rem;
    font-size: .35rem;
  }
  .tip a{
    color: #000000;
    font-weight: 600;
  }
  .btn{
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 1.5rem;
    text-decoration: none;
    color: #FFFFFF;
    position: absolute;
    bottom: 0px;
    background-color: #969DA3;
  }
  .checked{
    background-color: #F6BA38 !important;
    color:#fff;
  }
  .mask{
    position: fixed;
    width: 100%;
    height: 100%;
    /*z-index: 5;*/
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .area{
    position: absolute;;
    bottom:0;
    background-color: #eee;
    width: 100%;
    height: 240px;
  }
  .area .sureButton{
    background: #fff;
    display: inline-block;
    width: 100%;
    height: 40px;
    color: blue;
    line-height: 40px;
    font-size: .5rem;
  }
  .area .sureButton span.no{
    float: left;
    padding-left:10px;
  }
  .area .sureButton span.yes{
    float: right;
    padding-right: 10px;
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
  .content_title h2{
    font-size: .45rem;
  }
  .content_word p{
    font-size: .4rem;
  }
  /*如果没有经销商数据*/
  .isnohave{
    width: 100%;
    margin:0 auto;
    background: url(/static/images/center-bg2.png) no-repeat center;
    background-size:90% 70%;
    padding: 27% 0;
  }
  .isnohave p{
    font-size: .4rem;
    text-align: center;
    color:#fff;
  }
</style>
<template>
  <title>在哪提车呢</title>
    <div class="wrap">
      <div class="top">
        <img src="/static/images/location.png" @click="obtain_location()"/>
        <h2>{{currentCity}}</h2>
        <a href="#" @click="pumpshow()">更换城市</a>
      </div>
      <b-map-component v-ref:bmap></b-map-component>
      <div class="middle">
        <div class="select-agency">
          <p>选择经销商</p>
          <ul class="adders">
            <li v-for="item in data" @click="selectDealer($index)" :class="[{'checked':item.selected}]">
              <p class="distance">
                <label>{{item.name}}</label>
                <span v-if="userisGrant">距离{{item.distance}}km</span>
              </p>
              <p>
                <label>地址：</label>
                <span>{{item.address}}</span>
              </p>
              <p>
                <label>电话：</label>
                <span class="phoneh">{{item.telephone}}</span>
              </p>
            </li>
          </ul>
          <div class="isnohave" v-if ='isnohave'>
            <p>您所在的城市没有经销商<br/>请手动更换城市</p>
          </div>
          <p class="tip">我已阅读 <a href="###" @click="pumpshow2()">关于上牌城市的说明</a>
            <input type="checkbox" class= "input-checkbox"  v-model="checkState"/>
          </p>
        </div>
      </div>

      <!-- 底部按钮 -->
      <btn-footer is-item-selected="selectedItem">就这儿</btn-footer>
      <div class="mask" v-if="mask">
        <div class="area">
          <div class="sureButton">
            <span class="no" @click="pumpshow()">取消</span>
            <span class="yes" @click="changeCity()">完成</span>
          </div>
          <mt-picker :slots="slots" @change="demos"></mt-picker>
        </div>
      </div>
      <!-- 上牌城市说明的遮罩块以及样式 -->
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
    </div>
</template>
<script>
    import BMapComponent from '../elements/BMapComponent.vue'
    import Btn from '../elements/btn-footer'
    import Config from '../../config/config'
    import Golab from '../libs/golab'
    import Vue from 'vue'
    // var selectedItem
    module.exports = {
      name: 'whereru',
      data () {
        return {
          data: {},
          currentCity: '',
          selectedItem: null,
          slots: [],
          mask: false,
          selectedIndex: 0,
          checkState: false,
          cityData: [],
          cityNames: [],
          pageParam: {},
          ciry: false,
          userlongitude: null,
          userlatitude: null,
          userisGrant: false,
          isnohave: false
        }
      },
      components: {
        'b-map-component': BMapComponent,
        'btn-footer': Btn
      },
      ready () {
        // 获取页面传参
        var carCode = this.$route.query.carCode
        var carName = this.$route.query.carName
        var carIntentionFee = this.$route.query.carIntentionFee
        var param = {
          carCode: carCode,
          carName: carName,
          carIntentionFee: carIntentionFee
        }
        this.$set('pageParam', param)
        // 加载城市列表
        this.getCities()
      },
      beforeDestroy () {},
      methods: {
        obtain_location () {
          this.$refs.bmap.$emit('obtain-location')
        },
        demos (picker, values) {
          // 获取被选中的城市的索引
          this.$set('selectedIndex', this.cityNames.indexOf(values[0]))
        },
        pumpshow () {
          this.mask = !this.mask
        },
        pumpshow2 () {
          this.ciry = !this.ciry
        },
        // 选中后页面跳转
        submit () {
          if (this.selectedItem === null) {
            this.$alert('请选择经销商')
            return false
          }
          if (!this.checkState) {
            this.$alert('请先阅读关于上牌城市的说明')
            return false
          }
          var selectedDealer = this.data[this.selectedItem]
          this.pageParam.dealerName = selectedDealer.name
          this.pageParam.dealerCode = selectedDealer.id
          this.pageParam.dealerTelephone = selectedDealer.telephone
          // console.log(this.pageParam)
          // 路由跳转页面带参数传递
          // 需要判断客户是否已经留资,根据openid获取用户信息
          // 从未留资，进留资页面
          // console.log(response)
          // 判断直接到订单确认页↓
          this.$http.get(Config.API_ROOT + 'ecommerce/user/wechat-user/' + Golab.openid)
          .then((response) => {
            console.log(response)
            var data = response.data
            var uid = data.uid
            var mobile = data.uid
            var realName = data.realName
            // uid/mobile/realName不为空，说明已经留资
            if (uid === '' || uid === null || mobile === '' || mobile === null || realName === '' || realName === null) {
              // 从未留资，进留资页面
              this.$router.go({path: '/user', query: this.pageParam})
            } else {
              // 已经留资，直接到订单确认页
              window.localStorage.setItem('uid', data.uid)
              if (response.headers.map['MME-TOKEN']) {
                console.log(response.headers.map['MME-TOKEN'][0])
                window.localStorage.setItem('MME-TOKEN', response.headers.map['MME-TOKEN'][0])
                Vue.http.headers.common['MME-TOKEN'] = response.headers.map['MME-TOKEN'][0]
              }
              this.pageParam.userName = data.realName
              this.pageParam.userPhone = data.mobile
              this.$router.go({name: 'itempayinfo', query: this.pageParam})
            }
          }).catch((response) => {
            // 从未留资，进留资页面
            this.$router.go({path: '/user', query: this.pageParam})
            console.log(response)
          })
          // 直接跳转
        //   this.$router.go({path: '/user', query: this.pageParam})
        },
        // 根据城市code、用户经纬度获取经销商列表，若获取不到用户定位，则不传用户经纬度，经销商列表按字母排序，列表不展示距离
        getCityDealers (data) {
          // 初始化选择经销商和上牌城市选择
          this.selectedItem = null
          this.checkState = false
          this.currentCity = data.cityName
          // this.$alert('用户:' + this.userlatitude + ' , ' + this.userlongitude)
          var param
          if (this.userisGrant) {
            param = {city: data.cityId, lat: this.userlatitude, lng: this.userlongitude}
            // this.$alert(this.userlongitude + ',' + this.userlatitude)
          } else {
            param = {city: data.cityId}
          }
          // param = {city: data.cityId, lat: '40.000384', lng: '116.489635'}
          this.$http.get(Config.API_ROOT + 'ecommerce/customers/dealers', {params: param})
            .then((response) => {
              var data = response.data
              for (var i in data) {
                data[i].selected = false
                data[i].distance = (data[i].distance / 1000).toFixed(2)
              }
              this.$set('data', data)
              if (data.length === 0) {
                this.isnohave = true
              } else {
                this.isnohave = false
              }
              this.$refs.bmap.$emit('show-dealers-onmap', data)
            }).catch((response) => {
              this.$alert('获取经销商列表失败')
            })
        },
        // 获取所有的城市api
        getCities () {
          this.$http.get(Config.API_ROOT + 'ecommerce/cities')
            .then((response) => {
              var data = response.data
              var cityNames = []
              var slots = [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
              }]
              console.log(data)
              for (var i in data) {
                cityNames[i] = data[i].name
              }
              slots[0].values = cityNames
              this.$set('cityData', data)
              this.$set('cityNames', cityNames)
              this.$set('slots', slots)
            }).catch((response) => {
              this.$alert('获取城市列表失败')
            })
        },
        selectDealer (index) {
          // 将已选择的置为未选择
          if (this.selectedItem != null) {
            this.data[this.selectedItem].selected = false
          }
          // 将本次选择的置为选中
          this.data[index].selected = true
          // this.style = "{'color': #fff}"
          // 将序列赋值给selectedItem
          this.selectedItem = index
          // 重新加载地图
          var dealer = this.data[index]
          var param = {
            latitude: dealer.latitude,
            longitude: dealer.longitude,
            name: dealer.name
          }
          console.log('经销商：' + dealer.longitude + ' , ' + dealer.latitude)
          this.$refs.bmap.$emit('dealer-marker', param)
        },
        changeCity () {
          var city = this.cityData[this.selectedIndex]
          var param = {
            cityId: city.code,
            cityName: city.name,
            latitude: city.lat,
            longitude: city.lng
          }
          this.$refs.bmap.$emit('change-city', param)
          // 变更城市时加载经销商
          this.getCityDealers(param)
          // 隐藏城市选择框
          this.mask = !this.mask
          // 初始化选择城市索引
          this.$set('selectedIndex', 0)
          // 初始化经销商未选中
          this.selectedItem = null
          // 初始化阅读上牌城市说明
          this.checkState = false
        },
        editData (data) {
          this.$set('userlongitude', data.userlongitude)
          this.$set('userlatitude', data.userlatitude)
          this.$set('userisGrant', data.userisGrant)
          // this.userlongitude = data.userlongitude
          // this.userlatitude = data.userlatitude
          // this.userisGrant = data.userisGrant
        }
      },
      events: {
        'get-dealers': function (data) {
          this.getCityDealers(data)
        },
        'show-subs-alert': function (data) {
          this.$alert(data)
        },
        'change-current-city': function (data) {
          this.currentCity = data.cityName
        },
        'pump-show': function (data) {
          this.pumpshow()
        },
        'edit-data': function (data) {
          this.editData(data)
        }
      }
    }
</script>
