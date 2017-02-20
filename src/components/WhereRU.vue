<style scoped>

</style>
<template>
    <h1></h1>
    <b-map-component v-ref:bmap></b-map-component>
    <div>
      <ul style="width: 100%">
        <li v-for="item in data">{{item.title}}</li>
      </ul>
      </select>
    </div>
    <!-- 底部按钮 -->
    <btn-footer is-item-selected="selectedItem">就这儿</btn-footer>
</template>
<script>
    import BMapComponent from '../elements/BMapComponent.vue'
    import Btn from '../elements/btn-footer'
    module.exports = {
      name: 'whereru',
      data () {
        return {
          data: {}
        }
      },
      components: {
        'b-map-component': BMapComponent,
        'btn-footer': Btn
      },
      ready () {
        if (navigator.geolocation) {
          this.agree_obtain_location()
        } else {
          this.$alert('不支持地理位置接口')
        }
      },
      beforeDestroy () {},
      methods: {
        // 选中后页面跳转
        submit () {
          // 路由跳转页面带参数传递
          this.$router.go({path: '/test'})
        },
        agree_obtain_location () {
          var option = {
            enableHighAccuracy: true,
            timeout: Infinity,
            maximumAge: 0
          }
          navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, option)
        },
        geoSuccess (event) {
          console.log(event.coords.latitude + ', ' + event.coords.longitude)
          var location = {
            latitude: event.coords.latitude,
            longitude: event.coords.longitude
          }
          this.$refs.bmap.$emit('get-city', location)
        },
        geoError (event) {
          console.log('Error code ' + event.code + '. ' + event.message)
        }
      },
      events: {
        'get-dealers': function (data) {
          console.log(data + 'get-dealers')
          this.$http.get('http://localhost:8081/api/cities')
          .then((response) => {
            console.log(response)
            console.log(response.body)
            var markerArr = [
              { title: '名称：广州火车站', lat: 113.264531, lng: 23.157003, address: '广东省广州市广州火车站', tel: '12306' },
              { title: '名称：广州塔（赤岗塔）', lat: 113.330934, lng: 23.113401, address: '广东省广州市广州塔（赤岗塔） ', tel: '18500000000' },
              { title: '名称：广州动物园', lat: 113.312213, lng: 23.147267, address: '广东省广州市广州动物园', tel: '18500000000' },
              { title: '名称：天河公园', lat: 113.372867, lng: 23.134274, address: '广东省广州市天河公园', tel: '18500000000' }
            ]
            this.data = markerArr
            this.$refs.bmap.$emit('show-dealers-onmap', markerArr)
          }).catch((response) => {
            console.log(response)
          })
        }
      }
    }
</script>
