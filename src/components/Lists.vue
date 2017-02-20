<template>
  <div class="lists" v-if="orders_number < 400">
    <!-- 列表页 -->
    <ul class="p-list">
      <li class="p-list-item" v-for="item in lists" @click="select($index)">
        <div :class="['p-list-item-label',{'p-list-item-label-change': selected[$index]}]">
          <div class="p-list-item-title">{{ item.title }}</div>
          <div class="p-list-item-price">
            <h4>市场指导价：</h4>
            <p>{{ item.priceFrom }} - {{ item.priceTo }}</p>
            <p>内饰:</p>
            <img class="p-list-item-color" :src="item.colorSrc"/>
          </div>
        </div>
        <img class="p-list-item-img" :src="item.imgSrc">
      </li>
    </ul>
    <!-- 底部按钮 -->
    <btn-footer :is-item-selected="selectedItem">就它啦</btn-footer>
  </div>
  <!-- 活动名额已满 -->
  <div class="lists" v-else>
    <!-- 列表页 -->
    <ul class="p-list">
      <li class="p-list-item" v-for="item in lists">
        <div :class="['p-list-item-label']">
          <div class="p-list-item-title">{{ item.title }}</div>
          <div class="p-list-item-price">
            <h4>市场指导价：</h4>
            <p>{{ item.priceFrom }} - {{ item.priceTo }}</p>
            <p>内饰:</p>
            <img class="p-list-item-color" :src="item.colorSrc"/>
          </div>
        </div>
        <img class="p-list-item-img" :src="item.imgSrc">
      </li>
    </ul>
    <!-- 底部按钮 -->
    <p class="text1">本次活动名额已满</p>
    <p class="text2">奔驰世界，无限精彩</p>
    <p class="text2">https://estore.mercedes-benz.com.cn</p>
  </div>
</template>

<script>
  import Btn from '../elements/btn-footer'
  /**
   * 填充数据的方法
   * data.lists = JSON
   */
  var data = {
    lists: [
      {id: 1, selected: false, title: 'Smart fortwo', priceFrom: '125,000元', priceTo: '176,000元', 'imgSrc': '/static/images/smart-list1.png', 'colorSrc': '/static/images/smart-color1.png'},
      {id: 2, selected: false, title: '全新smart forfour 4门4座车', priceFrom: '125,000元', priceTo: '176,000元', 'imgSrc': '/static/images/smart-list2.png', 'colorSrc': '/static/images/smart-color2.png'},
      {id: 3, selected: false, title: '全新smart fortwo敞篷版', priceFrom: '125,000元', priceTo: '176,000元', 'imgSrc': '/static/images/smart-list3.png', 'colorSrc': '/static/images/smart-color3.png'}
//    {id: 4, selected: false, title: 'Smart Fortwo', priceFrom: '12500元', priceTo: '17600元', 'imgSrc': '/static/images/smart-list1.png'}
    ],
    selectedItem: null,
    selected: [false, false, false],
    orders_number: 0,
    price: '123'
  }

  export default {
    name: 'lists',
    data () {
      return data
    },
    create () {
      // 初始化lists
    },
    components: {
      'btn-footer': Btn
    },
    ready: function () {
      this.setData()
    },
    beforeDestory: function () {

    },
    methods: {
      // 选中一个item
      setData: function () {
        // 获取订单数量
        this.$http.get('http://localhost:8081/api/orders-number')
        .then((response) => {
          if (response.data) {
            this.$set('orders_number', response.data)
            console.log(this.orders_number)
          }
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })
        // 获取车型列表
        this.$http.get('http://localhost:8081/api/vehicles/models')
        .then((response) => {
          if (response.data) {
            this.$set('lists', response.data)
          }
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })

        // 获取城市列表
        this.$http.get('http://localhost:8081/api/cities')
        .then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })
        // 根据城市获取经销商
        this.$http.get('http://localhost:8081/api/dealers', {params: {city: 1, lat: 39.929986, lng: 116.395645}})
        .then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })

        // 根据用户id获取订单信息
        this.$http.post('http://localhost:8081/api/customers/' + '213601' + '/orders')
        .then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })
        // 根据用户id获取订单信息--已取消
        this.$http.post('http://localhost:8081/api/customers/' + '213601' + '/orders/' + '57621' + '/cancel')
        .then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })
        // 根据用户id获取订单信息--退款中
        this.$http.post('http://localhost:8081/api/customers/' + '213601' + '/orders/' + '57621' + '/refund')
        .then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })
        // 根据用户id获取订单信息--众筹中
        this.$http.post('http://localhost:8081/api/customers/' + '213601' + '/orders/' + '57621' + '/funding')
        .then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })
        // 根据用户id获取订单信息--订单确认
        this.$http.post('http://localhost:8081/api/customers/' + '213601' + '/orders/' + '57621' + '/funded')
        .then((response) => {
          console.log(response.data)
        }).catch((response) => {
          console.log(response)
        })
      },
      select (index) {
        // 将已选择的置为未选择
        if (this.selectedItem != null) {
          this.selected.$set(this.selectedItem, false)
        }
        // 将本次选择的置为选中
        this.selected.$set(index, true)
        // 将序列赋值给selectedItem
        this.selectedItem = index
        console.log(this.selectedItem)
      },
      getSelected () {
        if (this.selectedItem == null) {
          this.$alert('请选择车型')
          return false
        }
        return this.lists[this.selectedItem]
      },
      // 选中后页面跳转
      submit () {
        const selected = this.getSelected()
        if (!selected) {
          return false
        }
        // 路由跳转页面带参数传递
        this.$router.go({name: 'user', query: {id: selected.id, price: this.price}})
      }
    }
  }
</script>

<style scoped>
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .p-list {
    margin-bottom: 55px;
  }
  .p-list-item {
    position: relative;
    color: #fff;
    margin-bottom: 10px;
  }
  .p-list-item-title {
    font-size: 18px;
  }
  .p-list-item-img {
    width: 100%;
    display: block;
  }
  .p-list-item-color{
  	position: absolute;
  	bottom: 5px;
  	width: 70%;
  	display: block;
  }
  .p-list-item-price > h4,
  .p-list-item-price > p {
    margin: 0;
    margin-top: 5px;
  }
  .p-list-item-price > p:nth-child(3){
  	position: absolute;
  	bottom: 32px;
  	/*width: 70%;*/
  	display: block;
  }
  .p-list-item-label {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,.3);
    padding: 10px;
    transition: all .5s ease;
  }
  .p-list-item-label-change {
    background-color: rgba(0,0,0,0);
    color: #000;

  }
  .lists>p{
      text-align: center;
  }
  .text1{
      font-size: 1.5rem;
      margin-top: 10px;
  }
  .text2{
      font-size: 1.2rem;
      margin-top: 5px;
  }

</style>
