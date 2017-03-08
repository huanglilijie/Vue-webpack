<template>
  <div id='allmap' v-bind:style='mapStyle'></div>
</template>

<script>
  import BMap from 'BMap'
  export default{
    data () {
      return {
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px'
        },
        mapData: {},
        location: {}
      }
    },
    props: {
      // 地图在该视图上的高度
      mapHeight: {
        type: Number,
        default: 200
      },
      // 经度
      longitude: {
        type: Number,
        default: 116.489635
      },
      // 纬度
      latitude: {
        type: Number,
        default: 40.000384
      },
      description: {
        type: String,
        default: '北京'
      },
      isGrant: {
        type: Boolean,
        default: false
      }
    },
    ready () {
      this.obtain_location()
    },
    methods: {
      obtain_location () {
        // 判断浏览器是否支持地理位置接口
        if (navigator.geolocation) {
          // 支持
          this.agree_obtain_location()
        } else {
          // 不支持
          this.$dispatch('show-subs-alert', '不支持地理位置接口,定位失败，默认北京市')
          //  默认北京
          var location = {
            longitude: this.longitude,
            latitude: this.latitude
          }
          this.getCity(location)
        }
      },
      agree_obtain_location () {
        // var this_ = this
        var option = {
          enableHighAccuracy: true,
          timeout: Infinity,
          maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, option)
        // var geolocation = new BMap.Geolocation()
        // console.log(geolocation)
        // var location = {
        //   longitude: this.longitude,
        //   latitude: this.latitude
        // }
        // this_.getCity(location)
        // // 弹出城市选择
        // this_.$dispatch('pump-show')
        // geolocation.getCurrentPosition(function (r) {
        //   if (this.getStatus() === 0) {
        //     // console.log(r)
        //     location.latitude = r.point.lat
        //     location.longitude = r.point.lng
        //     // console.log(location)
        //     // 用户同意授权
        //     // this_.isGrant = true
        //     // 经纬度初始值
        //     this_.longitude = location.longitude
        //     this_.latitude = location.latitude
        //     var param = {
        //       userlongitude: r.point.lng,
        //       userlatitude: r.point.lat,
        //       userisGrant: true
        //     }
        //     // console.log('用户:' + r.point.lng + ' , ' + r.point.lat)
        //     // 将用户经纬度传给父组件
        //     this_.$dispatch('edit-data', param)
        //     this_.getCity(location)
        //   } else {
        //     this_.getCity(location)
        //     // 弹出城市选择
        //     this_.$dispatch('pump-show')
        //   }
        // })
      },
      geoSuccess (event) {
        // 用户同意授权
        this.isGrant = true
        var location = {
          latitude: event.coords.latitude,
          longitude: event.coords.longitude
        }
        console.log('用户:' + location.longitude + ' , ' + location.latitude)
        // 经纬度初始值
        this.longitude = location.longitude
        this.latitude = location.latitude
        var param = {
          userlongitude: location.longitude,
          userlatitude: location.latitude,
          userisGrant: this.isGrant
        }
        // 将用户经纬度传给父组件
        this.$dispatch('edit-data', param)
        this.getCity(location)
      },
      geoError (event) {
        // 用户拒绝授权
        // this.$dispatch('show-subs-alert', '获取位置信息失败')
        //  默认北京
        var location = {
          longitude: this.longitude,
          latitude: this.latitude
        }
        this.getCity(location)
        // 弹出城市选择
        this.$dispatch('pump-show')
      },
      initMap (data) {
        // var markerArr = data
        // 创建Map实例
        var map = new BMap.Map('allmap')
        // 设置地图中心点
        var point
        if (data) {
          point = new BMap.Point(data.longitude, data.latitude)
        } else {
          point = new BMap.Point(this.longitude, this.latitude)
        }
        // map.setCenter('北京')
        /* var marker = new BMap.Marker(point, 13)
        map.addOverlay(marker)*/
        // 初始化地图,设置中心点坐标和地图级别。
        map.centerAndZoom(point, 11)
        // 向地图中添加缩放控件
        var ctrlNav = new window.BMap.NavigationControl({
          anchor: 'BMAP_ANCHOR_BOTTOM_LEFT',
          type: 'BMAP_NAVIGATION_CONTROL_LARGE'
        })
        map.addControl(ctrlNav)
        // 向地图中添加比例尺控件
        var ctrlSca = new window.BMap.ScaleControl({
          anchor: 'BMAP_ANCHOR_BOTTOM_LEFT'
        })
        map.addControl(ctrlSca)
        /* map.addControl(new BMap.CityListControl({
          anchor: 'BMAP_ANCHOR_TOP_LEFT',
          offset: new BMap.Size(80, 20),
          onChangeAfter: this.cityChanged
        }))*/
        map.enableScrollWheelZoom(true)
        map.enableInertialDragging(true)
        map.enableContinuousZoom(true)
        this.$set('mapData', map)
      },
      mapDealerShow (data) {
        var markerArr = data
        // 存放标注点经纬信息的数组
        var points = []
        // 存放标注点对象的数组
        var markers = []
        // 存放提示信息窗口对象的数组
        // var info = new Array()
        // 存放检索信息窗口对象的数组
        // var searchInfoWindow = new Array()
        if (data) {
          for (var i in markerArr) {
            // 按照原数组的point格式将地图点坐标的经纬度分别提出来
            // 经度
            var p0 = markerArr[i].longitude
            // 纬度
            var p1 = markerArr[i].latitude
            // 循环生成新的地图点
            points[i] = new window.BMap.Point(p0, p1)
            // 按照地图点坐标生成标记
            markers[i] = new window.BMap.Marker(points[i], 11)
            this.mapData.addOverlay(markers[i])
            // 跳动的动画
            // markers[i].setAnimation(BMAP_ANIMATION_BOUNCE)
            // var label = new window.BMap.Label(markerArr[i].name, { offset: new window.BMap.Size(20, -10) })
            // markers[i].setLabel(label)
          }
        }
      },
      getCityIdFunc (result) {
        var cityId
        var cityName
        if (result) {
          cityId = result.code
          cityName = result.name
        } else {
          // 默认北京市代码
          cityId = 131
          cityName = '北京'
        }
        var param = {
          cityId: cityId,
          cityName: cityName,
          latitude: this.latitude,
          longitude: this.longitude
        }
        this.$dispatch('get-dealers', param)
      },
      // 获取城市信息
      getCity (location) {
        // 初始化地图
        this.initMap(location)
        var mycity = new BMap.LocalCity()
        mycity.get(this.getCityIdFunc)
      },
      cityChanged (data) {
        // 获得切换城市后的地图中心点坐标
        var changedPoint = new BMap.Point(data.longitude, data.latitude)
        // 初始化地图,设置中心点坐标和地图级别。
        this.mapData.centerAndZoom(changedPoint, 11)
        this.mapData.panTo(changedPoint, 0)
      },
      selectDealer (data) {
        this.mapData.clearOverlays()
        if (this.isGrant) {
          var userPoint = new BMap.Point(this.longitude, this.latitude)
          this.mapData.centerAndZoom(userPoint, 13)
          var userMarker = new window.BMap.Marker(userPoint, 13)
          this.mapData.addOverlay(userMarker)
        }
        // 获得切换城市后的地图中心点坐标
        var dealerPoint = new BMap.Point(data.longitude, data.latitude)
        // 初始化地图,设置中心点坐标和地图级别。
        this.mapData.centerAndZoom(dealerPoint, 13)
        // 按照地图点坐标生成标记
        var dealerMarker = new window.BMap.Marker(dealerPoint, 13)
        this.mapData.addOverlay(dealerMarker)
        /* var infoWindow = new BMap.InfoWindow(data.name)
        this.mapData.openInfoWindow(infoWindow, dealerPoint)
        var label = new window.BMap.Label(data.name, { offset: new window.BMap.Size(10, -10) })
        dealerMarker.setLabel(label)*/
        this.mapData.panTo(dealerPoint, 0)
      }
    },
    events: {
      'show-bmap': function (data) {
        this.data = data
      },
      'show-dealers-onmap': function (data) {
        this.mapDealerShow(data)
      },
      'change-city': function (data) {
        this.cityChanged(data)
      },
      'dealer-marker': function (data) {
        this.selectDealer(data)
      },
      'obtain-location': function () {
        this.obtain_location()
      }
    }
}
</script>
