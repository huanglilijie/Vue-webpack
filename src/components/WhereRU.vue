<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    font-size: 12px;
    font-family: "微软雅黑";
  }
  @media (max-width: 350px) {
    html,body {
      font-size: 10px !important;
    }
    li{
      list-style: none;
    }
  }
  .top{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 40px;
    line-height: 40px;
  }
  .top img{
    display: block;
    width: 5%;
  }
  .top a{
    color: #000000;
    font-size: 1.2rem;
  }
  .middle{
    background-color: #F5F5F5;
    padding-bottom: 70px;
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
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 10px;
  }
  .select-agency ul li{
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 10px;-
    margin-bottom: 10px;
    padding: 5px 0;
  }
  .select-agency ul li p{
    width: 94%;
    margin: 3px auto;
  }
  .distance{
    overflow: hidden;
  }
  .distance label{
    float: left;
    font-size: 1.2rem;
    font-weight: 600;
  }
  .distance span{
    float: right;
  }
  .tip{
    text-align: center;
    margin-top: 30px;
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
    font-size: 1.5rem;
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
</style>
<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;">
    <title>在哪提车呢</title>
  </head>
  <body>
    <div class="wrap">
      <div class="top">
        <img src="/static/images/location.png" @click="obtain_location()"/>
        <h2>{{currentCity}}</h2>
        <a href="#" @click="pumpshow()">更换城市</a>
      </div>
      <div class="middle">
        <b-map-component v-ref:bmap></b-map-component>
        <div class="select-agency">
          <p>选择经销商</p>
          <ul class="adders">
            <li v-for="item in data" @click="selectDealer($index)" :class="[{'checked':item.selected}]">
              <p class="distance">
                <label>{{item.name}}</label>
                <span v-if="userisGrant">距离{{item.distance}}米</span>
              </p>
              <p>
                <label>地址：</label>
                <span>{{item.address}}</span>
              </p>
              <p>
                <label>电话：</label>
                <span>{{item.telephone}}</span>
              </p>
            </li>
          </ul>
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
            <span class="yes" @click="changeCity()">确认</span>
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
  </body>
</template>
<script>
    import BMapComponent from '../elements/BMapComponent.vue'
    import Btn from '../elements/btn-footer'
    import Config from '../../config/config'
    import Golab from '../libs/golab'
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
          userisGrant: false
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
          this.$http.get(Config.API_ROOT + 'ecommerce/user/wechat-user/' + Golab.openid)
          .then((response) => {
            console.log(response)
            // var data = response.data
            // 从未留资，进留资页面
            this.$router.go({path: '/user', query: this.pageParam})
            /* if (data.uid != null) {
              // 已经留资，直接到订单确认页
              Golab.uid = data.uid
              this.pageParam.userName = data.realName
              this.pageParam.userPhone = data.mobile
              this.$router.go({name: 'itempayinfo', query: this.pageParam})
            } else {
              // 从未留资，进留资页面
              this.$router.go({path: '/user', query: this.pageParam})
            }*/
          }).catch((response) => {
            console.log(response)
          })
        },
        // 根据城市code、用户经纬度获取经销商列表，若获取不到用户定位，则不传用户经纬度，经销商列表按字母排序，列表不展示距离
        getCityDealers (data) {
          this.currentCity = data.cityName
          var param
          if (this.userisGrant) {
            param = {city: data.cityId, lat: this.userlatitude, lng: this.userlongitude}
          } else {
            param = {city: data.cityId}
          }
          this.$http.get(Config.API_ROOT + 'ecommerce/customers/dealers', {params: param})
            .then((response) => {
              var data = response.data
              for (var i in data) {
                data[i].selected = false
              }
              this.$set('data', data)
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
          // 将序列赋值给selectedItem
          this.selectedItem = index
          // 重新加载地图
          var dealer = this.data[index]
          var param = {
            latitude: dealer.latitude,
            longitude: dealer.longitude,
            name: dealer.name
          }
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
          this.userlongitude = data.userlongitude
          this.userlatitude = data.userlatitude
          this.userisGrant = data.userisGrant
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
