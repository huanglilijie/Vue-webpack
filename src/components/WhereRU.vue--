<style>
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
        <img src="/static/images/location.png"/>
        <h2>{{currentCity}}</h2>
        <a href="#" @click="changeCity">更换城市</a>
      </div>
      <div class="middle">
        <b-map-component v-ref:bmap></b-map-component>
        <div class="select-agency">
          <p>选择经销商</p>
          <ul class="adders">
            <li v-for="item in data" @click="selectDealer($index)" :class="[{'checked':item.selected}]">
              <p class="distance">
                <label>{{item.name}}</label>
                <span>距离{{item.distance}}米</span>
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
          <p class="tip">我已阅读 <a href="###">关于上牌城市的说明</a><input type="checkbox" name="" id="" value="" /></p>
        </div>
      </div>
      <!-- 底部按钮 -->
      <btn-footer is-item-selected="selectedItem">就这儿</btn-footer>
      <div class="mask" v-if="mask">
        <div class="area">
          <div class="sureButton">
            <span class="no">取消</span>
            <span class="yes">确认</span>
          </div>
          <mt-picker :slots="slots" @change="demos"></mt-picker>
        </div>
      </div>
    </div>
  </body>
</template>
<script>
    import BMapComponent from '../elements/BMapComponent.vue'
    import Btn from '../elements/btn-footer'
    import Config from '../../config/config'
    // var selectedItem
    module.exports = {
      name: 'whereru',
      data () {
        return {
          data: {},
          currentCity: '',
          selectedItem: null,
          cityList: [],
          slots: [{
            flex: 1,
            values: ['北京', '上海', '郑州', '南京', '大哥大', '哈撒给'],
            className: 'slot1',
            textAlign: 'center'
          }],
          mask: false
        }
      },
      components: {
        'b-map-component': BMapComponent,
        'btn-footer': Btn
      },
      ready () {
      },
      beforeDestroy () {},
      methods: {
        demos (picker, values) {
        },
        // 选中后页面跳转
        submit () {
          console.log(this.selectedItem)
          if (!this.selectedItem) {
            this.$alert('请选择经销商')
            return
          }
          // 路由跳转页面带参数传递
          this.$router.go({path: '/user', query: {selectedItem: this.selectedItem}})
        },
        getCityDealers (data) {
          this.currentCity = data.cityName
          this.$http.get(Config.API_ROOT + 'ecommerce/dealers', {params: {city: data.cityId, lat: data.latitude, lng: data.longitude}})
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
        selectDealer (index) {
          // 将已选择的置为未选择
          if (this.selectedItem != null) {
            this.data[this.selectedItem].selected = false
          }
          // 将本次选择的置为选中
          this.data[index].selected = true
          // 将序列赋值给selectedItem
          this.selectedItem = index
        },
        changeCity () {
          var param = {
            // 广州市
            cityId: 257,
            cityName: '广州市',
            latitude: 23.134274,
            longitude: 113.372867
          }
          this.$refs.bmap.$emit('change-city', param)
          // 加载变更城市经销商
          this.getCityDealers(param)
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
        }
      }
    }
</script>
